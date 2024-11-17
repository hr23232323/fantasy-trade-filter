import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Fetch runtime environment variables from process.env
    const runtimeEnv = {
      NEXT_PUBLIC_ENABLE_POSTHOG: process.env.NEXT_PUBLIC_ENABLE_POSTHOG || "0",
      NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY || "",
      NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST || "",
    };

    return NextResponse.json(runtimeEnv, { status: 200 });
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
