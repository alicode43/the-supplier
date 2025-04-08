"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
// import { useTheme } from "next-themes"
import {
  LayoutDashboard,
  Calendar,
  User,
  FileText,
  Table,
  FileIcon,
  BarChart,
  // Layers,
  // Lock,
  ChevronDown,
  X,
  Settings,
  LogOut,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

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
    // submenu: [
    //   { title: "Analytics", href: "/dashboard" },
    //   { title: "Ecommerce", href: "/dashboard/ecommerce" },
    // ],
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
    // submenu: [
    //   { title: "Form Elements", href: "/dashboard/forms" },
    //   { title: "Form Layouts", href: "/dashboard/forms/layouts" },
    // ],
  },
  {
    title: "Tables",
    href: "/dashboard/tables",
    icon: Table,
    // submenu: [
    //   { title: "Basic Tables", href: "/dashboard/tables" },
    //   { title: "Data Tables", href: "/dashboard/tables/data" },
    // ],
  },
  {
    title: "Pages",
    href: "/dashboard/pages",
    icon: FileIcon,
    // submenu: [
    //   { title: "Settings", href: "/dashboard/pages/settings" },
    //   { title: "Pricing", href: "/dashboard/pages/pricing" },
    //   { title: "404", href: "/404" },
    // ],
  },
  {
    title: "Charts",
    href: "/dashboard/charts",
    icon: BarChart,
  },
  // {
  //   title: "UI Elements",
  //   href: "/dashboard/ui",
  //   icon: Layers,
  //   submenu: [
  //     { title: "Alerts", href: "/dashboard/ui/alerts" },
  //     { title: "Buttons", href: "/dashboard/ui/buttons" },
  //     { title: "Cards", href: "/dashboard/ui/cards" },
  //   ],
  // },
  // {
  //   title: "Authentication",
  //   href: "/dashboard/auth",
  //   icon: Lock,
  //   submenu: [
  //     { title: "Sign In", href: "/dashboard/auth/signin" },
  //     { title: "Sign Up", href: "/dashboard/auth/signup" },
  //     { title: "Forgot Password", href: "/dashboard/auth/forgot-password" },
  //   ],
  // },
]

export function SidebarDrawer() {
  const pathname = usePathname()
  // const { theme } = useTheme()
  const [open, setOpen] = useState(false)
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    Dashboard: true,
  })

  // Close drawer when route changes (mobile navigation)
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-background">
      {/* Logo and close button */}
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
          <span className="text-xl font-bold">TailAdmin</span>
        </div>
        <SheetClose className="rounded-full p-1.5 hover:bg-muted">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </SheetClose>
      </div>

      {/* User profile */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>MC</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Musharof Chowdhury</p>
            <p className="text-xs text-muted-foreground truncate">randomuser@pimjo.com</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-2">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <div key={item.title} className="py-1">
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      pathname?.startsWith(item.href) || (item.href === "/dashboard" && pathname === "/dashboard")
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted/50",
                    )}
                  >
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5 mr-3" />
                      <span>{item.title}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        openSubmenus[item.title] ? "transform rotate-180" : "",
                      )}
                    />
                  </button>
                  {openSubmenus[item.title] && (
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
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    pathname === item.href ? "bg-primary/10 text-primary" : "hover:bg-muted/50",
                  )}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
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
    </div>
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <span className="sr-only">Open menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[280px] sm:w-[350px] border-r">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  )
}
