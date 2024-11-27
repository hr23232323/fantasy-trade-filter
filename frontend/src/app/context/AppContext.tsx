"use client";

import React, { createContext, useContext, useState } from "react";

// Define the shape of the context state
interface AppContextType {
  selectedPlayers: string[]; // List of player names
  addPlayer: (player: string) => void; // Add a player
  removePlayer: (player: string) => void; // Remove a player
  clearPlayers: () => void; // Clear all players
}

// Default context value
const AppContext = createContext<AppContextType | undefined>(undefined);

// AppProvider component to wrap the app
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  // Add a player
  const addPlayer = (player: string) => {
    setSelectedPlayers((prev) => [...prev, player]);
  };

  // Remove a player
  const removePlayer = (player: string) => {
    setSelectedPlayers((prev) => prev.filter((p) => p !== player));
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
