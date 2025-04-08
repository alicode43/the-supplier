"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts"

const data = [
  { name: "Jan", total: 150 },
  { name: "Feb", total: 400 },
  { name: "Mar", total: 180 },
  { name: "Apr", total: 280 },
  { name: "May", total: 180 },
  { name: "Jun", total: 180 },
  { name: "Jul", total: 280 },
  { name: "Aug", total: 100 },
  { name: "Sep", total: 200 },
  { name: "Oct", total: 400 },
  { name: "Nov", total: 280 },
  { name: "Dec", total: 100 },
]

export function SalesChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
