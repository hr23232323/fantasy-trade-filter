import React, { FC, Fragment, useEffect } from "react";
import { Player } from "../types/Player";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { InjuryIndicator } from "./InjuryIndicator";
import { RookieBadge } from "./RookieBadge";
import { ExpandedRowDetails } from "./ExpandedRowDetails";
import {
  getPositionRowColor,
  positionIcons,
  getValueBadgeStyle,
  getPositionExpandColor,
} from "../utils/CustomStyleHelpers";

interface PlayerTableRowProps {
  player: Player;
  isExpanded: boolean;
  toggleExpandRow: (slug: string) => void;
  isOneQBMode: boolean;
  checked: boolean;
  togglePlayerSelection: (name: string) => void;
}

export const PlayerTableRow: FC<PlayerTableRowProps> = ({
  player,
  isExpanded,
  toggleExpandRow,
  isOneQBMode,
  checked,
  togglePlayerSelection,
}) => {
  return (
    <Fragment>
      <tr
        className={`border-t cursor-pointer ${getPositionRowColor(
          player.position
        )}`}
        onClick={(e) => {
          // Prevent expanding if the click is on the checkbox column
          const target = e.target as HTMLElement;
          if (target.tagName !== "INPUT") {
            toggleExpandRow(player.slug);
          }
        }}
      >
        <td
          className="p-3 text-center"
          onClick={(e) => {
            e.stopPropagation();
            togglePlayerSelection(player.playerName);
          }}
        >
          <input
            className="cursor-pointer"
            type="checkbox"
            checked={checked}
            onChange={(e) => togglePlayerSelection(player.playerName)}
          />
        </td>
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
