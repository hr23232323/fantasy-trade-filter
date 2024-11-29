"use client";

import { useEffect, useState } from "react";
import { useMemeGenerator } from "../hooks/useMemeGenerator";
import TradeMemeBox from "../components/TradeMemeBox";
import MemeGrid from "../components/MemeGrid/MemeGrid";

const CreateMeme: React.FC = () => {
  const [inputText, setInputText] = useState<string>(""); // Single text input
  const { memeUrls, generateMemes, loading, error } = useMemeGenerator();

  const handleGenerate = () => {
    generateMemes(inputText);
  };

  const updateInputText = (val: string) => {
    setInputText(val);
  };

  useEffect(() => {
    console.log(`Input text: ${inputText}`);
  }, [inputText]);

  return (
    <div className="container mx-auto md:p-4 mt-10">
      <div className="px-8">
        <h1 className="text-3xl font-bold text-center mb-4">
          🤣 Trade Meme Maker
        </h1>
      </div>
      <div className="flex flex-col mt-10 mx-4">
        <TradeMemeBox inputText={inputText} updateInputText={updateInputText} />

        <div className="flex flex-col my-4">
          {error && (
            <p className="mb-4 text-red-500 font-semibold text-center">
              {error} Please try again.
            </p>
          )}
          <div className="w-full flex justify-center items-center">
            <button
              onClick={handleGenerate}
              className={`w-1/2 p-3 rounded-lg shadow font-bold text-white text-center ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
              } transition ease-in-out duration-150`}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Generating Memes..." : "Generate Memes"}
            </button>
          </div>
        </div>
      </div>
      <MemeGrid loading={loading} memeUrls={memeUrls} />
    </div>
  );
};

export default CreateMeme;
