import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import SurveyResponse from '@/models/SurveyResponse';

export async function POST(req: Request) {
  try {
    await dbConnect();
    
    const body = await req.json();
    
    // 동일한 사용자의 중복 응답 체크
    const existingResponse = await SurveyResponse.findOne({
      teamName: body.teamName,
      userName: body.userName,
      // 1분 이내의 응답만 체크
      createdAt: { 
        $gte: new Date(Date.now() - 60 * 1000) // 1분 이내
      }
    });

    if (existingResponse) {
      return NextResponse.json({ 
        message: '이미 제출된 응답입니다.',
        data: existingResponse 
      }, { status: 200 });
    }

    const formattedBody = {
      ...body,
      answers: new Map(Object.entries(body.answers))
    };
    
    const surveyResponse = await SurveyResponse.create(formattedBody);
    
    return NextResponse.json({ 
      message: '설문 응답이 성공적으로 저장되었습니다.',
      data: surveyResponse 
    }, { status: 201 });
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('설문 응답 저장 오류:', error);
      return NextResponse.json({ 
        error: error.message || '설문 응답 저장 중 오류가 발생했습니다.' 
      }, { status: 500 });
    }
    throw error;
  }
}

export async function GET() {
  try {
    await dbConnect();
    
    const responses = await SurveyResponse.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();
    
    return NextResponse.json({ data: responses });
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('설문 응답 조회 오류:', error);
      return NextResponse.json({ 
        error: error.message || '설문 응답 조회 중 오류가 발생했습니다.' 
      }, { status: 500 });
    }
    throw error;
  }
} 