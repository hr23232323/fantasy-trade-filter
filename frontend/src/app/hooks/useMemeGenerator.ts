import { useState } from "react";

export const useMemeGenerator = () => {
  const [memeUrls, setMemeUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateMemes = async (inputText: string) => {
    if (!inputText.trim()) {
      setError("Please enter some text!");
      return;
    }

    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      // Call the Next.js API route
      const response = await fetch("/api/generate-meme-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputText }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate meme text");
      }

      const { memeTexts } = await response.json();

      // Generate URLs for the memes using the returned data
      const generatedUrls = memeTexts.map((meme: any) => {
        const { id, texts } = meme;
        const topText = encodeURIComponent(texts[0]?.topText || "");
        const bottomText = encodeURIComponent(texts[0]?.bottomText || "");
        return `https://api.memegen.link/images/${id}/${topText}/${bottomText}.png`;
      });

      setMemeUrls(generatedUrls);
    } catch (error: any) {
      console.error("Error generating memes:", error);
      setError("Failed to generate memes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { memeUrls, generateMemes, loading, error };
};
