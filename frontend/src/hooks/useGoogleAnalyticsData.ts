import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:8000";

export interface GoogleAnalyticsData {
  trafficData: Array<{ month: string; users: number; sessions: number; pageviews: number }>;
  deviceData: Array<{ name: string; value: number; color: string }>;
  topPages: Array<{ page: string; views: number; bounceRate: number }>;
  conversionGoals: Array<{ goal: string; completions: number; rate: number }>;
}

export const useGoogleAnalyticsData = () =>
  useQuery<GoogleAnalyticsData>([
    "ga-overview",
  ], async () => {
    const res = await fetch(`${API_URL}/ga/overview`);
    if (!res.ok) throw new Error("Failed to load GA data");
    return res.json();
  });

export default useGoogleAnalyticsData;