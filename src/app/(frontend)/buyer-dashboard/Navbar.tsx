// import React, { useState } from "react";
import { Bell, UserCircle, ChevronDown, Search, Globe } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full bg-sky-600 border-b border-white/10">
      <div className="flex justify-between items-center px-4 sm:px-14 py-5 h-20">
        {/* Left Section */}

        <a
          href=""
          className="md:flex w-56 h-14  hidden items-center space-x-3 rtl:space-x-reverse"
        >
          <Link
            href="/buyer-dashboard"
            className="md:flex w-56 h-14 hidden items-center space-x-3 rtl:space-x-reverse"
          >
            <h1 className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              TheSuplier
            </h1>
          </Link>
        </a>

        {/* Mobile Search */}
        <div className="sm:hidden flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow text-sm text-gray-600">
          <Search size={16} />
          <span className="text-sm font-['Nunito_Sans']">Search</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex w-/5 mx-auto items-center gap-4">
          {[
            { name: "Dashboard", path: "/buyer-dashboard" },
            { name: "Get a Quote", path: "/buyer-dashboard/get-quote" },
            { name: "Available Leads", path: "/buyer-dashboard/leads" },
            { name: "Profile", path: "/buyer-dashboard/profile" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="px-2.5 py-1 rounded-lg text-white text-sm font-medium font-['Inter'] hover:bg-sky-500 cursor-pointer transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="relative flex items-center gap-5 sm:gap-7">
          {/* Notification Icon */}
          <div className="relative">
            <button
              //   onClick={() => setShowNotifications((prev) => !prev)}
              className="text-white"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 text-xs bg-rose-500 text-white w-4 h-4 flex items-center justify-center rounded-full font-bold">
                6
              </span>
            </button>
            {/* {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg text-black p-4 z-50">
                <h3 className="text-sm font-semibold mb-2">Notifications</h3>
                <ul className="text-sm space-y-2">
                  <li>🔔 New message from Admin</li>
                  <li>⚠️ Profile verification pending</li>
                  <li>📦 New lead available</li>
                </ul>
              </div>
            )} */}
          </div>

          {/* Language (desktop only) */}
          <div className="hidden sm:flex items-center text-white text-sm font-semibold gap-1">
            <Globe size={16} />
            English
          </div>

          {/* Profile Icon */}
          <div className="relative">
            <button
              //   onClick={() => setShowProfile((prev) => !prev)}
              className="flex items-center gap-2 text-white"
            >
              <UserCircle size={28} />
              <ChevronDown size={16} />
            </button>
            {/* {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg text-black p-4 z-50">
                <h3 className="font-bold text-sm mb-1">Moni Roy</h3>
                <p className="text-xs text-gray-500 mb-3">Admin</p>
                <ul className="text-sm space-y-2">
                  <li className="hover:text-sky-600 cursor-pointer">View Profile</li>
                  <li className="hover:text-sky-600 cursor-pointer">Settings</li>
                  <li className="hover:text-sky-600 cursor-pointer">Logout</li>
                </ul>
              </div>
            )} */}
          </div>

          {/* Avatar (mobile) */}
        </div>
      </div>
    </header>
  );
}
