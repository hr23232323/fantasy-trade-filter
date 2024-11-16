import React, { FC, Fragment } from "react";
import { Player } from "../types/Player";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { InjuryIndicator } from "./InjuryIndicator";
import { ExpandedRowDetails } from "./ExpandedRowDetails";

interface PlayerTableRowProps {
  player: Player;
  isExpanded: boolean;
  toggleExpandRow: (slug: string) => void;
  isOneQBMode: boolean;
}

const getPositionRowColor = (position: string) => {
  switch (position) {
    case "QB":
      return "bg-blue-100 hover:bg-blue-200"; // Subtle blue for QB
    case "WR":
      return "bg-orange-100 hover:bg-orange-200"; // Subtle orange for WR
    case "RB":
      return "bg-green-100 hover:bg-green-200"; // Subtle green for RB
    case "TE":
      return "bg-purple-100 hover:bg-purple-200"; // Subtle purple for TE
    default:
      return "bg-gray-100 hover:bg-gray-200"; // Neutral gray for others
  }
};

const getPositionExpandColor = (position: string) => {
  switch (position) {
    case "QB":
      return "bg-blue-50"; // Subtle blue for QB
    case "WR":
      return "bg-orange-50"; // Subtle orange for WR
    case "RB":
      return "bg-green-50"; // Subtle green for RB
    case "TE":
      return "bg-purple-50"; // Subtle purple for TE
    default:
      return "bg-gray-50"; // Neutral gray for others
  }
};

const getValueBadgeStyle = (tier: number) => {
  if (tier <= 3)
    return "bg-green-100 text-green-700 font-semibold rounded-full px-2 py-1";
  if (tier > 3)
    return "bg-yellow-100 text-yellow-700 font-semibold rounded-full px-2 py-1";
  return "bg-red-100 text-red-700 font-semibold rounded-full px-2 py-1";
};

const positionIcons: Record<string, JSX.Element> = {
  WR: <span>🧤</span>, // Wide Receiver
  RB: <span>🏃‍♂️</span>, // Running Back
  QB: <span>🏈</span>, // Quarterback
  TE: <span>🛡️</span>, // Tight End
  RDP: <span>📜</span>, // Rookie Draft Pick
};

export const PlayerTableRow: FC<PlayerTableRowProps> = ({
  player,
  isExpanded,
  toggleExpandRow,
  isOneQBMode,
}) => {
  return (
    <Fragment key={player.slug}>
      <tr
        className={`border-t cursor-pointer ${getPositionRowColor(
          player.position
        )}`}
        onClick={() => toggleExpandRow(player.slug)}
      >
        <td className="p-3 flex items-center">
          {positionIcons[player.position] || player.position}
          <span className="ml-2">{player.playerName}</span>
          {<InjuryIndicator player={player} />}
        </td>
        <td className="p-3">
          {isOneQBMode
            ? player.oneQBValues.positionalRank
            : player.superflexValues.positionalRank}
        </td>
        <td className="p-3">{player.age}</td>
        <td className="p-3">
          {isOneQBMode ? (
            <span
              className={getValueBadgeStyle(player.oneQBValues.positionalTier)}
            >
              {player.oneQBValues.value}
            </span>
          ) : (
            <span
              className={getValueBadgeStyle(
                player.superflexValues.positionalTier
              )}
            >
              {player.superflexValues.value}
            </span>
          )}
        </td>
        <td className="p-3 text-right">
          <button
            onClick={() => toggleExpandRow(player.slug)}
            className="text-gray-500 hover:text-blue-500"
            aria-label={`Expand details for ${player.playerName}`}
          >
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </td>
      </tr>

      {isExpanded && (
        <ExpandedRowDetails
          player={player}
          bgColor={getPositionExpandColor(player.position)}
        />
      )}
    </Fragment>
  );
};

export default PlayerTableRow;
