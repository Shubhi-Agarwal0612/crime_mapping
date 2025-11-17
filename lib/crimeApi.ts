// lib/crimeApi.ts

// Use your successful deployed URL + the correct endpoint
const RENDER_API_URL = "https://crime-mapping-api.onrender.com/predict"; 

// Define the expected structure for the data you send to the API
interface CrimeData {
  state: string;
  district: string;
  year: number;
  latitude: number;
  longitude: number;
}

// Define the expected structure for the data you receive from the API
interface PredictionResult {
  'District'?: string;
  'Latitude': number;
  'Longitude': number;
  'Predicted Risk Level': 'Safe' | 'No Crime'| 'Low Risk' | 'Moderate Risk' | 'High Risk';
   Probabilities: { [key: string]: number }; 
  'State': string;
  'Year': number; 
}


export async function getCrimePrediction(data: CrimeData): Promise<PredictionResult> {
  // Hardcode the timeout since Render Free Tier can be slow
  const timeoutMs = 30000; 

  try {
    const response = await fetch(RENDER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // CRITICAL HEADER
        'x-api-key': 'supersecret',
      },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(timeoutMs) // Add a timeout signal
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const predictionData: PredictionResult = await response.json();
    return predictionData;

  } catch (error) {
    // Handle network errors, CORS, or timeouts here
    console.error("Error fetching crime prediction:", error);
    // You can throw a generic error to be handled by the component
    throw new Error("Failed to connect to crime prediction service."); 
  }
}