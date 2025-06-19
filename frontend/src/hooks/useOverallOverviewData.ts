import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:8000";

// Interfaz para los KPIs individuales en la vista general
export interface KPI {
  title: string;
  value: string;
  period: string;
  // Podrías añadir campos opcionales como 'changePercent', 'trend', etc.
}

// Interfaz para los datos de la vista general (principalmente KPIs)
export interface OverallOverviewChartData {
  kpis: KPI[];
  charts?: Array<any>; // Placeholder si decides añadir mini-gráficos después
}

// Interfaz para la respuesta completa del endpoint de vista general
export interface OverallOverviewDataResponse {
  overviewData: OverallOverviewChartData;
  aiInsight: string;
}

interface UseOverallOverviewDataProps {
  startDate?: string;
  endDate?: string;
}

export const useOverallOverviewData = ({ startDate, endDate }: UseOverallOverviewDataProps = {}) =>
  useQuery<OverallOverviewDataResponse>(
    ["overall-overview", startDate, endDate], 
    async () => {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const queryString = params.toString();
      // Asegúrate que el endpoint coincida con el definido en fastapi_app.py
      const fetchURL = `${API_URL}/api/overview/all${queryString ? `?${queryString}` : ''}`; 
      
      const res = await fetch(fetchURL);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Failed to load overall overview data and parse error" }));
        throw new Error(errorData.detail || errorData.message || "Failed to load overall overview data");
      }
      return res.json();
    },
    {
      // staleTime: 1000 * 60 * 5, 
    }
  );

export default useOverallOverviewData;
