"use client"

import { useState, useRef, useCallback, useEffect } from "react" 
import { MapPin, TrendingUp, AlertTriangle, Clock, Users, Minus, Plus } from "lucide-react" 

// --- InteractiveMapImage Component ---
const InteractiveMapImage = ({ src }: { src: string }) => {
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const mapRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const lastPosition = useRef({ x: 0, y: 0 })

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault()
    setZoom((prevZoom) => {
      const scrollDirection = e.deltaY < 0 ? 1.1 : 1 / 1.1
      const newZoom = prevZoom * scrollDirection
      return Math.max(1, Math.min(5, newZoom)) // Limits zoom between 1x and 5x
    })
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    isDragging.current = true
    lastPosition.current = { x: e.clientX, y: e.clientY }
    mapRef.current?.style.setProperty('cursor', 'grabbing');
  }, [])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
    mapRef.current?.style.setProperty('cursor', 'grab');
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return

    const dx = e.clientX - lastPosition.current.x
    const dy = e.clientY - lastPosition.current.y
    
    setPosition(prevPosition => ({
      x: prevPosition.x + dx,
      y: prevPosition.y + dy,
    }))

    lastPosition.current = { x: e.clientX, y: e.clientY }
  }, [])

  // Keyboard handler for pan and zoom (Accessibility fix)
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const panAmount = 30; // Amount to move on arrow key press
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        setPosition(p => ({ ...p, y: p.y + panAmount }));
        break;
      case 'ArrowDown':
        e.preventDefault();
        setPosition(p => ({ ...p, y: p.y - panAmount }));
        break;
      case 'ArrowLeft':
        e.preventDefault();
        setPosition(p => ({ ...p, x: p.x + panAmount }));
        break;
      case 'ArrowRight':
        e.preventDefault();
        setPosition(p => ({ ...p, x: p.x - panAmount }));
        break;
      case '+': // Zoom in
      case '=': // Zoom in (common plus key on standard layouts)
        e.preventDefault();
        setZoom(z => Math.min(5, z * 1.1));
        break;
      case '-': // Zoom out
        e.preventDefault();
        setZoom(z => Math.max(1, z / 1.1));
        break;
    }
  }, []);

  useEffect(() => {
    mapRef.current?.style.setProperty('cursor', 'grab');
  }, [])


  return (
    <div className="flex-1 bg-surface rounded-md relative overflow-hidden">
      {/* Zoom Controls Overlay */}
      <div className="absolute top-4 right-4 z-10 space-y-2">
        <button
          onClick={() => setZoom(z => Math.min(5, z * 1.2))}
          className="bg-surface-alt text-text p-2 rounded-full shadow-lg border border-border hover:bg-surface"
          aria-label="Zoom in"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom(z => Math.max(1, z / 1.2))}
          className="bg-surface-alt text-text p-2 rounded-full shadow-lg border border-border hover:bg-surface"
          aria-label="Zoom out"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* Map Image Container - Accessibility fix: added tabIndex and role */}
      <div
        ref={mapRef}
        // These two lines fix the accessibility error
        tabIndex={0} 
        role="application"
        className="w-full h-full"
        style={{
          transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
          transformOrigin: 'center center',
          transition: isDragging.current ? 'none' : 'transform 0.1s ease-out',
          userSelect: 'none',
          cursor: 'grab', 
        }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp} 
        onKeyDown={handleKeyDown} // Keyboard interaction for accessibility
      >
        <img
          src="/police-map.png" 
          alt="Police Crime Heatmap (Use mouse or arrow keys to pan, scroll wheel or +/- to zoom)"
          className="w-full h-full object-cover pointer-events-none" 
        />
      </div>
    </div>
  )
}
// --- END InteractiveMapImage Component ---

export default function PoliceDashboard() {
  // Keeping only the necessary data for the metrics
  const metrics = [
    { label: "Total Incidents (7 days)", value: "89", change: "+5.2%", icon: TrendingUp },
    { label: "Active Alerts", value: "12", change: "+3", icon: AlertTriangle },
    { label: "Avg Response Time", value: "6.1 min", change: "-0.4 min", icon: Clock },
    { label: "Officers Deployed", value: "45", change: "N/A", icon: Users },
  ]
  
  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <div className="border-b border-border p-6">
        <h1 className="text-3xl font-bold text-text">Police Dashboard</h1>
        <p className="text-text-muted mt-1">Real-time monitoring and key operational metrics</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Metrics Grid (Top Row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-surface-alt border border-border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-text-muted">{metric.label}</p>
                <metric.icon className="w-5 h-5 text-danger" />
              </div>
              <p className="text-2xl font-bold text-text mt-1">{metric.value}</p>
              <p className="text-xs mt-1 text-success">{metric.change}</p>
            </div>
          ))}
        </div>

        {/* Crime Map Section (Expanded to full width) */}
        <div className="bg-surface-alt border border-border rounded-lg p-6 flex flex-col **h-[calc(100vh-250px)]**">
          <h2 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-danger" />
            Real-time Crime Map (Interactive View)
          </h2>
          {/* The InteractiveMapImage component takes up the remaining space */}
          <InteractiveMapImage src="/police-map.png" /> 
        </div>
      </div>
    </div>
  )
}