"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import {
  LayoutDashboard,
  Users,
  FileText,
  UserCog,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";

export default function Sidebar({ mobileOpen, setMobileOpen, activeComponent, setActiveComponent }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      id: "dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      name: "Leads Management",
      id: "leads",
      icon: <FileText className="w-5 h-5" />
    },
    {
      name: "Offer Management",
      id: "offers",
      icon: <FileText className="w-5 h-5" />
    },
    {
      name: "User Management",
      id: "users",
      icon: <Users className="w-5 h-5" />
    },
    { divider: true },
    {
      name: "Settings",
      id: "settings",
      icon: <Settings className="w-5 h-5" />
    },
  ];

  const isActive = (id) => {
    return activeComponent === id;
  };

  const handleItemClick = (id) => {
    setActiveComponent(id);
    if (window.innerWidth < 768) {
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    // Remove cookies or tokens
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    // Redirect to login
    router.push("/signin");
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setMobileOpen(false)}
        />
      )}
    
      {/* Sidebar */}
      <div 
        className={`h-screen bg-white shadow-lg z-30 transition-all duration-300 ease-in-out
                   ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                   ${collapsed ? "md:w-20" : "md:w-64"}
                   fixed md:relative`}
      >
        {/* Toggle button (visible only on desktop) */}
        <div className="hidden md:flex justify-end px-4 py-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            {collapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col justify-start items-start gap-1 p-2">
          {menuItems.map((item, index) => {
            if (item.divider) {
              return (
                <div 
                  key={`divider-${index}`} 
                  className="w-full h-0.5 my-2 bg-zinc-200"
                />
              );
            }
            
            return (
              <div key={item.name} className={`${collapsed ? "w-full" : "w-full"} px-2.5 flex flex-col justify-start items-start`}>
                <button 
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full px-3 py-3 rounded-[10px] flex items-center gap-4
                            ${isActive(item.id) 
                              ? "bg-blue-500/20 text-blue-500" 
                              : "hover:bg-gray-100 text-neutral-800"}`}
                >
                  <div className={`text-center text-xl ${isActive(item.id) ? "text-blue-500" : "text-neutral-800"}`}>
                    {item.icon}
                  </div>
                  {!collapsed && (
                    <div className={`text-sm font-semibold tracking-tight 
                                   ${isActive(item.id) ? "text-blue-500" : "text-neutral-800"}`}>
                      {item.name}
                    </div>
                  )}
                </button>
              </div>
            );
          })}
          
          {/* Logout - separate from navigation links */}
          <div className={`${collapsed ? "w-full" : "w-full"} px-2.5 flex flex-col justify-start items-start`}>
            <button 
              onClick={handleLogout}
              className="w-full px-3 py-3 rounded-[10px] flex items-center gap-4 hover:bg-gray-100 text-neutral-800"
            >
              <div className="text-center text-xl text-neutral-800">
                <LogOut className="w-5 h-5" />
              </div>
              {!collapsed && (
                <div className="text-sm font-semibold tracking-tight text-neutral-800">
                  Logout
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}