"use client";

import { useAppContext } from "../context/AppContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const FloatingButton: React.FC = () => {
  const { selectedPlayers } = useAppContext();
  const router = useRouter();
  const pathname = usePathname(); // Get the current route
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (selectedPlayers.length > 0 && pathname !== "/create-meme") {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [selectedPlayers, pathname]);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 transition-transform duration-300 ${
        visible ? "animate-fade-in" : "animate-fade-out"
      }`}
    >
      <button
        onClick={() => router.push("/create-meme")}
        className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white text-base font-semibold flex items-center justify-center px-6 py-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
      >
        {/* Main Button Text */}
        <span className="flex flex-col items-center">
          <span className="text-lg">😂 Create Memes</span>
          {/* <span className="text-sm font-normal">
            {selectedPlayers.length} Players Selected
          </span> */}
        </span>
        {/* Fun Badge */}
        <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[8px] leading-[10px] font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-md">
          🎉 {selectedPlayers.length} players
        </div>
      </button>

      {/* Appear and Disappear Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fade-out {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }

        .animate-fade-out {
          animation: fade-out 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FloatingButton;
