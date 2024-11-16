import React, { FC } from "react";
import { Player } from "../types/Player";

interface RankingBarsProps {
  player: Player;
}

const getNormalizedWidth = (rank: number): string => {
  const minWidth = 10; // Ensure bars never go below 10% width
  const maxWidth = 100; // Full width for the top rank
  const maxRank = 300; // Assume a reasonable max rank to scale effectively

  // Normalize rank to a percentage (inverted scale)
  const normalized = Math.max(
    minWidth,
    maxWidth - (rank / maxRank) * (maxWidth - minWidth)
  );

  return `${normalized}%`;
};

export const RankingBars: FC<RankingBarsProps> = ({ player }) => {
  return (
    <div>
      <div className="text-gray-600">
        <strong>Overall Ranks:</strong>
        <div className="mt-2 space-y-2">
          {/* 1QB Rank */}
          <div className="flex items-center justify-between">
            <span className="text-sm">
              1QB: <strong>#{player.oneQBValues.rank}</strong>
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{
                width: getNormalizedWidth(player.oneQBValues.rank),
              }}
            ></div>
          </div>

          {/* 2QB/SF Rank */}
          <div className="flex items-center justify-between">
            <span className="text-sm">
              2QB: <strong>#{player.superflexValues.rank}</strong>
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-purple-500 h-2.5 rounded-full"
              style={{
                width: getNormalizedWidth(player.superflexValues.rank),
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingBars;
