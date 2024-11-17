import React, { FC, Fragment } from "react";
import { Player } from "../types/Player";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { InjuryIndicator } from "./InjuryIndicator";
import { RookieBadge } from "./RookieBadge";
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

type BadgeStyle = {
  min: number;
  max: number;
  style: string;
};

const badgeStyles: BadgeStyle[] = [
  { min: 7500, max: Infinity, style: "bg-violet-100 text-violet-700" }, // Elite
  { min: 6000, max: 7499, style: "bg-lime-100 text-lime-900" }, // Amazing
  { min: 5000, max: 5999, style: "bg-yellow-100 text-lime-600" }, // Amazing
  { min: 3500, max: 4999, style: "bg-yellow-200 text-yellow-700" }, // Strong
  { min: 3001, max: 3499, style: "bg-orange-100 text-orange-700" }, // Solid
  { min: -Infinity, max: 3000, style: "bg-red-100 text-red-700" }, // Bad
];

const getValueBadgeStyle = (value: number): string => {
  const badge = badgeStyles.find((b) => value >= b.min && value <= b.max);
  return badge ? badge.style : "bg-gray-100 text-gray-700"; // Fallback style if needed
};

const positionIcons: Record<string, JSX.Element> = {
  WR: <span>🧤</span>, // Wide Receiver
  RB: <span>🏃‍♂️</span>, // Running Back
  QB: <span>🏈</span>, // Quarterback
  TE: <span>🛡️</span>, // Tight End
};

export const PlayerTableRow: FC<PlayerTableRowProps> = ({
  player,
  isExpanded,
  toggleExpandRow,
  isOneQBMode,
}) => {
  return (
    <Fragment>
      <tr
        className={`border-t cursor-pointer ${getPositionRowColor(
          player.position
        )}`}
        onClick={() => toggleExpandRow(player.slug)}
      >
        <td className="p-3 flex items-center">
          {positionIcons[player.position] || player.position}
          <span className="ml-2">{player.playerName}</span>
          <InjuryIndicator player={player} />
          <RookieBadge player={player} />
        </td>
        <td className="p-3 md:table-cell hidden">
          {isOneQBMode
            ? player.oneQBValues.positionalRank
            : player.superflexValues.positionalRank}
        </td>
        <td className="p-3">{player.age}</td>
        <td className="p-3">
          {isOneQBMode ? (
            <span
              className={`font-semibold rounded-full px-2 py-1 ${getValueBadgeStyle(
                player.oneQBValues.value
              )}`}
            >
              {player.oneQBValues.value}
            </span>
          ) : (
            <span
              className={`font-semibold rounded-full px-2 py-1 ${getValueBadgeStyle(
                player.superflexValues.value
              )}`}
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
