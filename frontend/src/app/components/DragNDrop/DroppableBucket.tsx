import React from "react";
import { Player } from "@/app/types/Player";
import { useDroppable } from "@dnd-kit/core";
import DraggableItem from "./DraggableItem";

const DroppableBucket: React.FC<{
  id: string;
  players: Player[];
  title: string;
  subtitle?: string;
  isDraggingOver: boolean;
}> = ({ id, players, title, isDraggingOver, subtitle }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 border rounded-xl shadow-md bg-gray-50 transition ${
        isDraggingOver ? "bg-blue-50 border-blue-500" : ""
      }`}
    >
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      {subtitle && <p className="text-xs text-gray-600 mb-4">{subtitle}</p>}
      <div className="space-y-2">
        {players.map((player) => (
          <DraggableItem
            key={player.slug}
            slug={player.slug}
            name={player.playerName}
          />
        ))}
      </div>
    </div>
  );
};

export default DroppableBucket;
