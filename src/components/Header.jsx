import React from "react";
import { Menu } from "lucide-react";

const Header = ({ title, onToggleSidebar }) => {
  return (
    <div className="py-4 px-4 md:px-6 bg-gray-800 text-white flex items-center justify-between shadow">
      <div className="flex items-center gap-2">
        {/* App name visible only on mobile */}
        <span className="text-green-400 text-lg font-bold block md:hidden">Rhythmix</span>
        <div className="text-lg md:text-xl font-semibold">{title}</div>
      </div>

      {/* Hamburger on mobile */}
      <button onClick={onToggleSidebar} className="md:hidden">
        <Menu className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default Header;
