"use client"

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp, Zap } from "lucide-react"

export default function Predictions() {
  const riskData = [
    { hour: "12 AM", risk: 35, confidence: 82 },
    { hour: "1 AM", risk: 28, confidence: 79 },
    { hour: "2 AM", risk: 22, confidence: 75 },
    { hour: "3 AM", risk: 18, confidence: 72 },
    { hour: "4 AM", risk: 25, confidence: 78 },
    { hour: "5 AM", risk: 32, confidence: 81 },
    { hour: "6 AM", risk: 42, confidence: 85 },
    { hour: "7 AM", risk: 35, confidence: 80 },
    { hour: "8 AM", risk: 48, confidence: 87 },
    { hour: "9 AM", risk: 58, confidence: 89 },
    { hour: "10 AM", risk: 62, confidence: 88 },
    { hour: "11 AM", risk: 68, confidence: 90 },
  ]

  const predictions = [
    {
      id: 1,
      area: "Sanganer",
      type: "Theft",
      riskLevel: "High",
      confidence: 87,
      predictedTime: "8 PM - 10 PM",
      recommendation: "Increase patrol units by 2",
    },
    {
      id: 2,
      area: "Jhotwara",
      type: "Vandalism",
      riskLevel: "Medium",
      confidence: 78,
      predictedTime: "10 PM - 12 AM",
      recommendation: "Deploy surveillance team",
    },
    {
      id: 3,
      area: "Vaishali Nagar",
      type: "Robbery",
      riskLevel: "High",
      confidence: 82,
      predictedTime: "9 PM - 11 PM",
      recommendation: "Position officers strategically",
    },
  ]

  return (
    <div className="flex-1 bg-background">
      <div className="border-b border-border p-6">
        <h1 className="text-3xl font-bold text-text">ML Predictions</h1>
        <p className="text-text-muted mt-1">AI-powered crime prediction and prevention recommendations</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Risk Timeline */}
        <div className="bg-surface-alt border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-text mb-4">24-Hour Risk Prediction</h2>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={riskData}>
              <defs>
                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff3d00" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ff3d00" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3142" />
              <XAxis dataKey="hour" stroke="#5a5f6f" />
              <YAxis stroke="#5a5f6f" label={{ value: "Risk Level (%)", angle: -90, position: "insideLeft" }} />
              <Tooltip contentStyle={{ backgroundColor: "#151928", border: "1px solid #2a3142" }} />
              <Area type="monotone" dataKey="risk" stroke="#ff3d00" fillOpacity={1} fill="url(#colorRisk)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Predictions */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-text">Predicted High-Risk Events</h2>
          {predictions.map((pred) => (
            <div key={pred.id} className="bg-surface-alt border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-text">{pred.area}</h3>
                  <p className="text-text-muted flex items-center gap-2 mt-1">
                    <Zap className="w-4 h-4" />
                    {pred.type} predicted
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    pred.riskLevel === "High"
                      ? "bg-danger bg-opacity-20 text-danger"
                      : "bg-warning bg-opacity-20 text-warning"
                  }`}
                >
                  {pred.riskLevel} Risk
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4 p-4 bg-surface rounded-lg">
                <div>
                  <p className="text-text-muted text-xs">Predicted Time</p>
                  <p className="text-text font-semibold">{pred.predictedTime}</p>
                </div>
                <div>
                  <p className="text-text-muted text-xs">ML Confidence</p>
                  <p className="text-accent font-semibold flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {pred.confidence}%
                  </p>
                </div>
                <div>
                  <p className="text-text-muted text-xs">Recommendation</p>
                  <p className="text-text font-semibold">{pred.recommendation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
