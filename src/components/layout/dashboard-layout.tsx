"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Sidebar from "./sidebar"
import Header from "./header"
import { cn } from "@/lib/utils"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div
        className={cn(
          "flex flex-col flex-1 transition-all duration-300 ease-in-out",
          !isMobile && sidebarOpen ? "md:ml-64" : "",
          !isMobile && !sidebarOpen ? "md:ml-0 lg:ml-64" : "",
        )}
      >
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
