"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { useAppContext } from "../../context/AppContext";
import { Player } from "../../types/Player";
import { Buckets } from "../../types/Bucket";
import DroppableBucket from "./DroppableBucket";

// Main Component
interface PlayerBucketsProps {
  handleBucketChange: (buckets: Buckets) => void;
}
const PlayerBuckets: React.FC<PlayerBucketsProps> = ({
  handleBucketChange,
}) => {
  const { selectedPlayers } = useAppContext();

  const initialPlayers = [...selectedPlayers];

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
      <div className="space-4 flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0">
        <DroppableBucket
          id="tradingAway"
          players={buckets.tradingAway}
          title="Trading Away"
          subtitle="Players you're trying to get rid of."
          isDraggingOver={activeBucket === "tradingAway"} // Ensure boolean
        />
        <DroppableBucket
          id="tryingToGet"
          players={buckets.tryingToGet}
          title="Trying to Get"
          subtitle="Players you're trying to get."
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
