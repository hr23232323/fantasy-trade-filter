import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest): Promise<NextResponse> {

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  console.log('Connecting to backend:', backendUrl); // Add this log

  try {
    const response = await axios.get(`${backendUrl}/all-players`);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error('Error details:', {
      message: error.message,
      config: error.config,
      response: error.response?.data, // Backend response (if any)
      stack: error.stack, // Full error stack
    });
    return NextResponse.json(
      { error: 'Error fetching all players', details: error.message },
      { status: 500 }
    );
  }
}
