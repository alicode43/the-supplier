"use client";

import { useState } from "react";
import AdminNavbar from "@/components/dashboard/AdminNavbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { AdminContextProvider } from "@/context/AdminContex";

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  return (
    <AdminContextProvider>
      <div className="min-h-screen bg-slate-100">
        <AdminNavbar onMenuClick={() => setMobileOpen(true)} />
        <div className="flex">
          <Sidebar 
            mobileOpen={mobileOpen} 
            setMobileOpen={setMobileOpen} 
          />
          <main className="flex-1 overflow-auto min-h-[calc(100vh-64px)]">
            {children}
          </main>
        </div>
      </div>
    </AdminContextProvider>
  );
}