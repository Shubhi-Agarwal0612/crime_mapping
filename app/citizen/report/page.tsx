"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Clock, FileText, Send } from "lucide-react"

export default function ReportCrime() {
  const [formData, setFormData] = useState({
    crimeType: "",
    location: "",
    description: "",
    time: "",
  })

  const crimeTypes = ["Theft", "Robbery", "Vandalism", "Assault", "Suspicious Activity", "Other"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Report submitted:", formData)
    // In a real app, this would send data to a server
  }

  return (
    <div className="flex-1 bg-background">
      <div className="border-b border-border p-6">
        <h1 className="text-3xl font-bold text-text">Report a Crime</h1>
        <p className="text-text-muted mt-1">Help us keep the community safe</p>
      </div>

      <div className="p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-surface-alt border border-border rounded-lg p-6 space-y-6">
          {/* Crime Type */}
          <div>
            <label className="block text-text font-semibold mb-2">Crime Type *</label>
            <select
              required
              value={formData.crimeType}
              onChange={(e) => setFormData({ ...formData, crimeType: e.target.value })}
              className="w-full bg-surface border border-border rounded-md px-4 py-2 text-text focus:outline-none focus:border-primary"
            >
              <option value="">Select a crime type...</option>
              {crimeTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-text font-semibold mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location *
            </label>
            <input
              required
              type="text"
              placeholder="Street address or area name"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-surface border border-border rounded-md px-4 py-2 text-text placeholder:text-text-weak focus:outline-none focus:border-primary"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-text font-semibold mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              When did it happen? *
            </label>
            <input
              required
              type="datetime-local"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full bg-surface border border-border rounded-md px-4 py-2 text-text focus:outline-none focus:border-primary"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-text font-semibold mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Description *
            </label>
            <textarea
              required
              placeholder="Provide details about the incident..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={6}
              className="w-full bg-surface border border-border rounded-md px-4 py-2 text-text placeholder:text-text-weak focus:outline-none focus:border-primary resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 rounded-md transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Submit Report
          </button>
        </form>
      </div>
    </div>
  )
}
