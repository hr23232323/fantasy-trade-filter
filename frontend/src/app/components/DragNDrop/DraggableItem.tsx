import React, { memo } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Player } from "@/app/types/Player";
import {
  getPositionRowColor,
  positionIcons,
} from "@/app/utils/CustomStyleHelpers";
import { InjuryIndicator } from "../InjuryIndicator";
import RookieBadge from "../RookieBadge";

interface DraggableItemProps {
  player: Player;
}

// Draggable Item Component
const DraggableItem: React.FC<DraggableItemProps> = memo(({ player }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: player.slug,
  });

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    touchAction: "none", // Prevents scrolling conflicts during drag on mobile
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-3 rounded-lg shadow-md mb-2 text-sm cursor-pointer text-gray-600 
        ${getPositionRowColor(player.position)}
        `}
    >
      {positionIcons[player.position] || player.position}
      <span className="ml-2">{player.playerName}</span>
      <InjuryIndicator player={player} />
      <RookieBadge player={player} />
    </div>
  );
});

export default DraggableItem;
