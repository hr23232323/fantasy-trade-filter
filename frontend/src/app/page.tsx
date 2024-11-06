"use client";

import { useState } from "react";
import axios from "axios";
import FilterForm from "./components/FilterForm";
import PlayerTable from "./components/PlayerTable";
import SortOptions from "./components/SortOptions";
import { Player } from "./types/Player";

export default function Home() {
  const [position, setPosition] = useState<string[]>([]); // Now an array of strings
  const [minAge, setMinAge] = useState<number>(18);
  const [maxAge, setMaxAge] = useState<number>(42);
  const [sortField, setSortField] = useState<string>("age");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [players, setPlayers] = useState<Player[]>([]);

  const handleApply = async () => {
    try {
      console.log("Fetching players...");
      const response = await axios.get<Player[]>("/api/filter-players", {
        params: {
          position: position.length > 0 ? position.join(",") : undefined,
          min_age: minAge,
          max_age: maxAge,
          sort_field: sortField,
          sort_order: sortOrder,
        },
      });
      setPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const handleAgeRangeChange = (newMinAge: number, newMaxAge: number) => {
    setMinAge(newMinAge);
    setMaxAge(newMaxAge);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Fantasy Football Player - Dynasty Trade Finder
      </h1>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <FilterForm
          position={position}
          minAge={minAge}
          maxAge={maxAge}
          onPositionChange={setPosition}
          onAgeRangeChange={handleAgeRangeChange}
        />
        <SortOptions
          sortField={sortField}
          sortOrder={sortOrder}
          onSortFieldChange={setSortField}
          onSortOrderChange={setSortOrder}
        />
      </div>

      <div className="mt-4 flex justify-center w-full">
        <button
          onClick={handleApply}
          className="w-1/2 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Apply
        </button>
      </div>
      <PlayerTable players={players} />
    </div>
  );
}
