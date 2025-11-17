"use client"

import { useState } from "react"
import Link from "next/link"
import { Lock, Shield } from "lucide-react"

export default function Home() {
  const [userType, setUserType] = useState<"citizen" | "police" | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-surface to-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-3 text-balance">Crime Mapping System</h1>
          <p className="text-text-muted text-lg">Real-time crime reporting and predictive analytics platform</p>
        </div>

        {!userType ? (
          // Role Selection
          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => setUserType("citizen")}
              className="group bg-surface-alt border border-border hover:border-primary hover:bg-surface transition-all duration-300 rounded-lg p-8 text-left"
            >
              <Shield className="w-12 h-12 text-accent mb-4 group-hover:text-primary transition-colors" />
              <h2 className="text-2xl font-bold text-text mb-2">Citizen Portal</h2>
              <p className="text-text-muted mb-4">
                Report crimes, view safety statistics, and get risk alerts for your area
              </p>
              <div className="text-primary font-semibold">Enter as Citizen →</div>
            </button>

            <button
              onClick={() => setUserType("police")}
              className="group bg-surface-alt border border-border hover:border-danger hover:bg-surface transition-all duration-300 rounded-lg p-8 text-left"
            >
              <Lock className="w-12 h-12 text-danger mb-4 group-hover:text-danger transition-colors" />
              <h2 className="text-2xl font-bold text-text mb-2">Police Dashboard</h2>
              <p className="text-text-muted mb-4">
                Access crime analytics, predictive insights, and manage reported incidents
              </p>
              <div className="text-danger font-semibold">Enter as Officer →</div>
            </button>
          </div>
        ) : userType === "citizen" ? (
          // Citizen Login
          <div className="max-w-md mx-auto">
            <div className="bg-surface-alt border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold text-text mb-6">Citizen Login</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-text-muted text-sm mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="citizen@example.com"
                    className="w-full bg-surface border border-border rounded-md px-4 py-2 text-text placeholder:text-text-weak focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-text-muted text-sm mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-surface border border-border rounded-md px-4 py-2 text-text placeholder:text-text-weak focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <Link
                href="/citizen/dashboard"
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 rounded-md transition-colors block text-center mb-4"
              >
                Login
              </Link>
              <button
                onClick={() => setUserType(null)}
                className="w-full text-primary hover:text-primary-dark text-center py-2"
              >
                Back
              </button>
            </div>
          </div>
        ) : (
          // Police Login
          <div className="max-w-md mx-auto">
            <div className="bg-surface-alt border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold text-text mb-6">Police Officer Login</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-text-muted text-sm mb-2">Badge Number</label>
                  <input
                    type="text"
                    placeholder="PD-12345"
                    className="w-full bg-surface border border-border rounded-md px-4 py-2 text-text placeholder:text-text-weak focus:outline-none focus:border-danger"
                  />
                </div>
                <div>
                  <label className="block text-text-muted text-sm mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-surface border border-border rounded-md px-4 py-2 text-text placeholder:text-text-weak focus:outline-none focus:border-danger"
                  />
                </div>
              </div>
              <Link
                href="/police/dashboard"
                className="w-full bg-danger hover:bg-opacity-80 text-white font-semibold py-2 rounded-md transition-colors block text-center mb-4"
              >
                Login
              </Link>
              <button
                onClick={() => setUserType(null)}
                className="w-full text-danger hover:text-opacity-80 text-center py-2"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
