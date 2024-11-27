"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 md:w-60 w-64`}
      >
        <nav className="mt-16 md:mt-4 space-y-2">
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
                😂 Create Memes
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Toggle button for mobile */}
      <button
        className="fixed bottom-4 right-4 p-4 bg-gray-800 text-white rounded-full shadow-md z-50"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        ☰
      </button>
    </>
  );
};

export default Sidebar;
