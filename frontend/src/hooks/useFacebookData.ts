import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:8000"; // Asegúrate que este sea el puerto correcto de tu backend FastAPI

// Esta interfaz representa los datos específicos para los gráficos
export interface FacebookChartData {
  engagementData: Array<{ date: string; reach: number; likes: number; comments: number; shares: number }>;
  audienceInsights: Array<{ age: string; percentage: number; color: string }>; // Puede seguir siendo dummy si el backend no lo provee aún
  topPosts: Array<{ type: string; content: string; reach: number; engagement: number; engagementRate: number }>;
  contentTypes: Array<{ name: string; posts: number; engagement: number; color: string }>; // Puede seguir siendo dummy
}

// Esta es la nueva interfaz para la respuesta completa del endpoint
export interface FacebookDataResponse {
  chartData: FacebookChartData;
  aiInsight: string;
}

interface UseFacebookDataProps {
  startDate?: string;
  endDate?: string;
}

export const useFacebookData = ({ startDate, endDate }: UseFacebookDataProps = {}) =>
  useQuery<FacebookDataResponse, Error>({
    queryKey: ["facebook-overview", startDate, endDate], // Incluir fechas en la queryKey
    queryFn: async () => {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      
      const queryString = params.toString();
      const fetchURL = `${API_URL}/facebook/overview${queryString ? `?${queryString}` : ''}`;
      
      const res = await fetch(fetchURL);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Failed to load Facebook data and parse error" }));
        throw new Error(errorData.detail || errorData.message || "Failed to load Facebook data");
      }
      return res.json();
    },
    // Opciones adicionales de React Query, como staleTime, cacheTime, etc.
    // Por ejemplo, para evitar refetching demasiado frecuente:
    // staleTime: 1000 * 60 * 5, // 5 minutos
  });

export default useFacebookData;