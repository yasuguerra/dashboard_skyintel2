import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:8000";

// Datos específicos para los gráficos de Instagram
export interface InstagramChartData {
  growthData: Array<{ week: string; followers: number; posts: number; engagement: number }>; // 'followers' puede ser placeholder si el backend no lo da
  contentPerformance: Array<{ type: string; posts: number; avgLikes: number; avgComments: number; avgViews: number }>;
  hashtagPerformance: Array<{ hashtag: string; reach: number; impressions: number }>; // Puede ser placeholder
  audienceActivity: Array<{ hour: string; activity: number }>; // Puede ser placeholder
  storyMetrics: Array<{ name: string; value: number; color: string }>; // Puede ser placeholder
}

// Respuesta completa del endpoint de Instagram
export interface InstagramDataResponse {
  chartData: InstagramChartData;
  aiInsight: string;
}

interface UseInstagramDataProps {
  startDate?: string;
  endDate?: string;
}

export const useInstagramData = ({ startDate, endDate }: UseInstagramDataProps = {}) =>
  useQuery<InstagramDataResponse>(
    ["instagram-overview", startDate, endDate], 
    async () => {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const queryString = params.toString();
      const fetchURL = `${API_URL}/instagram/overview${queryString ? `?${queryString}` : ''}`;
      
      const res = await fetch(fetchURL);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Failed to load Instagram data and parse error" }));
        throw new Error(errorData.detail || errorData.message || "Failed to load Instagram data");
      }
      return res.json();
    },
    {
      // staleTime: 1000 * 60 * 5, 
    }
  );

export default useInstagramData;