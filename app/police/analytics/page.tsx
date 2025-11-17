"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { MapPin, Calendar, TrendingDown } from "lucide-react"

export default function Analytics() {
  const areaData = [
    { area: "Sanganer", incidents: 45 },
    { area: "Jhotwara", incidents: 32 },
    { area: "Vaishali Nagar", incidents: 28 },
    { area: "Jawahar Circle", incidents: 25 },
    { area: "Jagatpura", incidents: 15 },
  ]

  const monthlyData = [
    { month: "Jan", incidents: 120, resolved: 95 },
    { month: "Feb", incidents: 115, resolved: 98 },
    { month: "Mar", incidents: 130, resolved: 102 },
    { month: "Apr", incidents: 145, resolved: 115 },
    { month: "May", incidents: 138, resolved: 110 },
    { month: "Jun", incidents: 152, resolved: 120 },
  ]

  const metrics = [
    { label: "Resolution Rate", value: "78.9%", change: "+2.1%", icon: TrendingDown },
    { label: "Avg Response Time", value: "8.2 min", change: "-0.5 min", icon: Calendar },
    { label: "Officer Efficiency", value: "92%", change: "+1.2%", icon: TrendingDown },
  ]

  return (
    <div className="flex-1 bg-background">
      <div className="border-b border-border p-6">
        <h1 className="text-3xl font-bold text-text">Analytics & Reports</h1>
        <p className="text-text-muted mt-1">Detailed crime statistics and performance metrics</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-4">
          {metrics.map((metric, i) => (
            <div key={i} className="bg-surface-alt border border-border rounded-lg p-4">
              <p className="text-text-muted text-sm mb-2">{metric.label}</p>
              <p className="text-2xl font-bold text-accent mb-2">{metric.value}</p>
              <p className="text-success text-xs">{metric.change} from last month</p>
            </div>
          ))}
        </div>

        {/* Area Analysis */}
        <div className="bg-surface-alt border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" />
            Incidents by Area
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={areaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3142" />
              <XAxis dataKey="area" stroke="#5a5f6f" />
              <YAxis stroke="#5a5f6f" />
              <Tooltip contentStyle={{ backgroundColor: "#151928", border: "1px solid #2a3142" }} />
              <Bar dataKey="incidents" fill="#00d9ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trends */}
        <div className="bg-surface-alt border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-text mb-4">Resolution Trends (6 Months)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3142" />
              <XAxis dataKey="month" stroke="#5a5f6f" />
              <YAxis stroke="#5a5f6f" />
              <Tooltip contentStyle={{ backgroundColor: "#151928", border: "1px solid #2a3142" }} />
              <Legend />
              <Line type="monotone" dataKey="incidents" stroke="#ff3d00" strokeWidth={2} />
              <Line type="monotone" dataKey="resolved" stroke="#00c853" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
