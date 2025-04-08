"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
  User,
  FileText,
  Table,
  FileIcon,
  BarChart,
  Layers,
  Lock,
  ChevronDown,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname()
  const [dashboardOpen, setDashboardOpen] = useState(true)
  const [formsOpen, setFormsOpen] = useState(false)
  const [tablesOpen, setTablesOpen] = useState(false)
  const [pagesOpen, setPagesOpen] = useState(false)
  const [chartsOpen, setChartsOpen] = useState(false)
  const [uiElementsOpen, setUiElementsOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
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

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-background">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-4 border-b border-border">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 8H17M7 12H17M7 16H13"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-xl font-bold">TailAdmin</span>
        {isMobile && (
          <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </div>

      {/* Menu */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="px-4 py-2">
          <p className="text-xs font-medium text-muted-foreground">MENU</p>
        </div>

        {/* Dashboard */}
        <div className="px-3">
          <button
            onClick={() => setDashboardOpen(!dashboardOpen)}
            className={cn(
              "flex items-center justify-between w-full px-2 py-2 text-sm font-medium rounded-md",
              pathname === "/" ? "text-primary bg-primary/10" : "hover:bg-muted/50",
            )}
          >
            <div className="flex items-center">
              <LayoutDashboard className="w-5 h-5 mr-2" />
              <span>Dashboard</span>
            </div>
            <ChevronDown className={cn("w-4 h-4 transition-transform", dashboardOpen ? "transform rotate-180" : "")} />
          </button>

          {dashboardOpen && (
            <div className="pl-9 mt-1">
              <Link
                href="/"
                className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-muted/50"
                onClick={() => isMobile && setOpen(false)}
              >
                Ecommerce
              </Link>
            </div>
          )}
        </div>

        {/* Calendar */}
        <Link
          href="/calendar"
          className={cn(
            "flex items-center px-5 py-2 text-sm font-medium",
            pathname === "/calendar" ? "text-primary bg-primary/10" : "hover:bg-muted/50",
          )}
          onClick={() => isMobile && setOpen(false)}
        >
          <Calendar className="w-5 h-5 mr-2" />
          <span>Calendar</span>
        </Link>

        {/* User Profile */}
        <Link
          href="/profile"
          className={cn(
            "flex items-center px-5 py-2 text-sm font-medium",
            pathname === "/profile" ? "text-primary bg-primary/10" : "hover:bg-muted/50",
          )}
          onClick={() => isMobile && setOpen(false)}
        >
          <User className="w-5 h-5 mr-2" />
          <span>User Profile</span>
        </Link>

        {/* Forms */}
        <div className="px-3">
          <button
            onClick={() => setFormsOpen(!formsOpen)}
            className={cn(
              "flex items-center justify-between w-full px-2 py-2 text-sm font-medium rounded-md",
              pathname.startsWith("/forms") ? "text-primary bg-primary/10" : "hover:bg-muted/50",
            )}
          >
            <div className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              <span>Forms</span>
            </div>
            <ChevronDown className={cn("w-4 h-4 transition-transform", formsOpen ? "transform rotate-180" : "")} />
          </button>

          {formsOpen && (
            <div className="pl-9 mt-1">
              <Link
                href="/forms"
                className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-muted/50"
                onClick={() => isMobile && setOpen(false)}
              >
                Form Elements
              </Link>
            </div>
          )}
        </div>

        {/* Tables */}
        <div className="px-3">
          <button
            onClick={() => setTablesOpen(!tablesOpen)}
            className={cn(
              "flex items-center justify-between w-full px-2 py-2 text-sm font-medium rounded-md",
              pathname.startsWith("/tables") ? "text-primary bg-primary/10" : "hover:bg-muted/50",
            )}
          >
            <div className="flex items-center">
              <Table className="w-5 h-5 mr-2" />
              <span>Tables</span>
            </div>
            <ChevronDown className={cn("w-4 h-4 transition-transform", tablesOpen ? "transform rotate-180" : "")} />
          </button>

          {tablesOpen && (
            <div className="pl-9 mt-1">
              <Link
                href="/tables"
                className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-muted/50"
                onClick={() => isMobile && setOpen(false)}
              >
                Basic Tables
              </Link>
            </div>
          )}
        </div>

        {/* Pages */}
        <div className="px-3">
          <button
            onClick={() => setPagesOpen(!pagesOpen)}
            className={cn(
              "flex items-center justify-between w-full px-2 py-2 text-sm font-medium rounded-md",
              pathname.startsWith("/pages") ? "text-primary bg-primary/10" : "hover:bg-muted/50",
            )}
          >
            <div className="flex items-center">
              <FileIcon className="w-5 h-5 mr-2" />
              <span>Pages</span>
            </div>
            <ChevronDown className={cn("w-4 h-4 transition-transform", pagesOpen ? "transform rotate-180" : "")} />
          </button>
        </div>

        <div className="px-4 py-2">
          <p className="text-xs font-medium text-muted-foreground">OTHERS</p>
        </div>

        {/* Charts */}
        <div className="px-3">
          <button
            onClick={() => setChartsOpen(!chartsOpen)}
            className={cn(
              "flex items-center justify-between w-full px-2 py-2 text-sm font-medium rounded-md",
              pathname.startsWith("/charts") ? "text-primary bg-primary/10" : "hover:bg-muted/50",
            )}
          >
            <div className="flex items-center">
              <BarChart className="w-5 h-5 mr-2" />
              <span>Charts</span>
            </div>
            <ChevronDown className={cn("w-4 h-4 transition-transform", chartsOpen ? "transform rotate-180" : "")} />
          </button>
        </div>

        {/* UI Elements */}
        <div className="px-3">
          <button
            onClick={() => setUiElementsOpen(!uiElementsOpen)}
            className={cn(
              "flex items-center justify-between w-full px-2 py-2 text-sm font-medium rounded-md",
              pathname.startsWith("/ui") ? "text-primary bg-primary/10" : "hover:bg-muted/50",
            )}
          >
            <div className="flex items-center">
              <Layers className="w-5 h-5 mr-2" />
              <span>UI Elements</span>
            </div>
            <ChevronDown className={cn("w-4 h-4 transition-transform", uiElementsOpen ? "transform rotate-180" : "")} />
          </button>
        </div>

        {/* Authentication */}
        <div className="px-3">
          <button
            onClick={() => setAuthOpen(!authOpen)}
            className={cn(
              "flex items-center justify-between w-full px-2 py-2 text-sm font-medium rounded-md",
              pathname.startsWith("/auth") ? "text-primary bg-primary/10" : "hover:bg-muted/50",
            )}
          >
            <div className="flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              <span>Authentication</span>
            </div>
            <ChevronDown className={cn("w-4 h-4 transition-transform", authOpen ? "transform rotate-180" : "")} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-800 text-white">N</div>
          <div className="flex-1">
            <p className="text-sm font-medium">#1 Tailwind CSS Dashboard</p>
            <p className="text-xs text-muted-foreground">Leading Tailwind CSS Admin Template</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Sidebar (Sheet/Drawer) */}
      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="p-0 w-[280px]">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      ) : (
        /* Desktop Sidebar */
        <aside
          className={cn(
            "hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-[80] bg-background border-r border-border transition-all duration-300 ease-in-out",
            open ? "md:translate-x-0" : "md:-translate-x-full lg:translate-x-0",
          )}
        >
          <SidebarContent />
        </aside>
      )}
    </>
  )
}
