import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Interfaces based on the dummy data structure in backend/fastapi_app.py
interface CampaignPerformanceData {
  campaign: string;
  spend: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  roas: number;
}

interface DailySpendData {
  date: string;
  spend: number;
  clicks: number;
  conversions: number;
}

interface KeywordPerformanceData {
  keyword: string;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  quality: number;
}

interface DevicePerformanceData {
  name: string;
  spend: number;
  conversions: number;
  color: string;
}

export interface GoogleAdsChartData {
  campaignPerformance: CampaignPerformanceData[];
  dailySpend: DailySpendData[];
  keywordPerformance: KeywordPerformanceData[];
  devicePerformance: DevicePerformanceData[];
}

export interface GoogleAdsDataResponse {
  chartData: GoogleAdsChartData;
  aiInsight: string;
}

interface UseGoogleAdsDataProps {
  startDate?: string;
  endDate?: string;
}

const fetchGoogleAdsData = async ({ startDate, endDate }: UseGoogleAdsDataProps): Promise<GoogleAdsDataResponse> => {
  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  const queryString = params.toString();
  const fetchURL = `${API_URL}/ads/overview${queryString ? `?${queryString}` : ''}`;

  const res = await fetch(fetchURL);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Failed to load Google Ads data and parse error" }));
    throw new Error(errorData.detail || errorData.message || "Failed to load Google Ads data");
  }
  return res.json();
};

export const useGoogleAdsData = ({ startDate, endDate }: UseGoogleAdsDataProps = {}) => {
  return useQuery<GoogleAdsDataResponse, Error>({
    queryKey: ["google-ads-overview", startDate, endDate],
    queryFn: () => fetchGoogleAdsData({ startDate, endDate }),
    // staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

export default useGoogleAdsData;
