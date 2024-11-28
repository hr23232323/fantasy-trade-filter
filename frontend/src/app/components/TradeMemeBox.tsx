import React from "react";
import PlayerBuckets, { Buckets } from "./PlayerBuckets";

interface TradeMemeBoxProps {
  updateBackupInputText: (inputText: string) => void;
}

export const TradeMemeBox: React.FC<TradeMemeBoxProps> = ({
  updateBackupInputText,
}) => {
  const handleBucketChange = (buckets: Buckets) => {
    const playersTradingAway = buckets.tradingAway
      .map((player) => player.playerName)
      .join(", ");
    const playersTryingToGet = buckets.tryingToGet
      .map((player) => player.playerName)
      .join(", ");

    if (!playersTradingAway && !playersTryingToGet) {
      // No players
      return;
    }

    updateBackupInputText(
      `Make a meme about trying to sell ${playersTradingAway} for ${playersTryingToGet}`
    );
  };
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg border border-gray-200 md:w-3/5">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        🔀 Trade Starter Meme
      </h2>
      <p className="text-xs text-gray-600 mb-4">
        Select players to get started - move them to the correct bucket and hit
        generate.
      </p>
      <PlayerBuckets handleBucketChange={handleBucketChange} />
    </div>
  );
};

export default TradeMemeBox;
