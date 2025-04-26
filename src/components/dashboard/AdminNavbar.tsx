"use client";

import { useState } from "react";
import {
  Bell,
  UserCircle,
  ChevronDown,
  Search,
  Globe,
} from "lucide-react";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  // const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement your search logic here
  };

  return (
    <header className="w-full bg-sky-600 border-b border-white/10">
      <div className="flex justify-between items-center px-4 sm:px-14 py-5 h-20">
        {/* Left Section */}
        <a href="" className="md:flex w-56 h-14 hidden items-center space-x-3 rtl:space-x-reverse">
          <h1 className="self-center text-2xl font-semibold whitespace-nowrap text-white">TheSupplier</h1>
        </a>

        {/* Search Bar - replaces mobile search */}
        <div className="relative flex-1 max-w-lg mx-4">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-500" />
              </div>
              <input
                type="search"
                className="w-full h-9 bg-slate-100 rounded-[19px] border-[0.60px] border-neutral-300 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm text-gray-700"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="relative flex items-center gap-5 sm:gap-7">
          {/* Notification Icon */}
          <div className="relative">
            <button className="text-white">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 text-xs bg-rose-500 text-white w-4 h-4 flex items-center justify-center rounded-full font-bold">
                6
              </span>
            </button>
          </div>

          {/* Language (desktop only) */}
          <div className="hidden sm:flex items-center text-white text-sm font-semibold gap-1">
            <Globe size={16} />
            English
          </div>

          {/* Profile Icon */}
          <div className="relative">
            <button className="flex items-center gap-2 text-white">
              <UserCircle size={28} />
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}