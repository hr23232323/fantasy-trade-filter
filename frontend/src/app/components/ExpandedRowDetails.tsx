import React, { FC } from "react";
import { Player } from "../types/Player";
import {
  FaWeight,
  FaCalendarAlt,
  FaRulerVertical,
  FaHeartbeat,
} from "react-icons/fa";
import RankingBars from "./RankingBars";

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
          <div>
            <div className="text-gray-600">
              <FaCalendarAlt className="inline-block mr-1 text-gray-500" />
              <strong>Bye Week:</strong> {player.byeWeek || "N/A"}
            </div>
            <div className="text-gray-600 mt-2">
              <strong>Experience:</strong> {player.seasonsExperience} seasons
            </div>
          </div>
          <RankingBars player={player} />
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
