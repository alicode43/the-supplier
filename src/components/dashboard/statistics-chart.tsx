"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Jan", value: 200 },
  { name: "Feb", value: 220 },
  { name: "Mar", value: 270 },
  { name: "Apr", value: 250 },
  { name: "May", value: 300 },
  { name: "Jun", value: 260 },
  { name: "Jul", value: 300 },
  { name: "Aug", value: 280 },
  { name: "Sep", value: 320 },
  { name: "Oct", value: 280 },
  { name: "Nov", value: 300 },
  { name: "Dec", value: 320 },
]

export function StatisticsChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Value</span>
                        <span className="font-bold text-muted-foreground">{payload[0].value}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            strokeWidth={2}
            activeDot={{
              r: 6,
              style: { fill: "var(--primary)", opacity: 0.25 },
            }}
            style={{
              stroke: "var(--primary)",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
