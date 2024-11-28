"use client";

import { useEffect, useState } from "react";
import MemeCard from "../components/MemeCard";
import { useMemeGenerator } from "../hooks/useMemeGenerator";
import TextMemeBox from "../components/TextMemeBox";
import TradeMemeBox from "../components/TradeMemeBox";

const CreateMeme: React.FC = () => {
  const [inputText, setInputText] = useState<string>(""); // Single text input
  const [backupInputText, setBackupInputText] = useState<string>(""); // Single text input
  const { memeUrls, generateMemes, loading, error } = useMemeGenerator();

  const handleGenerate = () => {
    if (inputText !== "") {
      generateMemes(inputText);
    } else {
      generateMemes(backupInputText);
    }
  };

  const updateInputText = (val: string) => {
    setInputText(val);
  };

  const updateBackupInputText = (val: string) => {
    setBackupInputText(val);
  };

  useEffect(() => {
    console.log(`Input text: ${inputText}`);
    console.log(`Backup Input text: ${backupInputText}`);
  }, [inputText, backupInputText]);

  return (
    <div className="container mx-auto md:p-4 mt-10">
      <div className="px-8">
        <h1 className="text-3xl font-bold text-center mb-4">
          🤣 Trade Meme Maker
        </h1>
        <p className="text-center text-gray-400 mb-10">
          Select some players or enter some text to generate memes to kickstart
          trade talks with (or talk shit).
        </p>
      </div>
      <div className="flex flex-col mt-10 mx-4">
        <div className="flex flex-col md:flex-row md:mx-10 space-y-4 md:space-x-4 md:space-y-0">
          <TextMemeBox
            inputText={inputText}
            updateInputText={updateInputText}
            loading={loading}
          />

          <TradeMemeBox updateBackupInputText={updateBackupInputText} />
        </div>

        <div className="flex flex-col mt-4">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(loading ? [...Array(3)] : memeUrls).map((urlOrEmpty, index) => (
          <MemeCard
            key={index}
            loading={loading}
            url={!loading ? urlOrEmpty : ""}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default CreateMeme;
