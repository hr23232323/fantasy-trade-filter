"use client";

import { useState } from "react";
import MemeCard from "../components/MemeCard";
import { useMemeGenerator } from "../hooks/useMemeGenerator";

const CreateMeme: React.FC = () => {
  const [inputText, setInputText] = useState<string>(""); // Single text input
  const { memeUrls, generateMemes, loading, error } = useMemeGenerator();

  const handleGenerate = () => {
    generateMemes(inputText);
  };

  return (
    <div className="container mx-auto md:p-4">
      <div className="p-6 bg-gray-100 rounded-lg shadow-lg m-4 border border-gray-200 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          😂 Create Memes
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Select some players or enter some text to generate memes to kickstart
          trade talks with.
        </p>

        <div className="p-4 bg-white shadow-md rounded-md mb-6">
          <textarea
            id="memeText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Talk your shit king..."
            className="w-full p-2 border rounded-lg text-gray-900 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none hover:border-blue-500 transition ease-in-out duration-150"
            rows={4}
            disabled={loading} // Disable input while loading
          />
        </div>

        {error && (
          <p className="mb-4 text-red-500 font-semibold text-center">
            {error} Please try again.
          </p>
        )}

        <button
          onClick={handleGenerate}
          className={`w-full p-3 rounded-lg shadow font-bold text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
          } transition ease-in-out duration-150`}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Generating Memes..." : "Generate Memes"}
        </button>
      </div>

      <div className="mt-6">
        <div className={"grid grid-cols-2 sm:grid-cols-3 gap-6"}>
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
    </div>
  );
};

export default CreateMeme;
