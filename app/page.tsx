"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Building2,
  Zap,
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Sample data
const monthlyRevenue = [
  { month: "Jan", revenue: 2400000, target: 2200000 },
  { month: "Feb", revenue: 2800000, target: 2400000 },
  { month: "Mar", revenue: 3200000, target: 2600000 },
  { month: "Apr", revenue: 3600000, target: 2800000 },
  { month: "May", revenue: 4100000, target: 3000000 },
  { month: "Jun", revenue: 4500000, target: 3200000 },
]

const customerGrowth = [
  { month: "Jan", customers: 1250, churn: 45 },
  { month: "Feb", customers: 1420, churn: 38 },
  { month: "Mar", customers: 1680, churn: 42 },
  { month: "Apr", customers: 1950, churn: 35 },
  { month: "May", customers: 2280, churn: 41 },
  { month: "Jun", customers: 2650, churn: 33 },
]

const departmentSpending = [
  { name: "Engineering", value: 1200000, color: "#8B5CF6" },
  { name: "Sales & Marketing", value: 800000, color: "#06B6D4" },
  { name: "Operations", value: 400000, color: "#10B981" },
  { name: "R&D", value: 600000, color: "#F59E0B" },
  { name: "General & Admin", value: 300000, color: "#EF4444" },
]

const keyMetrics = [
  {
    title: "Monthly Recurring Revenue",
    value: "$4.5M",
    change: "+18.2%",
    trend: "up",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  {
    title: "Annual Run Rate",
    value: "$54M",
    change: "+22.1%",
    trend: "up",
    color: "bg-gradient-to-r from-blue-500 to-cyan-500",
  },
  {
    title: "Cash Runway",
    value: "18 months",
    change: "-2 months",
    trend: "down",
    color: "bg-gradient-to-r from-green-500 to-emerald-500",
  },
  {
    title: "Customer Count",
    value: "2,650",
    change: "+16.2%",
    trend: "up",
    color: "bg-gradient-to-r from-orange-500 to-red-500",
  },
]

const topCustomers = [
  { name: "NeuroSoft AI", revenue: 450000, growth: 28 },
  { name: "Quantum Dynamics", revenue: 380000, growth: 15 },
  { name: "CyberMind Corp", revenue: 320000, growth: -5 },
  { name: "AI Innovations Ltd", revenue: 290000, growth: 42 },
  { name: "TechFlow Systems", revenue: 250000, growth: 18 },
]

export default function FinanceDashboard() {
  const [timeRange, setTimeRange] = useState("6m")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SpinTech AI</h1>
                <p className="text-sm text-gray-600">Digital Fidget Spinners for AI Agents</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Series D
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyMetrics.map((metric, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className={`h-2 ${metric.color}`} />
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div
                    className={`flex items-center space-x-1 ${
                      metric.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {metric.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">{metric.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue and Growth Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <span>Revenue vs Target</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" tickFormatter={(value) => `$${value / 1000000}M`} />
                  <Tooltip formatter={(value) => [`$${((value as number) / 1000000).toFixed(1)}M`, ""]} />
                  <Area type="monotone" dataKey="target" stackId="1" stroke="#e5e7eb" fill="#f3f4f6" name="Target" />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stackId="2"
                    stroke="#8B5CF6"
                    fill="url(#colorRevenue)"
                    name="Actual Revenue"
                  />
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span>Customer Growth</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={customerGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="customers"
                    stroke="#06B6D4"
                    strokeWidth={3}
                    dot={{ fill: "#06B6D4", strokeWidth: 2, r: 6 }}
                    name="New Customers"
                  />
                  <Line
                    type="monotone"
                    dataKey="churn"
                    stroke="#EF4444"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                    name="Churn"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Department Spending and Top Customers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-green-500" />
                <span>Department Spending</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentSpending}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {departmentSpending.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${((value as number) / 1000000).toFixed(1)}M`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {departmentSpending.map((dept, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                    <span className="text-sm text-gray-600">{dept.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-orange-500" />
                <span>Top Customers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCustomers.map((customer, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <div className="font-medium text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-600">${(customer.revenue / 1000).toFixed(0)}K ARR</div>
                    </div>
                    <div
                      className={`flex items-center space-x-1 ${
                        customer.growth >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {customer.growth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span className="text-sm font-medium">{customer.growth}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Alerts */}
        <Card className="border-0 shadow-lg border-l-4 border-l-yellow-400">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-yellow-700">
              <Clock className="w-5 h-5" />
              <span>Key Alerts & Action Items</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="font-medium text-yellow-800">Cash Runway Alert</div>
                <div className="text-sm text-yellow-700 mt-1">
                  Runway decreased by 2 months. Consider fundraising timeline.
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-medium text-green-800">Revenue Milestone</div>
                <div className="text-sm text-green-700 mt-1">Exceeded Q2 target by 18%. On track for $60M ARR.</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-800">Customer Success</div>
                <div className="text-sm text-blue-700 mt-1">
                  AI Innovations Ltd showing 42% growth. Expansion opportunity.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
