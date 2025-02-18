import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Admin from '@/models/Admin';

interface Admin {
  userId: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const [, body] = await Promise.all([
      dbConnect(),
      request.json()
    ]);
    
    const { userId, userPw } = body;

    const admin = await Admin.findOne(
      { userId }, 
      { userId: 1, password: 1 }
    ).lean() as Admin | null;

    if (!admin) {
      return NextResponse.json(
        { message: "사용자를 찾을 수 없습니다." }, 
        { status: 401 }
      );
    }

    if (admin.password !== userPw) {
      return NextResponse.json(
        { message: "비밀번호가 일치하지 않습니다." }, 
        { status: 401 }
      );
    }

    return NextResponse.json({ 
      message: "OK",
      user: {
        id: admin.userId,
        role: 'admin'
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
} 