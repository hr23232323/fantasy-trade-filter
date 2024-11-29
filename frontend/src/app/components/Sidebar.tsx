"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTimes, FaBars } from "react-icons/fa"; // Import icons

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 w-64`}
      >
        <nav className="mt-24 space-y-2">
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
            <li>
              <Link
                href="/faq"
                className={`block p-4 hover:bg-gray-500 ${
                  isActive("/faq") ? "bg-gray-700" : ""
                }`}
              >
                🤔 FAQ
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Top-Left Toggle Button */}
      <button
        aria-label="Open/Close Sidebar"
        className="fixed top-4 left-4 p-4 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-md z-50 hover:shadow-md"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
      </button>
    </>
  );
};

export default Sidebar;
