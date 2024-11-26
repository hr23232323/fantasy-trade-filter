"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook to get current pathname
import { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname(); // Get the current pathname
  const [isOpen, setIsOpen] = useState(true);

  const isActive = (path: string) => pathname === path; // Check if the link matches the current path

  return (
    <div
      className={`h-full bg-gray-800 text-white fixed ${
        isOpen ? "w-75" : "w-20"
      } transition-all duration-300`}
    >
      <button
        className="p-4 focus:outline-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "←" : "→"}
      </button>
      <nav className="mt-4 space-y-2">
        <ul>
          <li>
            <Link
              href="/"
              className={`block p-4 hover:bg-gray-500 ${
                isActive("/") ? "bg-gray-700" : ""
              }`}
            >
              🏈 Find Players
            </Link>
          </li>
          <li>
            <Link
              href="/create-meme"
              className={`block p-4 hover:bg-gray-500 ${
                isActive("/create-meme") ? "bg-gray-700" : ""
              }`}
            >
              😂 Create Meme
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
