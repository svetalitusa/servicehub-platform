import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log("🔐 Login attempt for email:", email);

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email и пароль обязательны для заполнения",
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

    // Attempt login
    console.log(
      "🔍 Searching for user with email:",
      email.toLowerCase().trim(),
    );
    const result = await AuthService.login(
      email.toLowerCase().trim(),
      password,
    );

    console.log("📊 Login result:", {
      success: result.success,
      message: result.message,
      hasUser: !!result.user,
    });

    if (!result.success) {
      console.log("❌ Login failed:", result.message);
      return NextResponse.json(result, { status: 401 });
    }

    console.log("✅ Login successful, setting cookie...");

    // Create response with cookie
    const response = NextResponse.json(result, { status: 200 });

    if (result.token) {
      // Set HTTP-only cookie with less restrictive settings for development
      const cookieValue = `auth-token=${result.token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${7 * 24 * 60 * 60}`;
      response.headers.set("Set-Cookie", cookieValue);
      console.log("🍪 Login cookie set:", cookieValue);
    }

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Внутренняя ошибка сервера",
      },
      { status: 500 },
    );
  }
}
