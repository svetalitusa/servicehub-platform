import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/lib/auth";
import { UserType } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, userType, phone } = body;

    console.log("📝 Registration attempt:", {
      email,
      name,
      userType,
      hasPhone: !!phone,
    });

    // Validate required fields
    if (!email || !password || !name || !userType) {
      return NextResponse.json(
        {
          success: false,
          message: "Все обязательные поля должны быть заполнены",
        },
        { status: 400 },
      );
    }

    // Validate user type
    if (!["customer", "provider"].includes(userType)) {
      return NextResponse.json(
        {
          success: false,
          message: "Неверный тип пользователя",
        },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Введите корректный email адрес",
        },
        { status: 400 },
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Пароль должен содержать минимум 8 символов",
        },
        { status: 400 },
      );
    }

    // Validate phone format if provided
    if (phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(phone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Введите корректный номер телефона",
        },
        { status: 400 },
      );
    }

    // Register user
    const result = await AuthService.register(
      email.toLowerCase().trim(),
      password,
      name.trim(),
      userType as UserType,
      phone?.trim(),
    );

    console.log("📊 Registration result:", {
      success: result.success,
      message: result.message,
    });

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    console.log("✅ Registration successful, setting cookie...");

    // Create response with cookie
    const response = NextResponse.json(result, { status: 201 });

    if (result.token) {
      // Set HTTP-only cookie with less restrictive settings for development
      const cookieValue = `auth-token=${result.token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${7 * 24 * 60 * 60}`;
      response.headers.set("Set-Cookie", cookieValue);
      console.log("🍪 Cookie set:", cookieValue);
    }

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Внутренняя ошибка сервера",
      },
      { status: 500 },
    );
  }
}
