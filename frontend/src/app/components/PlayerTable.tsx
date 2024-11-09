import { FC } from "react";
import { Player } from "../types/Player";

interface PlayerTableProps {
  players: Player[];
}

const PlayerTable: FC<PlayerTableProps> = ({ players }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3 text-left">Player</th>
            <th className="p-3 text-left">Position</th>
            <th className="p-3 text-left">Age</th>
            <th className="p-3 text-left">Team</th>
            <th className="p-3 text-left">Value (1QB Leagues)</th>
            <th className="p-3 text-left">Value (2QB Leagues)</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {players.map((player, index) => (
            <tr key={`fallback-key-${index}`} className="border-t">
              <td className="p-3">{player.playerName}</td>
              <td className="p-3">{player.position}</td>
              <td className="p-3">{player.age}</td>
              <td className="p-3">{player.team}</td>
              <td className="p-3">{player.oneQBValues.value}</td>
              <td className="p-3">{player.superflexValues.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerTable;
