import { FC, useEffect, useState } from "react";
import { Player } from "../types/Player";
import { PlayerTableRow } from "./PlayerTableRow";
import { useAppContext } from "../context/AppContext";

interface PlayerTableProps {
  players: Player[];
  resultSummary: string;
  isOneQBMode: boolean;
  searchValue: string;
  handleSearch: (nameString: string) => void;
}

const PlayerTable: FC<PlayerTableProps> = ({
  players,
  resultSummary,
  isOneQBMode,
  searchValue,
  handleSearch,
}) => {
  const { selectedPlayers, addPlayer, removePlayer } = useAppContext();
  const [expandedRow, setExpandedRow] = useState<string | null>(null); // Track expanded rows for details
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;

  const toggleExpandRow = (slug: string) => {
    setExpandedRow(expandedRow === slug ? null : slug);
  };

  const handlePageChange = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    if (direction === "next" && currentPage * rowsPerPage < players.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginatedPlayers = players.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const togglePlayerSelection = (player: Player) => {
    if (selectedPlayers.some((p) => p.slug === player.slug)) {
      removePlayer(player);
    } else {
      addPlayer(player);
    }
  };

  return (
    <div className="overflow-x-auto mt-4 bg-gray-100 p-2 md:p-4 md:rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mt-2">📋 Player List</h2>
      <p className="text-sm text-gray-700 bg-gray-100 rounded mt-1 mb-6">
        {resultSummary}
      </p>
      <div className="flex flex-row text-md text-gray-700 mb-4">
        <label className="hidden md:flex p-2 self-center font-bold">
          Search by Name:{" "}
        </label>
        <input
          type="text"
          placeholder="Search by player name..."
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex grow p-2 border rounded-md"
        />
      </div>
      <table className="text-sm min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-800 text-white sticky top-0">
          <tr>
            <th className="p-3 text-left">&nbsp;</th>
            <th className="p-3 text-left">Player</th>
            <th className="p-3 text-left md:table-cell hidden">
              Position Rank
            </th>
            <th className="p-3 text-left">Age</th>
            <th className="p-3 text-left">
              {isOneQBMode ? "Value (1QB)" : "Value (2QB)"}
            </th>
            <th className="p-3 text-left">&nbsp;</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {paginatedPlayers.map((player, index) => {
            return (
              <PlayerTableRow
                key={index}
                player={player}
                toggleExpandRow={toggleExpandRow}
                isExpanded={expandedRow === player.slug}
                isOneQBMode={isOneQBMode}
                checked={selectedPlayers.some((p) => p.slug === player.slug)}
                togglePlayerSelection={() => togglePlayerSelection(player)}
              />
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          aria-label="Previous Page"
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {Math.ceil(players.length / rowsPerPage)}
        </span>
        <button
          aria-label="Next Page"
          onClick={() => handlePageChange("next")}
          disabled={currentPage * rowsPerPage >= players.length}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PlayerTable;
