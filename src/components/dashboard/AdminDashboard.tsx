"use client";

import { useState, useEffect } from 'react';
import { 
  Users, FileText, 
  DollarSign, AlertCircle,
  TrendingUp, TrendingDown,
  Search, Bell, ChevronDown
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell
} from 'recharts';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  // Sample data for charts
  const salesData = [
    { month: 'Jan', value: 42000 },
    { month: 'Feb', value: 43500 },
    { month: 'Mar', value: 48000 },
    { month: 'Apr', value: 45000 },
    { month: 'May', value: 50500 },
    { month: 'Jun', value: 55000 },
    { month: 'Jul', value: 52000 },
    { month: 'Aug', value: 48000 },
    { month: 'Sep', value: 47000 },
    { month: 'Oct', value: 54000 },
    { month: 'Nov', value: 57000 },
    { month: 'Dec', value: 60000 },
  ];

  const userTypeData = [
    { name: 'New Customers', value: 34249, color: '#3B82F6' },  // blue
    { name: 'Repeated', value: 1420, color: '#C7D2FE' }       // indigo-200
  ];

  const leadStatusData = [
    { name: '2020', completed: 25, pending: 15 },
    { name: '2021', completed: 45, pending: 20 },
    { name: '2022', completed: 65, pending: 35 },
    { name: '2023', completed: 85, pending: 40 },
    { name: '2024', completed: 75, pending: 30 }
  ];

  // Stat cards data
  const statCards = [
    {
      title: "Total User",
      value: "258",
      change: "+1.8%",
      trend: "increase",
      period: "Since last month",
      icon: <Users className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Active Leads",
      value: "42",
      change: "+5%",
      trend: "increase",
      period: "Since last week",
      icon: <FileText className="w-6 h-6 text-red-400" />
    },
    {
      title: "Pending Offers",
      value: "18",
      change: "-3%",
      trend: "decrease",
      period: "Since yesterday",
      icon: <AlertCircle className="w-6 h-6 text-amber-300" />
    },
    {
      title: "Revenue",
      value: "₹3,25,000",
      change: "+5%",
      trend: "increase",
      period: "Since last month",
      icon: <DollarSign className="w-6 h-6 text-green-400" />
    }
  ];

  return (
    <div className="w-full pb-2.5 bg-slate-100 flex flex-col gap-2.5 min-h-screen">
      {/* Dashboard content area */}
      <div className="px-5 py-2.5 flex flex-col gap-4">
        {/* Page title */}
        <div className="flex flex-col gap-2.5">
          <h1 className="text-neutral-800 text-3xl font-bold font-['Nunito_Sans']">Dashboard</h1>
          <div className="h-px opacity-60 bg-black/10"></div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, index) => (
            <StatCard key={index} {...card} />
          ))}
        </div>

        {/* Charts */}
        <div className="mt-4">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-neutral-800 text-2xl font-bold">Sales Details</h2>
              <div className="flex items-center">
                <select 
                  className="h-7 px-2 bg-neutral-50 rounded border-[0.6px] border-neutral-300 text-sm"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tickFormatter={(value) => `${value/1000}k`}
                    domain={[30000, 65000]}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#3B82F6', color: 'white', border: 'none' }}
                    itemStyle={{ color: 'white' }}
                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Sales']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    fill="url(#colorValue)" 
                    dot={{ stroke: '#3B82F6', strokeWidth: 2, r: 4, fill: 'white' }}
                    activeDot={{ r: 6, fill: '#3B82F6' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* User Types and Lead Status Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {/* User Types Pie Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-neutral-800 text-xl font-bold mb-4">User Types</h2>
            <div className="flex items-center justify-between">
              <div className="h-64 w-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={0}
                      dataKey="value"
                    >
                      {userTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => value.toLocaleString()} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500"></div>
                    <span className="opacity-80 text-zinc-800 text-base font-semibold">New Customers</span>
                  </div>
                  <span className="text-neutral-800 text-3xl font-bold">34,249</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-indigo-200"></div>
                    <span className="opacity-80 text-zinc-800 text-base font-semibold">Repeated</span>
                  </div>
                  <span className="text-neutral-800 text-3xl font-bold">1,420</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Status Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-neutral-800 text-xl font-bold mb-4">Lead Status</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={leadStatusData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="#14B8A6" 
                    strokeWidth={3}
                    dot={{ stroke: '#14B8A6', strokeWidth: 2, r: 4, fill: 'white' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pending" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ stroke: '#3B82F6', strokeWidth: 2, r: 4, fill: 'white' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, change, trend, period, icon }) {
  return (
    <div className="p-4 bg-white rounded-2xl">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2.5">
            <div className="opacity-70 text-neutral-800 text-base font-semibold">{title}</div>
            <div className="text-neutral-800 text-3xl font-bold tracking-wide">{value}</div>
          </div>
          <div className="opacity-80">
            {icon}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {trend === "increase" ? (
            <TrendingUp className="w-5 h-5 text-teal-500" />
          ) : (
            <TrendingDown className="w-5 h-5 text-rose-500" />
          )}
          <div>
            <span className={`text-base font-semibold ${trend === "increase" ? "text-teal-500" : "text-rose-500"}`}>
              {change}
            </span>{" "}
            <span className="text-zinc-600 text-base font-semibold">{period}</span>
          </div>
        </div>
      </div>
    </div>
  );
}