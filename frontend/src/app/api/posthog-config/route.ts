import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {

  try {
    const posthog_enabled = process.env.ENABLE_POSTHOG;
    const posthog_key = process.env.POSTHOG_KEY;
    const posthog_url = process.env.POSTHOG_HOST;

    const vars = {
      ENABLE_POSTHOG: posthog_enabled,
      POSTHOG_KEY: posthog_key,
      POSTHOG_HOST: posthog_url,
    }

    return NextResponse.json(vars, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching runtime environment variables:', {
      message: error.message,
      stack: error.stack,
    });

    return NextResponse.json(
      { error: 'Error fetching runtime environment variables', details: error.message },
      { status: 500 }
    );
  }
}
