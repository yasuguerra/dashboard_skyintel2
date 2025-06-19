import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:8000";

// Datos específicos para los gráficos de Google Analytics
export interface GoogleAnalyticsChartData {
  trafficData: Array<{ date: string; users?: number; sessions: number; pageviews?: number }>; // 'month' ahora es 'date' y algunos son opcionales si GA4 no los da siempre
  deviceData: Array<{ name: string; value: number; color: string }>;
  topPages: Array<{ pagePath: string; screenPageViews: number; bounceRate: number }>; // Nombres de campos de GA4
  conversionGoals: Array<{ goal: string; completions: number; rate: number }>; // Puede necesitar ajuste según eventos de GA4
}

// Respuesta completa del endpoint de Google Analytics
export interface GoogleAnalyticsDataResponse {
  chartData: GoogleAnalyticsChartData;
  aiInsight: string;
}

interface UseGoogleAnalyticsDataProps {
  startDate?: string;
  endDate?: string;
}

export const useGoogleAnalyticsData = ({ startDate, endDate }: UseGoogleAnalyticsDataProps = {}) =>
  useQuery<GoogleAnalyticsDataResponse, Error>({
    queryKey: ["ga-overview", startDate, endDate],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const queryString = params.toString();
      const fetchURL = `${API_URL}/ga/overview${queryString ? `?${queryString}` : ''}`;
      
      const res = await fetch(fetchURL);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Failed to load GA data and parse error" }));
        throw new Error(errorData.detail || errorData.message || "Failed to load GA data");
      }
      return res.json();
    },
    // staleTime: 1000 * 60 * 5,
  });

export default useGoogleAnalyticsData;