"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import FilterForm from "./components/FilterForm";
import PlayerTable from "./components/PlayerTable";
import SortOptions from "./components/SortOptions";
import LeagueModeToggle from "./components/LeagueModeToggle";
import { Player } from "./types/Player";

const sortFieldReadable: Record<string, string> = {
  "oneQBValues.value": "Value (1QB)",
  "superflexValues.value": "Value (2QB)",
  age: "Age",
};

const Home = () => {
  const [allPlayers, setAllPlayers] = useState<Player[]>([]); // Full dataset
  const [players, setPlayers] = useState<Player[]>([]);
  const [position, setPosition] = useState<string[]>([]); // Now an array of strings
  const [minAge, setMinAge] = useState<number>(18);
  const [maxAge, setMaxAge] = useState<number>(42);
  const [sortField, setSortField] = useState<string>("oneQBValues.value");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [isOneQBMode, setIsOneQBMode] = useState(true); // Toggle between 1QB and 2QB
  const [resultSummary, setResultSummary] = useState<string>("");

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

  useEffect(() => {
    const updateFilterSummary = () => {
      const positionText =
        position.length > 0 ? position.join(", ") : "all positions";
      const sortText = `${sortFieldReadable[sortField]} in ${
        sortOrder === "asc" ? "ascending" : "descending"
      } order`;
      const summary = `Showing ${players.length} players filtered by ${positionText}, aged between ${minAge} and ${maxAge}, sorted by ${sortText}.`;
      setResultSummary(summary);
    };

    updateFilterSummary();
  }, [position, minAge, maxAge, sortField, sortOrder, players.length]); // Dependencies

  const handleAgeRangeChange = (newMinAge: number, newMaxAge: number) => {
    setMinAge(newMinAge);
    setMaxAge(newMaxAge);
  };

  const toggleQBMode = () => {
    setIsOneQBMode((prev) => {
      if (!prev === true) {
        // Change to 1QB mode
        if (sortField === "superflexValues.value") {
          setSortField("oneQBValues.value");
        }
      } else {
        // Change to 2QB mode
        if (sortField === "oneQBValues.value") {
          setSortField("superflexValues.value");
        }
      }
      return !prev;
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 mt-10">
        🔍 Dynasty Trade Finder
      </h1>
      <p className="text-center text-gray-400 mb-10">
        Find your next big trade target in seconds! Use filters, sort by key
        metrics, and uncover players to build a winning roster. 🚀
      </p>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <FilterForm
          position={position}
          minAge={minAge}
          maxAge={maxAge}
          onPositionChange={setPosition}
          onAgeRangeChange={handleAgeRangeChange}
        />

        <div className="flex flex-col w-full md:w-2/5">
          <SortOptions
            sortField={sortField}
            sortOrder={sortOrder}
            onSortFieldChange={setSortField}
            onSortOrderChange={setSortOrder}
            isOneQBMode={isOneQBMode}
          />
          <LeagueModeToggle
            isOneQBMode={isOneQBMode}
            toggleQBMode={toggleQBMode}
          />
        </div>
      </div>

      <PlayerTable
        players={players}
        resultSummary={resultSummary}
        isOneQBMode={isOneQBMode}
      />
      <footer className="text-center text-gray-500 mt-8">
        Built with ❤️ for Fantasy Football players. 🚀 Good luck on your next
        trade!
      </footer>
    </div>
  );
};

export default Home;
