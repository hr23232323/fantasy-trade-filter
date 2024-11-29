export const dynamic = "force-dynamic"; // Tell NextJS to make this dynamic
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

import fs from "fs/promises";
import path from "path";

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

    // Reference the file path in the `public` directory
    const templatesPath = path.join(process.cwd(), "public", "memeTemplates.json");
    const templatesData = await fs.readFile(templatesPath, "utf-8");
    const templates = JSON.parse(templatesData);

    // Randomly select 12 meme templates
    const randomTemplates = templates.sort(() => 0.5 - Math.random()).slice(0, 12);

    // OpenAI API call
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a creative assistant that generates text for memes. Each template includes an "id", "name", and "lines". Use the input text to generate meme captions. Each meme requires "topText" and "bottomText" fields. If the template has only 1 line, use "topText" only.`,
        },
        {
          role: "user",
          content: `Input Text: "${inputText}"
  
          Templates:
          ${JSON.stringify(randomTemplates, null, 2)}
  
          Generate meme text for each template in this format:
          [
            { "id": "template_id", "texts": [{ "topText": "line 1", "bottomText": "line 2" }] }
          ]`,
        },
      ]
    }

    const response = await openai.chat.completions.create(params);

      // Use optional chaining to safely access properties (and trim + drop backticks)
    const content = response?.choices?.[0]?.message?.content?.trim().replace(/`/g, "");;

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
