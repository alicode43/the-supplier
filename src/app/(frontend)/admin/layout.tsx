"use client";


import React, { useState } from "react";
import AdminNavbar from "@/components/dashboard/AdminNavbar";
import Sidebar from "@/components/dashboard/Sidebar";

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("dashboard");
  
  return (
    <div className="min-h-screen bg-slate-100">
      <AdminNavbar onMenuClick={() => setMobileOpen(true)} />
      <div className="flex">
        <Sidebar 
          mobileOpen={mobileOpen} 
          setMobileOpen={setMobileOpen} 
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        />
        <main className="flex-1 overflow-auto min-h-[calc(100vh-64px)]">
          {/* Pass activeComponent to children */}
          {React.cloneElement(children, { activeComponent })}
        </main>
      </div>
    </div>
  );
}