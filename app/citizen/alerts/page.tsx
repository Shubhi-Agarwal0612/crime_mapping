// app/citizen/alerts/page.tsx

"use client";

import { Zap, MapPin, Clock } from "lucide-react";
import { useState, useEffect } from 'react';
import { getCrimePrediction } from '@/lib/crimeApi'; 

//geolocation function
function getCurrentLocation(): Promise<{ latitude: number, longitude: number }> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by your browser."));
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => {
                // Handle permission denied (error.code = 1) or position unavailable
                reject(new Error(`Geolocation error: ${error.message}`));
            }
        );
    });
}

interface AlertItem {
  id: number;
  type: string;
  location: string;
  description: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  time: string;
}


// 2. Main Component (renamed to AlertsPage for Next.js App Router convention)
export default function AlertsPage() {
  const [dynamicAlerts, setDynamicAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 3. API Call Logic
useEffect(() => {
        async function fetchDynamicRiskData() {
            setLoading(true);
            try {
                const { latitude, longitude } = await getCurrentLocation();

                const dynamicInput = {
                    state: "Rajasthan",      
                    district: "Jaipur",      
                    year: new Date().getFullYear(),
                    latitude: latitude,
                    longitude: longitude
                };
                
                // 3. Call Prediction API with Dynamic Coordinates
                const result = await getCrimePrediction(dynamicInput);
                const riskLevel = result['Predicted Risk Level'];
                
                // 4. Create Alert Item
                const newAlert: AlertItem = {
                    id: 100,
                    type: `ML Risk Assessment: ${riskLevel}`,
                    location: `${dynamicInput.district}, ${dynamicInput.state}`, // Show the dynamic location
                    description: `Predicted by the model to be a ${riskLevel} area at your current coordinates.`,
                    severity: 
                        riskLevel === 'High Risk' ? 'Critical' : 
                        riskLevel === 'Moderate Risk' ? 'High' : 
                        'Low',
                    time: new Date().toLocaleTimeString(),
                };

                setDynamicAlerts([newAlert]);
                
            } catch (err) {
                // Handle geolocation errors (like permission denied) or API errors
                setError("Could not get location or prediction: " + (err as Error).message);
            } finally {
                setLoading(false);
            }
        }

        fetchDynamicRiskData();
    }, []);

  // --- RENDERING LOGIC ---

  if (loading) {
    return (
      <div className="p-6 text-lg text-text-muted">
        <p>Analyzing area risk... Please wait.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-lg text-danger">
        🚨 Error: {error}
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background">
      <div className="border-b border-border p-6">
        <h1 className="text-3xl font-bold text-text">Security Alerts</h1>
        <p className="text-text-muted mt-1">Real-time crime alerts for your area</p>
      </div>

      <div className="p-6 max-w-4xl">
        <div className="space-y-4">
          {/* Use the dynamicAlerts state for mapping */}
          {dynamicAlerts.map((alert) => (
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
  );
}