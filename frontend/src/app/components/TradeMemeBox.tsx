import React from "react";
import PlayerBuckets from "./DragNDrop/PlayerBuckets";
import { Buckets } from "../types/Bucket";

interface TradeMemeBoxProps {
  inputText: string;
  updateInputText: (inputText: string) => void;
}

export const TradeMemeBox: React.FC<TradeMemeBoxProps> = ({
  inputText,
  updateInputText,
}) => {
  const handleBucketChange = (buckets: Buckets) => {
    const playersTradingAway = buckets.tradingAway
      .map((player) => player.playerName)
      .join(", ");
    const playersTryingToGet = buckets.tryingToGet
      .map((player) => player.playerName)
      .join(", ");

    // Only make input text if we have players in both buckets
    if (playersTradingAway.length > 0 && playersTryingToGet.length > 0) {
      updateInputText(
        `Make some memes about trying to trade away ${playersTradingAway} and get ${playersTryingToGet} in return.`
      );
    } else {
      // Reset
      updateInputText("");
    }
  };
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg border border-gray-200 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🔀 Trade Memes</h2>
      <p className="text-sm text-gray-600 mb-4">
        Select some players to get started.
      </p>
      <PlayerBuckets handleBucketChange={handleBucketChange} />
      <div className="p-4">
        {inputText && (
          <h3 className="text-gray-600 mt-4 italic">{inputText}</h3>
        )}
      </div>
    </div>
  );
};

export default TradeMemeBox;
