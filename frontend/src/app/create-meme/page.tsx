"use client";

import { useEffect, useState } from "react";
import MemeCard from "../components/MemeCard";
import { useMemeGenerator } from "../hooks/useMemeGenerator";
import MemeTextInput from "../components/MemeTextInput";
import PlayerBuckets, { Buckets } from "../components/PlayerBuckets";

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

  const handleBucketChange = (buckets: Buckets) => {
    const playersTradingAway = buckets.tradingAway
      .map((player) => player.playerName)
      .join(", ");
    const playersTryingToGet = buckets.tryingToGet
      .map((player) => player.playerName)
      .join(", ");

    setBackupInputText(
      `Make a meme about trying to sell ${playersTradingAway} for ${playersTryingToGet}`
    );
  };

  return (
    <div className="container mx-auto md:p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MemeTextInput
          inputText={inputText}
          updateInputText={updateInputText}
          loading={loading}
          error={error}
          handleGenerate={handleGenerate}
        />

        {/* Right: Drag and Drop Player Buckets */}
        <PlayerBuckets handleBucketChange={handleBucketChange} />
      </div>
      <div className="mt-6">
        <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"}>
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
