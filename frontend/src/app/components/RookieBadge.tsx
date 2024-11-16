import React from "react";
import { FaStar } from "react-icons/fa"; // Icon for rookie status
import { Player } from "../types/Player";

interface RookieBadgeProps {
  player: Player;
}

export const RookieBadge: React.FC<RookieBadgeProps> = ({ player }) => {
  if (player.seasonsExperience !== 0) {
    return null; // Only show for rookies
  }

  return (
    <div className="ml-2 relative group inline-flex items-center">
      {/* Badge */}
      <div className="flex items-center space-x-1 bg-indigo-100 text-indigo-800 font-semibold text-xs px-2 py-1 rounded-full shadow-sm">
        <FaStar className="w-4 h-4" />
        <span>Rookie</span>
      </div>
    </div>
  );
};

export default RookieBadge;
