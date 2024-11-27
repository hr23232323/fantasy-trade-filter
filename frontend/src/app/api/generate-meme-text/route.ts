export const dynamic = "force-dynamic"; // Tell NextJS to make this dynamic
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'NOT SET',
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json(); // Extract JSON payload from request
    const { inputText } = body;

    if (!inputText || typeof inputText !== "string") {
      return NextResponse.json(
        { error: "Invalid input text. Please provide a valid string." },
        { status: 400 }
      );
    }

    // OpenAI API call
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a creative assistant who generates text for memes. Given an input, you create 4 sets of meme text with a "topText" and "bottomText" for the following templates:
          1. Good Guy Greg
          2. Drakeposting
          3. Conspiracy Keanu
          4. Two Buttons.`,
        },
        {
          role: "user",
          content: `Input Text: "${inputText}"\n\nGenerate meme text in this JSON format:
          [
            { "topText": "text for meme 1 top", "bottomText": "text for meme 1 bottom" },
            { "topText": "text for meme 2 top", "bottomText": "text for meme 2 bottom" },
            { "topText": "text for meme 3 top", "bottomText": "text for meme 3 bottom" },
            { "topText": "text for meme 4 top", "bottomText": "text for meme 4 bottom" }
          ]`,
        },
      ],
    }

    const response = await openai.chat.completions.create(params);

      // Use optional chaining to safely access properties
    const content = response?.choices?.[0]?.message?.content?.trim();

    // error handling
    if (!content) {
      throw new Error("Content is empty or undefined");
    }

    // Use nullish coalescing to provide a fallback
    const memeTexts = content ? JSON.parse(content) : [];

    // Respond with generated meme texts
    return NextResponse.json({ memeTexts }, { status: 200 });
  } catch (error: any) {
    // Log detailed error information
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
    });

    return NextResponse.json(
      { error: "Failed to generate meme texts", details: error.message },
      { status: 500 }
    );
  }
}
