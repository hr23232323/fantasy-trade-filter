import { FC, useState, Fragment } from "react";
import { Player } from "../types/Player";
import {
  FaChevronDown,
  FaChevronUp,
  FaExclamationCircle,
} from "react-icons/fa";

interface PlayerTableProps {
  players: Player[];
  resultSummary: string;
}

const PlayerTable: FC<PlayerTableProps> = ({ players, resultSummary }) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null); // Track expanded rows for details
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;

  const getInjuryStatus = (injuryCode: number) => {
    switch (injuryCode) {
      case 1:
        return { label: "Healthy", color: "text-green-500" };
      case 2:
        return { label: "Questionable", color: "text-yellow-500" };
      case 4:
        return { label: "Out", color: "<text-red-4></text-red-4>00" };
      case 6:
        return { label: "On IR", color: "text-rose-700" };
      default:
        return { label: "Unknown", color: "text-gray-400" };
    }
  };

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

  return (
    <div className="overflow-x-auto mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mt-2">📋 Player List</h2>
      <p className="text-md text-gray-700 bg-gray-100 rounded mt-1 mb-6">
        {resultSummary}
      </p>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-800 text-white sticky top-0">
          <tr>
            <th className="p-3 text-left">Player</th>
            <th className="p-3 text-left">Position</th>
            <th className="p-3 text-left">Age</th>
            <th className="p-3 text-left">Team</th>
            <th className="p-3 text-left">Value (1QB)</th>
            <th className="p-3 text-left">Value (2QB)</th>
            <th className="p-3 text-left"></th> {/* Expand icon */}
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {paginatedPlayers.map((player, index) => {
            const injuryDetails = getInjuryStatus(player.injury.injuryCode);

            return (
              <Fragment key={player.slug}>
                <tr className="border-t hover:bg-gray-50">
                  <td className="p-3 flex items-center">
                    {player.playerName}
                    {player.injury.injuryCode > 1 && (
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
                          {player.injury.injuryArea &&
                            ` (${player.injury.injuryArea})`}
                          <br />
                          <strong>Est. Return:</strong>{" "}
                          {player.injury.injuryReturn || "TBD"}
                        </div>
                      </div>
                    )}
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
                      {expandedRow === player.slug ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </button>
                  </td>
                </tr>

                {expandedRow === player.slug && (
                  <tr>
                    <td colSpan={7} className="bg-gray-50 p-4">
                      <div className="text-sm text-gray-700">
                        <strong>Height:</strong> {player.heightFeet}'
                        {player.heightInches}" | <strong>Weight:</strong>{" "}
                        {player.weight} lbs | <strong>Experience:</strong>{" "}
                        {player.seasonsExperience} seasons
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
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
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
