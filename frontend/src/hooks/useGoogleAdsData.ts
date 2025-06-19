import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:8000";

export interface GoogleAdsData {
  campaignPerformance: Array<{ campaign: string; spend: number; clicks: number; conversions: number; ctr: number; cpc: number; roas: number }>;
  dailySpend: Array<{ date: string; spend: number; clicks: number; conversions: number }>;
  keywordPerformance: Array<{ keyword: string; impressions: number; clicks: number; ctr: number; cpc: number; quality: number }>;
  devicePerformance: Array<{ name: string; spend: number; conversions: number; color: string }>;
}

export const useGoogleAdsData = () =>
  useQuery<GoogleAdsData>([
    "ads-overview",
  ], async () => {
    const res = await fetch(`${API_URL}/ads/overview`);
    if (!res.ok) throw new Error("Failed to load Ads data");
    return res.json();
  });

export default useGoogleAdsData;