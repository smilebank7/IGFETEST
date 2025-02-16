import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await dbConnect();
    const connectionStatus = mongoose.connection.readyState;
    
    return NextResponse.json({ 
      status: 'success',
      connectionState: connectionStatus 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    await dbConnect();
    const connectionStatus = mongoose.connection.readyState;
    
    return NextResponse.json({ 
      status: 'success',
      connectionState: connectionStatus 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 