"use client";

import { useState } from "react";
import { useMemeGenerator } from "../hooks/useMemeGenerator";

const CreateMeme = () => {
  const [inputText, setInputText] = useState(""); // Single text input
  const { memeUrls, generateMemes, loading, error } = useMemeGenerator();

  const handleGenerate = () => {
    generateMemes(inputText);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg m-4 border border-gray-200 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        😂 Create Memes
      </h1>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Enter a description or funny text, and we’ll generate memes for you!
      </p>

      <div className="p-4 bg-white shadow-md rounded-md mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Meme Text
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your text here..."
          className="w-full p-2 border rounded-lg text-gray-900 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none hover:border-blue-500 transition ease-in-out duration-150"
          rows={4}
        />
      </div>

      <button
        onClick={handleGenerate}
        className="w-full bg-blue-500 text-white p-3 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition ease-in-out duration-150 font-bold"
      >
        Generate Memes
      </button>

      {memeUrls.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Your Memes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {memeUrls.map((url, index) => (
              <div key={index} className="p-4 bg-white shadow-md rounded-md">
                <img
                  src={url}
                  alt={`Meme ${index + 1}`}
                  className="w-full rounded-md"
                />
                <p className="mt-2 text-gray-600 text-center">
                  Meme {index + 1}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateMeme;
