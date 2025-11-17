"use client"

import { useState, useRef, useEffect } from "react" 
import { AlertCircle, MapPin, TrendingUp, Minus, Plus } from "lucide-react" 

const GEOSERVER_WMS_URL = 'http://localhost:8080/geoserver/wms';
const CRIME_POINTS_LAYER = 'crime_map:Crime_Data'; // Replace with your actual workspace:layerName
const RISK_POLYGONS_LAYER = 'crime_map:geoboundaries-ind-adm2_simplified'; // Replace with your actual workspace:layerName

// --- DynamicMap Component (NEW GeoServer Integration) ---
const DynamicMap: React.FC = () => {
  const mapRef = useRef<any>(null); 
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false); // State to track successful map initialization

  useEffect(() => {
    // Check if the environment is valid and the Leaflet global object is available
    if (typeof window === 'undefined' || !(window as any).L) {
      console.warn("Leaflet library (window.L) is not yet available. Waiting...");
      return; 
    }
    
    // Alias the global Leaflet object for easier access
    const L = (window as any).L; 

    // Initialize the map only once
    if (mapContainerRef.current && !mapRef.current) {
      try {
        // 1. Initialize the Map
        const mapInstance = L.map(mapContainerRef.current, {
          zoomControl: false // Disable default Leaflet zoom controls
        }).setView([20.5937, 78.9629], 5); // Default view: Centered on India

        mapRef.current = mapInstance;

        // 2. Add Base Map Tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '© OpenStreetMap contributors',
        }).addTo(mapInstance);

        // 3. Add Risk Polygons WMS Layer
        L.tileLayer.wms(GEOSERVER_WMS_URL, {
          layers: RISK_POLYGONS_LAYER,
          format: 'image/png',
          transparent: true,
          version: '1.1.0',
          tiled: true,
          opacity: 0.6,
          styles: 'polygon_risk_style' // GeoServer style name for polygons
        }).addTo(mapInstance);

        // 4. Add Crime Points WMS Layer
        L.tileLayer.wms(GEOSERVER_WMS_URL, {
          layers: CRIME_POINTS_LAYER,
          format: 'image/png', 
          transparent: true,
          version: '1.1.0',
          tiled: true,
          styles: 'crime_style' // GeoServer style name for points
        }).addTo(mapInstance);

        setMapReady(true);
      } catch (e) {
        console.error("Error initializing Leaflet map:", e);
      }
    }
    
    // Cleanup function: remove the map on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Custom Zoom Handlers (to mimic the old component's UI)
  const handleZoom = (direction: 'in' | 'out') => {
    if (mapRef.current) { // Use mapRef.current directly
      if (direction === 'in') {
        mapRef.current.zoomIn();
      } else {
        mapRef.current.zoomOut();
      }
    }
  }

  return (
    <div className="flex-1 rounded-md relative overflow-hidden">
      {/* Zoom Controls Overlay (Only shown when map is initialized) */}
      {mapReady && (
        <div className="absolute top-4 right-4 z-10 space-y-2">
          <button
            onClick={() => handleZoom('in')}
            className="bg-surface-alt text-text p-2 rounded-full shadow-lg border border-border hover:bg-surface"
            aria-label="Zoom in"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom('out')}
            className="bg-surface-alt text-text p-2 rounded-full shadow-lg border border-border hover:bg-surface"
            aria-label="Zoom out"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      )}
      {/* Map Container Element */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full z-[1]" // z-index is critical for Leaflet to render correctly
        role="application"
        aria-label="Dynamic Safety Map showing crime data and risk areas from GeoServer"
      >
        {!mapReady && (
          // Display a loading/instruction message if the map hasn't initialized
          <div className="absolute inset-0 flex items-center justify-center bg-surface-alt/70 text-text font-semibold p-4 rounded-lg">
            Loading Map... (If loading persists, ensure Leaflet CDN is loaded in your application's main HTML.)
          </div>
        )}
      </div>
    </div>
  )
}
// --- END DynamicMap Component ---


export default function CitizenDashboard() {
  const [selectedArea, setSelectedArea] = useState("Downtown") // This can be used later
  
  // Example data for Citizen metrics
  const stats = [
    { label: "Crimes Reported (7 days)", value: "24", color: "text-danger" },
    { label: "Safety Rating", value: "6.8/10", color: "text-warning" },
    { label: "Response Time", value: "8.5 min", color: "text-success" },
    { label: "Active Alerts", value: "3", color: "text-accent" },
  ]

  // Example data for Recent Reports
  const recentReports = [
    { id: 1, type: "Theft", location: "Main St & 5th Ave", time: "2 hours ago", risk: "High" },
    { id: 2, type: "Vandalism", location: "Central Park", time: "4 hours ago", risk: "Medium" },
    { id: 3, type: "Robbery", location: "Downtown District", time: "6 hours ago", risk: "High" },
  ]

  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <div className="border-b border-border p-6">
        <h1 className="text-3xl font-bold text-text">Safety Dashboard</h1>
        <p className="text-text-muted mt-1">Your neighborhood crime statistics and alerts</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Stats Grid (Top Row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface-alt border border-border rounded-lg p-4">
              <p className="text-sm font-medium text-text-muted">{stat.label}</p>
              <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
          {/* Interactive Map (2/3 width) - Now Dynamic! */}
          <div className="lg:col-span-2 bg-surface-alt border border-border rounded-lg p-6 flex flex-col">
            <h2 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Neighborhood Safety Map
            </h2>
            {/* Component Replacement */}
            <DynamicMap /> 
          </div>

          {/* Recent Reports (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-surface-alt border border-border rounded-lg p-6 h-full flex flex-col">
              <h2 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                Recent Reports
              </h2>
              <div className="space-y-3 overflow-y-auto flex-1 pr-1"> 
                {recentReports.map((report) => (
                  <div key={report.id} className="bg-surface rounded-lg p-3 border border-border">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-text text-sm">{report.type}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          report.risk === "High"
                            ? "bg-danger bg-opacity-20 text-danger"
                            : "bg-warning bg-opacity-20 text-warning"
                        }`}
                      >
                        {report.risk}
                      </span>
                    </div>
                    <p className="text-text-muted text-xs">{report.location}</p>
                    <p className="text-text-weak text-xs mt-1">{report.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}