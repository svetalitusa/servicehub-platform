import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Get user from token in HTTP-only cookie
    const user = await AuthService.getCurrentUser(request);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Пользователь не аутентифицирован',
        },
        { status: 401 }
      );
    }

    console.log('✅ Current user found:', user.email, 'Type:', user.userType);

    return NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Ошибка при проверке аутентификации',
      },
      { status: 500 }
    );
  }
}
