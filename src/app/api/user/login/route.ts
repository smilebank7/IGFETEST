import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Admin from '@/models/Admin';

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { userId, userPw } = body;

    // Admin 컬렉션에서 해당 userId를 가진 문서 찾기
    const admin = await Admin.findOne({ userId });

    if (!admin) {
      return NextResponse.json({ message: "사용자를 찾을 수 없습니다." }, { status: 401 });
    }

    // 비밀번호 검증
    if (admin.password !== userPw) {
      return NextResponse.json({ message: "비밀번호가 일치하지 않습니다." }, { status: 401 });
    }

    // 로그인 성공
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