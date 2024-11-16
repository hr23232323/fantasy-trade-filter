import React, { FC } from "react";
import { Player } from "../types/Player";
import {
  FaWeight,
  FaCalendarAlt,
  FaRulerVertical,
  FaHeartbeat,
} from "react-icons/fa";

interface ExpandedRowDetailsProps {
  player: Player;
  bgColor: string;
}

export const ExpandedRowDetails: FC<ExpandedRowDetailsProps> = ({
  player,
  bgColor,
}) => {
  return (
    <tr>
      <td colSpan={7} className={`${bgColor} p-4 border-b-8`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {/* Player Info Section */}
          <div>
            <div className="flex items-center space-x-2">
              <strong>{player.position}</strong>
              <span>for the</span>
              <strong>{player.teamLongName}</strong>
            </div>
            <div className="mt-2 text-gray-600">
              <FaRulerVertical className="inline-block mr-1 text-gray-500" />
              <strong>Height:</strong> {player.heightFeet}'{player.heightInches}
              " | <FaWeight className="inline-block mr-1 text-gray-500" />
              <strong>Weight:</strong> {player.weight} lbs
            </div>
          </div>

          {/* Experience and Bye Week Section */}
          <div>
            <div className="text-gray-600">
              <FaCalendarAlt className="inline-block mr-1 text-gray-500" />
              <strong>Bye Week:</strong> {player.byeWeek || "N/A"}
            </div>
            <div className="text-gray-600 mt-2">
              <strong>Experience:</strong> {player.seasonsExperience} seasons
            </div>
          </div>
          {/* Rankings Section */}
          <div>
            <div className="text-gray-600">
              <strong>Overall Ranks:</strong>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    1QB: <strong>#{player.oneQBValues.rank}</strong>
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      player.oneQBValues.overallTier === 1
                        ? "bg-green-100 text-green-700"
                        : player.oneQBValues.overallTier === 2
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    Tier {player.oneQBValues.overallTier}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{
                      width: `${100 - player.oneQBValues.rank / 2}%`,
                    }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    2QB/SF: <strong>#{player.superflexValues.rank}</strong>
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      player.superflexValues.overallTier === 1
                        ? "bg-green-100 text-green-700"
                        : player.superflexValues.overallTier === 2
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    Tier {player.superflexValues.overallTier}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-500 h-2.5 rounded-full"
                    style={{
                      width: `${100 - player.superflexValues.rank / 2}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Injury Section (If Applicable) */}
          {player.injury.injuryName && (
            <div className="text-red-600">
              <FaHeartbeat className="inline-block mr-1 text-red-500" />
              <strong>Injury:</strong> {player.injury.injuryName} (
              {player.injury.injuryArea}) | Return:{" "}
              {player.injury.injuryReturn || "TBD"}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ExpandedRowDetails;
