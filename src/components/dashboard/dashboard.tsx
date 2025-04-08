"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, MoreVertical, Package, Users ,BadgePercent} from "lucide-react"
import { SalesChart } from "./sales-chart"
import { StatisticsChart } from "./statistics-chart"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Customers Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customers</p>
                <h3 className="text-3xl font-bold">3,782</h3>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <div className="flex items-center rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                <ArrowUp className="mr-1 h-3 w-3" />
                11.01%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Orders</p>
                <h3 className="text-3xl font-bold">5,359</h3>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <div className="flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
                <ArrowDown className="mr-1 h-3 w-3" />
                9.05%
              </div>
            </div>
          </CardContent>
        </Card>

           {/* Pending Offer */}
           <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BadgePercent className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Offers</p>
                <h3 className="text-3xl font-bold">5,359</h3>
              </div>
            </div>
            <div className="mt-4 flex items-center">
            <div className="flex items-center rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                <ArrowUp className="mr-1 h-3 w-3" />
                3% Since Yesterday
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenu*/}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reveneu</p>
                <h3 className="text-3xl font-bold">54,159</h3>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <div className="flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
                <ArrowDown className="mr-1 h-3 w-3" />
                5% Since Last Month
              </div>
            </div>
          </CardContent>
        </Card>
       
      </div>

      {/* Monthly Sales Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">Monthly Sales</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More</span>
          </Button>
        </CardHeader>
        <CardContent>
          <SalesChart />
        </CardContent>
      </Card>

      {/* Statistics Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base font-medium">Statistics</CardTitle>
            <p className="text-sm text-muted-foreground">Target you&apos;ve set for each month</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 rounded-full">
              Monthly
            </Button>
            <Button variant="ghost" size="sm" className="h-8 rounded-full">
              Quarterly
            </Button>
            <Button variant="ghost" size="sm" className="h-8 rounded-full">
              Annually
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <StatisticsChart />
        </CardContent>
      </Card>
    </div>
  )
}
