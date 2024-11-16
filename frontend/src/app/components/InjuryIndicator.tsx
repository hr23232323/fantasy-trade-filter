import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { Player } from "../types/Player";

interface InjuryIndicatorProps {
  player: Player;
}

export const InjuryIndicator: React.FC<InjuryIndicatorProps> = ({ player }) => {
  const getInjuryStatus = (injuryCode: number) => {
    switch (injuryCode) {
      case 1:
        return { label: "Healthy", color: "text-green-500" };
      case 2:
        return { label: "Questionable", color: "text-yellow-500" };
      case 4:
        return { label: "Out", color: "text-red-400" };
      case 6:
        return { label: "On IR", color: "text-rose-700" };
      default:
        return { label: "Unknown", color: "text-gray-400" };
    }
  };

  const injuryDetails = getInjuryStatus(player.injury.injuryCode);

  return player.injury.injuryCode > 1 ? (
    <div className="ml-2 relative group">
      <FaExclamationCircle
        className={`w-4 h-4 ${injuryDetails.color}`}
        aria-label={`Injury: ${injuryDetails.label}`}
      />
      <div
        className="absolute hidden group-hover:block bg-white text-gray-700 text-xs rounded-lg shadow-lg p-2 mt-1 z-10"
        style={{ whiteSpace: "nowrap" }}
      >
        <strong>Injury:</strong>{" "}
        {player.injury.injuryName || injuryDetails.label}
        {player.injury.injuryArea && ` (${player.injury.injuryArea})`}
        <br />
        <strong>Est. Return:</strong> {player.injury.injuryReturn || "TBD"}
      </div>
    </div>
  ) : (
    <></>
  );
};
