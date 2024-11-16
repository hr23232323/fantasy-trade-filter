"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import FilterForm from "./components/FilterForm";
import PlayerTable from "./components/PlayerTable";
import SortOptions from "./components/SortOptions";
import { Player } from "./types/Player";

export const Home = () => {
  const [allPlayers, setAllPlayers] = useState<Player[]>([]); // Full dataset
  const [players, setPlayers] = useState<Player[]>([]);
  const [position, setPosition] = useState<string[]>([]); // Now an array of strings
  const [minAge, setMinAge] = useState<number>(18);
  const [maxAge, setMaxAge] = useState<number>(42);
  const [sortField, setSortField] = useState<string>("age");
  const [sortOrder, setSortOrder] = useState<string>("desc");

  // Fetch all players once when the app loads
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        console.log("Fetching all players...");
        const response = await axios.get<Player[]>("/api/all-players");
        setAllPlayers(response.data);
        setPlayers(response.data); // Initially show all players
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  // Apply filters and sorting when any state changes
  useEffect(() => {
    const filtered = allPlayers
      .filter(
        (player) =>
          (position.length === 0 || position.includes(player.position)) &&
          player.age >= minAge &&
          player.age <= maxAge
      )
      .sort((a, b) => {
        if (sortField === "age") {
          return sortOrder === "asc" ? a.age - b.age : b.age - a.age;
        } else if (sortField === "oneQBValues.value") {
          return sortOrder === "asc"
            ? a.oneQBValues.value - b.oneQBValues.value
            : b.oneQBValues.value - a.oneQBValues.value;
        } else {
          return sortOrder === "asc"
            ? a.superflexValues.value - b.superflexValues.value
            : b.superflexValues.value - a.superflexValues.value;
        }
      });

    setPlayers(filtered);
  }, [position, minAge, maxAge, sortField, sortOrder, allPlayers]); // Dependencies

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

      <PlayerTable players={players} />
    </div>
  );
};

export default Home;
