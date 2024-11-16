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

export const PlayerTableRow: FC<PlayerTableRowProps> = ({
  player,
  isExpanded,
  toggleExpandRow,
}) => {
  return (
    <Fragment key={player.slug}>
      <tr className="border-t hover:bg-gray-50">
        <td className="p-3 flex items-center">
          {player.playerName}
          {<InjuryIndicator player={player} />}
        </td>
        <td className="p-3">{player.position}</td>
        <td className="p-3">{player.age}</td>
        <td className="p-3">{player.teamLongName}</td>
        <td className="p-3">{player.oneQBValues.value}</td>
        <td className="p-3">{player.superflexValues.value}</td>
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
