import React, { FC } from "react";
import { FaFootballBall, FaUser, FaUsers } from "react-icons/fa"; // Icons for visual clarity

interface LeagueModeToggleProps {
  isOneQBMode: boolean;
  toggleQBMode: () => void;
}

const LeagueModeToggle: FC<LeagueModeToggleProps> = ({
  isOneQBMode,
  toggleQBMode,
}) => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg m-2 border border-gray-200">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          🏈 <span>League Format</span>
        </h2>
        <p className="text-xs text-gray-600 mb-4">
          Number of QBs changes everything - match your league.
        </p>
        <div className="flex items-center space-x-4">
          {/* 1QB Button */}
          <button
            aria-label="1QB League"
            onClick={() => toggleQBMode()}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg focus:outline-none transition-colors ${
              isOneQBMode
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            <FaUser className="w-5 h-5 p-1" />
            <span>1QB</span>
          </button>

          {/* 2QB Button */}
          <button
            aria-label="2QB League"
            onClick={() => toggleQBMode()}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg focus:outline-none transition-colors ${
              !isOneQBMode
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            <FaUsers className="w-5 h-5" />
            <span>2QB/SuperFlex</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeagueModeToggle;
