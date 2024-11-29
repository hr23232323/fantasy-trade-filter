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

  return (
    <div className="container mx-auto md:p-4 mt-10">
      <div className="px-8">
        <h1 className="text-3xl font-bold text-center mb-4">🤣 Trade Memes</h1>
        <p className="text-center text-gray-400 mb-10">
          Trades are hard to make, but some humor goes a long way in starting
          those trade talks. Generate funny memes about the players in the trade
          and hopefully get that 🐐 you need.
        </p>
      </div>
      <div className="flex flex-col mt-10 mx-4">
        <TradeMemeBox inputText={inputText} updateInputText={updateInputText} />

        <div className="flex flex-col my-4">
          {error && (
            <p className="mb-4 text-red-500 font-semibold text-center">
              {error} Please try again.
            </p>
          )}
          <div className="w-full flex flex-col justify-center items-center space-y-2">
            {/* Button */}
            <button
              onClick={handleGenerate}
              className={`w-1/2 p-3 rounded-lg shadow font-bold text-white text-center ${
                loading || !inputText
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
              } transition ease-in-out duration-150`}
              disabled={loading || !inputText} // Disable button when loading or inputText is empty
            >
              {loading ? "Generating Memes..." : "Generate Memes"}
            </button>

            {/* Tooltip / Helper Text */}
            {!inputText && (
              <p className="text-sm text-red-500">
                Select some trade players to generate memes.
              </p>
            )}
          </div>
        </div>
      </div>
      <MemeGrid loading={loading} memeUrls={memeUrls} />
    </div>
  );
};

export default CreateMeme;
