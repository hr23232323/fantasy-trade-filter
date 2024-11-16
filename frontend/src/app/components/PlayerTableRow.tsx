import React, { FC, Fragment } from "react";
import { Player } from "../types/Player";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { InjuryIndicator } from "./InjuryIndicator";
import { ExpandedRowDetails } from "./ExpandedRowDetails";

interface PlayerTableRowProps {
  player: Player;
  isExpanded: boolean;
  toggleExpandRow: (slug: string) => void;
}

const getPositionRowColor = (position: string) => {
  switch (position) {
    case "QB":
      return "bg-blue-100"; // Subtle blue for QB
    case "WR":
      return "bg-orange-100"; // Subtle orange for WR
    case "RB":
      return "bg-green-100"; // Subtle green for RB
    case "TE":
      return "bg-purple-100"; // Subtle purple for TE
    default:
      return "bg-gray-100"; // Neutral gray for others
  }
};

const getValueBadgeStyle = (tier: number) => {
  if (tier <= 3)
    return "bg-green-100 text-green-700 font-semibold rounded-full px-2 py-1";
  if (tier > 3)
    return "bg-yellow-100 text-yellow-700 font-semibold rounded-full px-2 py-1";
  return "bg-red-100 text-red-700 font-semibold rounded-full px-2 py-1";
};

export const PlayerTableRow: FC<PlayerTableRowProps> = ({
  player,
  isExpanded,
  toggleExpandRow,
}) => {
  return (
    <Fragment key={player.slug}>
      <tr
        className={`border-t hover:bg-gray-100 ${getPositionRowColor(
          player.position
        )}`}
      >
        <td className="p-3 flex items-center">
          {player.playerName}
          {<InjuryIndicator player={player} />}
        </td>
        <td className="p-3">{player.position}</td>
        <td className="p-3">{player.age}</td>
        <td className="p-3">{player.teamLongName}</td>
        <td className="p-3">
          <span
            className={getValueBadgeStyle(player.oneQBValues.positionalTier)}
          >
            {player.oneQBValues.value}
          </span>
        </td>
        <td className="p-3">
          <span
            className={getValueBadgeStyle(
              player.superflexValues.positionalTier
            )}
          >
            {player.superflexValues.value}
          </span>
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

      {isExpanded && <ExpandedRowDetails player={player} />}
    </Fragment>
  );
};

export default PlayerTableRow;
