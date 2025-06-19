import { useQuery, UseQueryResult } from "@tanstack/react-query";

const API_URL = "http://localhost:8000";

/** Ajusta los campos al JSON real que devuelve tu backend */
export interface GoogleAdsData {
  campaignPerformance: Array<{
    campaign: string;
    spend: number;
    clicks: number;
    conversions: number;
    ctr: number;
    cpc: number;
    roas: number;
  }>;
  dailySpend: Array<{
    date: string;
    spend: number;
    clicks: number;
    conversions: number;
  }>;
  keywordPerformance: Array<{
    keyword: string;
    impressions: number;
    clicks: number;
    ctr: number;
    cpc: number;
    quality: number;
  }>;
  devicePerformance: Array<{
    name: string;
    spend: number;
    conversions: number;
    color: string;
  }>;
}

/** Hook tipado: devuelve UseQueryResult<GoogleAdsData, Error> */
export default function useGoogleAdsData(): UseQueryResult<GoogleAdsData, Error> {
  return useQuery<GoogleAdsData, Error>({
    queryKey: ["googleAds-overview"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/ads/overview`);
      if (!res.ok) throw new Error("Failed to load Ads data");
      return res.json();
    },
    refetchInterval: 60 * 1000, // opcional: refresco cada 60 s
  });
}
