import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { User, UserType, JWTPayload, AuthResponse } from "./types";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";
const TOKEN_EXPIRY = "7d";
const COOKIE_NAME = "auth-token";

// In-memory user storage for MVP (replace with database later)
const users: Map<string, User & { password: string }> = new Map();

export class AuthService {
  // Hash password
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  // Verify password
  static async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  // Generate JWT token
  static generateToken(user: User): string {
    const payload: Omit<JWTPayload, "iat" | "exp"> = {
      userId: user.id,
      email: user.email,
      userType: user.userType,
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
  }

  // Verify JWT token
  static verifyToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
      return null;
    }
  }

  // Register new user
  static async register(
    email: string,
    password: string,
    name: string,
    userType: UserType,
    phone?: string,
  ): Promise<AuthResponse> {
    try {
      // Check if user already exists (case-insensitive email)
      const normalizedEmail = email.toLowerCase().trim();
      const existingUser = Array.from(users.values()).find(
        (u) => u.email.toLowerCase().trim() === normalizedEmail,
      );
      if (existingUser) {
        console.log("❌ Email already exists:", normalizedEmail);
        return {
          success: false,
          message: "Пользователь с таким email уже существует",
        };
      }

      // Check if phone number already exists (if phone is provided)
      if (phone && phone.trim()) {
        const normalizedPhone = phone.trim().replace(/\D/g, ""); // Remove non-digits
        const existingPhoneUser = Array.from(users.values()).find(
          (u) =>
            u.phone && u.phone.trim().replace(/\D/g, "") === normalizedPhone,
        );
        if (existingPhoneUser) {
          console.log("❌ Phone already exists:", phone);
          return {
            success: false,
            message: "Пользователь с таким номером телефона уже существует",
          };
        }
      }

      // Hash password
      const hashedPassword = await this.hashPassword(password);

      // Create new user
      const userId =
        Math.random().toString(36).substring(2) + Date.now().toString(36);
      const newUser: User & { password: string } = {
        id: userId,
        email: normalizedEmail,
        password: hashedPassword,
        name: name.trim(),
        userType,
        phone: phone?.trim() || undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Store user (in production, save to database)
      users.set(userId, newUser);
      console.log(
        "✅ User created:",
        newUser.email,
        "ID:",
        userId,
        "Type:",
        newUser.userType,
      );

      // Generate token
      const token = this.generateToken(newUser);

      // Return user without password
      const { password: _, ...userWithoutPassword } = newUser;

      return {
        success: true,
        message: "Регистрация прошла успешно",
        user: userWithoutPassword,
        token,
      };
    } catch (error) {
      return {
        success: false,
        message: "Ошибка при регистрации",
      };
    }
  }

  // Login user
  static async login(email: string, password: string): Promise<AuthResponse> {
    try {
      console.log("🔍 AuthService: Looking for email:", email);
      console.log("📊 Current users count:", users.size);
      console.log(
        "📋 All emails in database:",
        Array.from(users.values()).map((u) => u.email),
      );

      // Find user by email (case-insensitive)
      const normalizedEmail = email.toLowerCase().trim();
      const user = Array.from(users.values()).find(
        (u) => u.email.toLowerCase().trim() === normalizedEmail,
      );
      if (!user) {
        console.log("❌ User not found for email:", email);
        return {
          success: false,
          message: "Неверный email или пароль",
        };
      }

      console.log("✅ User found:", user.email, "Type:", user.userType);

      // Verify password
      console.log("🔐 Verifying password...");
      const isValidPassword = await this.verifyPassword(
        password,
        user.password,
      );
      if (!isValidPassword) {
        console.log("❌ Invalid password for user:", email);
        return {
          success: false,
          message: "Неверный email или пароль",
        };
      }

      console.log("✅ Password valid for user:", email);

      // Generate token
      const token = this.generateToken(user);

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;

      return {
        success: true,
        message: "Вход выполнен успешно",
        user: userWithoutPassword,
        token,
      };
    } catch (error) {
      return {
        success: false,
        message: "Ошибка при входе",
      };
    }
  }

  // Get user by ID
  static getUserById(userId: string): User | null {
    const user = users.get(userId);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  // Get current user from request
  static async getCurrentUser(request: NextRequest): Promise<User | null> {
    try {
      const token = request.cookies.get(COOKIE_NAME)?.value;
      console.log("🍪 Token from cookie:", token ? "exists" : "missing");
      if (!token) return null;

      const payload = this.verifyToken(token);
      console.log("🔍 Token payload:", payload ? "valid" : "invalid");
      if (!payload) return null;

      const user = this.getUserById(payload.userId);
      console.log("👤 Found user:", user ? user.email : "not found");
      return user;
    } catch (error) {
      console.error("❌ getCurrentUser error:", error);
      return null;
    }
  }

  // Set auth cookie (less restrictive for development)
  static setAuthCookie(token: string): string {
    const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds
    return `${COOKIE_NAME}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}`;
  }

  // Clear auth cookie
  static clearAuthCookie(): string {
    return `${COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`;
  }
}

// Client-side auth utilities
export const clientAuth = {
  // Get token from cookies (client-side)
  getToken(): string | null {
    if (typeof window === "undefined") return null;

    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith(`${COOKIE_NAME}=`),
    );

    return tokenCookie ? tokenCookie.split("=")[1] : null;
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  },

  // Logout (client-side)
  logout(): void {
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    window.location.href = "/auth/login";
  },
};

// Password validation
export const validatePassword = (password: string): string[] => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Пароль должен содержать минимум 8 символов");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Пароль должен содержать хотя бы одну заглавную букву");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Пароль должен содержать хотя бы одну строчную букву");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Пароль должен содержать хотя бы одну цифру");
  }

  return errors;
};

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
