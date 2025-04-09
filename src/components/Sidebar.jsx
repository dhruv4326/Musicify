import React from "react";
import { Heart, Home } from "lucide-react";

const Sidebar = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="h-full p-4 md:p-6 flex flex-col text-white space-y-6 md:space-y-8 text-sm md:text-base">
      <h1 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">🎵 Musicify</h1>

      <nav className="flex flex-col gap-3 md:gap-4">
        <button
          onClick={() => setCurrentPage("Home")}
          className={`flex items-center gap-3 px-2 py-1 rounded hover:bg-white/10 transition ${
            currentPage === "Home" ? "text-green-400 font-semibold" : "text-white"
          }`}
        >
          <Home className="w-5 h-5" />
          Home
        </button>

        <button
          onClick={() => setCurrentPage("Favourites")}
          className={`flex items-center gap-3 px-2 py-1 rounded hover:bg-white/10 transition ${
            currentPage === "Favourites" ? "text-green-400 font-semibold" : "text-white"
          }`}
        >
          <Heart className="w-5 h-5" />
          Favourites
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
