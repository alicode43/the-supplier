"use client"

import type React from "react"

import { useState } from "react"
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
  ChevronRight,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  submenu?: { title: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    submenu: [
      { title: "Analytics", href: "/dashboard" },
      { title: "Ecommerce", href: "/dashboard/ecommerce" },
    ],
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "User Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Forms",
    href: "/dashboard/forms",
    icon: FileText,
    submenu: [
      { title: "Form Elements", href: "/dashboard/forms" },
      { title: "Form Layouts", href: "/dashboard/forms/layouts" },
    ],
  },
  {
    title: "Tables",
    href: "/dashboard/tables",
    icon: Table,
    submenu: [
      { title: "Basic Tables", href: "/dashboard/tables" },
      { title: "Data Tables", href: "/dashboard/tables/data" },
    ],
  },
  {
    title: "Pages",
    href: "/dashboard/pages",
    icon: FileIcon,
    submenu: [
      { title: "Settings", href: "/dashboard/pages/settings" },
      { title: "Pricing", href: "/dashboard/pages/pricing" },
      { title: "404", href: "/404" },
    ],
  },
  {
    title: "Charts",
    href: "/dashboard/charts",
    icon: BarChart,
  },
  {
    title: "UI Elements",
    href: "/dashboard/ui",
    icon: Layers,
    submenu: [
      { title: "Alerts", href: "/dashboard/ui/alerts" },
      { title: "Buttons", href: "/dashboard/ui/buttons" },
      { title: "Cards", href: "/dashboard/ui/cards" },
    ],
  },
  {
    title: "Authentication",
    href: "/dashboard/auth",
    icon: Lock,
    submenu: [
      { title: "Sign In", href: "/dashboard/auth/signin" },
      { title: "Sign Up", href: "/dashboard/auth/signup" },
      { title: "Forgot Password", href: "/dashboard/auth/forgot-password" },
    ],
  },
]

interface DesktopSidebarProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

export function DesktopSidebar({ collapsed, setCollapsed }: DesktopSidebarProps) {
  const pathname = usePathname()
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    Dashboard: true,
  })

  const toggleSubmenu = (title: string) => {
    if (!collapsed) {
      setOpenSubmenus((prev) => ({
        ...prev,
        [title]: !prev[title],
      }))
    }
  }

  return (
    <div
      className={cn(
        "hidden md:flex h-screen flex-col border-r border-border bg-background transition-all duration-300 ease-in-out",
        collapsed ? "w-[70px]" : "w-[280px]",
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        <div className="flex items-center gap-2">
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
          {!collapsed && <span className="text-xl font-bold">The Supplier</span>}
        </div>
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setCollapsed(!collapsed)}>
          <ChevronRight className={cn("h-5 w-5 transition-transform", !collapsed ? "rotate-180" : "")} />
          <span className="sr-only">{collapsed ? "Expand sidebar" : "Collapse sidebar"}</span>
        </Button>
      </div>

      {/* User profile */}
      <div className={cn("p-4 border-b border-border", collapsed && "flex justify-center p-2")}>
        {collapsed ? (
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>MC</AvatarFallback>
          </Avatar>
        ) : (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Faizan</p>
              <p className="text-xs text-muted-foreground truncate">faizan@thesuplier.com</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-2">
        <nav className={cn("px-2 space-y-1", collapsed && "px-1")}>
          {navItems.map((item) => (
            <div key={item.title} className="py-1">
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={cn(
                      "flex items-center justify-between w-full text-sm font-medium rounded-md transition-colors",
                      pathname?.startsWith(item.href) || (item.href === "/dashboard" && pathname === "/dashboard")
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted/50",
                      collapsed ? "px-2 py-2" : "px-3 py-2",
                    )}
                    title={collapsed ? item.title : undefined}
                  >
                    <div className="flex items-center">
                      <item.icon className={cn("w-5 h-5", collapsed ? "mx-auto" : "mr-3")} />
                      {!collapsed && <span>{item.title}</span>}
                    </div>
                    {!collapsed && (
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          openSubmenus[item.title] ? "transform rotate-180" : "",
                        )}
                      />
                    )}
                  </button>
                  {!collapsed && openSubmenus[item.title] && (
                    <div className="mt-1 pl-10 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className={cn(
                            "block px-3 py-2 text-sm rounded-md transition-colors",
                            pathname === subItem.href ? "bg-primary/10 text-primary" : "hover:bg-muted/50",
                          )}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium rounded-md transition-colors",
                    pathname === item.href ? "bg-primary/10 text-primary" : "hover:bg-muted/50",
                    collapsed ? "justify-center px-2 py-2" : "px-3 py-2",
                  )}
                  title={collapsed ? item.title : undefined}
                >
                  <item.icon className={cn("w-5 h-5", collapsed ? "mx-auto" : "mr-3")} />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="flex flex-col space-y-2">
            <Button variant="outline" size="sm" className="justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </Button>
            <Button variant="outline" size="sm" className="justify-start text-destructive hover:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
        </div>
      )}
      {collapsed && (
        <div className="p-2 border-t border-border">
          <div className="flex flex-col items-center space-y-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">Help</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive hover:text-destructive">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
