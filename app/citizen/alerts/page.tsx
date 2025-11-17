"use client"

import { Zap, MapPin, Clock } from "lucide-react"

export default function Alerts() {
  const alerts = [
    {
      id: 1,
      type: "High Crime Activity",
      location: "Downtown District",
      description: "Multiple robberies reported in the area",
      severity: "Critical",
      time: "1 hour ago",
    },
    {
      id: 2,
      type: "Suspicious Activity",
      location: "5th Avenue",
      description: "Unusual activity near your location",
      severity: "Medium",
      time: "3 hours ago",
    },
    {
      id: 3,
      type: "Theft Warning",
      location: "Shopping District",
      description: "Increased theft incidents",
      severity: "High",
      time: "5 hours ago",
    },
  ]

  return (
    <div className="flex-1 bg-background">
      <div className="border-b border-border p-6">
        <h1 className="text-3xl font-bold text-text">Security Alerts</h1>
        <p className="text-text-muted mt-1">Real-time crime alerts for your area</p>
      </div>

      <div className="p-6 max-w-4xl">
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-surface-alt border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <Zap
                    className={`w-6 h-6 flex-shrink-0 mt-1 ${
                      alert.severity === "Critical"
                        ? "text-danger"
                        : alert.severity === "High"
                          ? "text-warning"
                          : "text-accent"
                    }`}
                  />
                  <div>
                    <h3 className="text-lg font-bold text-text">{alert.type}</h3>
                    <p className="text-text-muted flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" />
                      {alert.location}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    alert.severity === "Critical"
                      ? "bg-danger bg-opacity-20 text-danger"
                      : alert.severity === "High"
                        ? "bg-warning bg-opacity-20 text-warning"
                        : "bg-accent bg-opacity-20 text-accent"
                  }`}
                >
                  {alert.severity}
                </span>
              </div>
              <p className="text-text mb-3">{alert.description}</p>
              <p className="text-text-muted text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {alert.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
