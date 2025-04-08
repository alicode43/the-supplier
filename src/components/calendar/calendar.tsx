"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // Get previous month's days that appear in the current month view
  const getPreviousMonthDays = (year: number, month: number) => {
    const firstDay = getFirstDayOfMonth(year, month)
    const daysInPreviousMonth = getDaysInMonth(year, month - 1)

    const days = []
    for (let i = 0; i < firstDay; i++) {
      days.push({
        date: new Date(year, month - 1, daysInPreviousMonth - firstDay + i + 1),
        isCurrentMonth: false,
      })
    }

    return days
  }

  // Get current month's days
  const getCurrentMonthDays = (year: number, month: number) => {
    const daysInMonth = getDaysInMonth(year, month)

    const days = []
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      })
    }

    return days
  }

  // Get next month's days that appear in the current month view
  const getNextMonthDays = (year: number, month: number) => {
    const firstDay = getFirstDayOfMonth(year, month)
    const daysInMonth = getDaysInMonth(year, month)
    const totalCells = 42 // 6 rows x 7 columns
    const remainingCells = totalCells - (firstDay + daysInMonth)

    const days = []
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      })
    }

    return days
  }

  // Get all days to display in the calendar
  const getAllDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const previousMonthDays = getPreviousMonthDays(year, month)
    const currentMonthDays = getCurrentMonthDays(year, month)
    const nextMonthDays = getNextMonthDays(year, month)

    return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays]
  }

  // Format date to display month and year
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Sample events data
  const events = [
    {
      id: 1,
      title: "Event Conf.",
      date: new Date(2025, 3, 7), // April 7, 2025
      type: "conference",
      color: "bg-red-500",
    },
    {
      id: 2,
      title: "Meeting",
      date: new Date(2025, 3, 8), // April 8, 2025
      type: "meeting",
      color: "bg-emerald-500",
    },
    {
      id: 3,
      title: "Workshop",
      date: new Date(2025, 3, 9), // April 9, 2025
      type: "workshop",
      color: "bg-blue-500",
    },
  ]

  // Check if a day has events
  const getEventsForDay = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )
  }

  const days = getAllDays()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">{formatMonthYear(currentDate)}</h2>
          <Button variant="ghost" size="sm" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="rounded-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
          <div className="flex rounded-lg border">
            <Button
              variant={view === "month" ? "default" : "ghost"}
              className="rounded-r-none"
              onClick={() => setView("month")}
            >
              month
            </Button>
            <Button
              variant={view === "week" ? "default" : "ghost"}
              className="rounded-none border-x"
              onClick={() => setView("week")}
            >
              week
            </Button>
            <Button
              variant={view === "day" ? "default" : "ghost"}
              className="rounded-l-none"
              onClick={() => setView("day")}
            >
              day
            </Button>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="grid grid-cols-7 border-b">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-3 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-rows-6">
          {days.map((day, index) => {
            const dayEvents = getEventsForDay(day.date)
            const isToday =
              day.date.getDate() === new Date().getDate() &&
              day.date.getMonth() === new Date().getMonth() &&
              day.date.getFullYear() === new Date().getFullYear()

            return (
              <div
                key={index}
                className={cn("min-h-[100px] border-b border-r p-2", !day.isCurrentMonth && "bg-muted/50")}
              >
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full text-sm",
                    isToday && "bg-primary text-primary-foreground",
                    !isToday && "text-muted-foreground",
                  )}
                >
                  {day.date.getDate()}
                </div>
                <div className="mt-2 space-y-1">
                  {dayEvents.map((event) => (
                    <div key={event.id} className={cn("rounded px-2 py-1 text-xs font-medium text-white", event.color)}>
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
