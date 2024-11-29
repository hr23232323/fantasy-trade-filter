"use client";

import React, { createContext, useContext, useState } from "react";
import { Player } from "../types/Player";

// Define the shape of the context state
interface AppContextType {
  // TODO - Map if needed to be much faster?
  selectedPlayers: Player[]; // List of player names
  addPlayer: (player: Player) => void; // Add a player
  removePlayer: (player: Player) => void; // Remove a player
  clearPlayers: () => void; // Clear all players
}

// Default context value
const AppContext = createContext<AppContextType | undefined>(undefined);

// AppProvider component to wrap the app
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  // Add a player
  const addPlayer = (player: Player) => {
    setSelectedPlayers((prev) => {
      if (prev.some((p) => p.slug === player.slug)) return prev; // Avoid duplication
      return [...prev, player];
    });
  };

  // Remove a player
  const removePlayer = (player: Player) => {
    setSelectedPlayers((prev) => prev.filter((p) => p.slug !== player.slug));
  };

  // Clear all players
  const clearPlayers = () => {
    setSelectedPlayers([]);
  };

  return (
    <AppContext.Provider
      value={{ selectedPlayers, addPlayer, removePlayer, clearPlayers }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
