import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  // Extract query parameters
  const position = searchParams.get('position');
  const min_age = searchParams.get('min_age');
  const max_age = searchParams.get('max_age');
  const sort_field = searchParams.get('sort_field');
  const sort_order = searchParams.get('sort_order');

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  console.log('Connecting to backend:', backendUrl); // Add this log

  try {
    const response = await axios.get(`${backendUrl}/filter`, {
      params: {
        position,
        min_age,
        max_age,
        sort_field,
        sort_order,
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error('Error details:', {
      message: error.message,
      config: error.config,
      response: error.response?.data, // Backend response (if any)
      stack: error.stack, // Full error stack
    });
    return NextResponse.json(
      { error: 'Error fetching players', details: error.message },
      { status: 500 }
    );
  }
}
