"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Map, FileText, TrendingUp, LogOut, AlertCircle, BarChart3 } from "lucide-react"

interface SidebarProps {
  userType: "citizen" | "police"
}

export function Sidebar({ userType }: SidebarProps) {
  const pathname = usePathname()

  const citizenLinks = [
    { href: "/citizen/dashboard", icon: Map, label: "Safety Map" },
    { href: "/citizen/report", icon: FileText, label: "Report Crime" },
    { href: "/citizen/alerts", icon: AlertCircle, label: "My Alerts" },
  ]

  const policeLinks = [
    { href: "/police/dashboard", icon: Map, label: "Crime Map" },
    { href: "/police/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/police/predictions", icon: TrendingUp, label: "Predictions" },
  ]

  const links = userType === "citizen" ? citizenLinks : policeLinks

  return (
    <aside className="w-64 bg-surface-alt border-r border-border min-h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-accent">Crime Map</h1>
        <p className="text-text-muted text-xs mt-1">Advanced Monitoring</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {/* FIX APPLIED HERE: using optional chaining '?.map' */}
        {links?.map((link) => { 
          const Icon = link.icon
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors ${
                isActive
                  ? userType === "citizen"
                    ? "bg-primary bg-opacity-20 text-primary"
                    : "bg-danger bg-opacity-20 text-danger"
                  : "text-text-muted hover:text-text hover:bg-surface"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-md text-text-muted hover:text-text hover:bg-surface transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </aside>
  )
}