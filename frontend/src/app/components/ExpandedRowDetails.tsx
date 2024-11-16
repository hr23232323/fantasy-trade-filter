import React, { FC, Fragment } from "react";
import { Player } from "../types/Player";

interface ExpandedRowDetailsProps {
  player: Player;
}

export const ExpandedRowDetails: FC<ExpandedRowDetailsProps> = ({ player }) => {
  return (
    <tr>
      <td colSpan={7} className="bg-gray-50 p-4">
        <div className="text-sm text-gray-700">
          <strong>Height:</strong> {player.heightFeet}'{player.heightInches}" |{" "}
          <strong>Weight:</strong> {player.weight} lbs |{" "}
          <strong>Experience:</strong> {player.seasonsExperience} seasons
        </div>
        {player.injury.injuryName && (
          <div className="mt-2 text-sm text-red-600">
            <strong>Injury:</strong> {player.injury.injuryName} (
            {player.injury.injuryArea}) | Est Return:{" "}
            {player.injury.injuryReturn || "TBD"}
          </div>
        )}
      </td>
    </tr>
  );
};

export default ExpandedRowDetails;
