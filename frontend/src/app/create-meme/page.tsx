"use client";

import { useState } from "react";
import MemeCard from "../components/MemeCard";
import { useMemeGenerator } from "../hooks/useMemeGenerator";
import MemeTextInput from "../components/MemeTextInput";

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
    <div className="container mx-auto md:p-4">
      <MemeTextInput
        inputText={inputText}
        updateInputText={updateInputText}
        loading={loading}
        error={error}
        handleGenerate={handleGenerate}
      />
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
