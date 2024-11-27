"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useAppContext } from "../context/AppContext";
import { Player } from "../types/Player";

export type Buckets = {
  tradingAway: Player[];
  tryingToGet: Player[];
};

// Draggable Item Component
const DraggableItem: React.FC<{ slug: string; name: string }> = ({
  slug,
  name,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: slug,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-3 bg-white rounded-lg shadow-md mb-2  text-sm  cursor-pointer text-gray-600"
    >
      {name}
    </div>
  );
};

// Droppable Bucket Component
const DroppableBucket: React.FC<{
  id: string;
  players: Player[];
  title: string;
  isDraggingOver: boolean;
}> = ({ id, players, title, isDraggingOver }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 border rounded-xl shadow-md bg-gray-50 transition ${
        isDraggingOver ? "bg-blue-50 border-blue-500" : ""
      }`}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-700">{title}</h3>
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

// Main Component
interface PlayerBucketsProps {
  handleBucketChange: (buckets: Buckets) => void;
}
const PlayerBuckets: React.FC<PlayerBucketsProps> = ({
  handleBucketChange,
}) => {
  const { selectedPlayers } = useAppContext();

  // Memoize the initial players to prevent re-calculation on every render
  const initialPlayers = useMemo(
    () => selectedPlayers.map((player) => player),
    [selectedPlayers]
  );
  const [buckets, setBuckets] = useState<Buckets>({
    tradingAway: initialPlayers,
    tryingToGet: [] as Player[],
  });
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);
  const [activeBucket, setActiveBucket] = useState<string | null>(null);

  const handleDragStart = (event: any) => {
    const { active } = event;
    const player = buckets.tradingAway
      .concat(buckets.tryingToGet)
      .find((p) => p.slug === active.id);
    setActivePlayer(player || null);
  };

  const handleDragOver = (event: any) => {
    const { over } = event;
    setActiveBucket(over?.id || null);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) {
      setActivePlayer(null);
      setActiveBucket(null);
      return;
    }

    const sourceBucket = buckets.tradingAway.some((p) => p.slug === active.id)
      ? "tradingAway"
      : "tryingToGet";
    const destinationBucket = over.id;

    // Avoid re-dropping in the same bucket
    if (sourceBucket === destinationBucket) {
      setActivePlayer(null);
      setActiveBucket(null);
      return;
    }

    const movedPlayer = buckets[sourceBucket as keyof typeof buckets].find(
      (p) => p.slug === active.id
    );
    if (movedPlayer) {
      setBuckets({
        ...buckets,
        [sourceBucket]: buckets[sourceBucket as keyof typeof buckets].filter(
          (p) => p.slug !== active.id
        ),
        [destinationBucket]: [
          ...buckets[destinationBucket as keyof typeof buckets],
          movedPlayer,
        ],
      });
    }

    setActivePlayer(null);
    setActiveBucket(null);
  };

  useEffect(() => {
    handleBucketChange(buckets);
  }, [buckets]);

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="m-4 space-y-6">
        <DroppableBucket
          id="tradingAway"
          players={buckets.tradingAway}
          title="Trading Away"
          isDraggingOver={activeBucket === "tradingAway"} // Ensure boolean
        />
        <DroppableBucket
          id="tryingToGet"
          players={buckets.tryingToGet}
          title="Trying to Get"
          isDraggingOver={activeBucket === "tryingToGet"} // Ensure boolean
        />
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activePlayer ? (
          <div className="p-3 bg-white rounded-lg shadow-md text-center text-sm font-semibold cursor-pointer">
            {activePlayer.playerName}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default PlayerBuckets;
