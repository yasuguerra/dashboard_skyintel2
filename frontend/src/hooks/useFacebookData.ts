import { useQuery, UseQueryResult } from "@tanstack/react-query";

const API_URL = "http://localhost:8000";

/** Ajusta los tipos a la forma real de tu endpoint */
export interface FacebookData {
  engagementData: Array<{ date: string; reach: number; likes: number; comments: number; shares: number }>;
  audienceInsights: Array<{ age: string; percentage: number; color: string }>;
  topPosts: Array<{ type: string; content: string; reach: number; engagement: number; engagementRate: number }>;
  contentTypes: Array<{ name: string; posts: number; engagement: number; color: string }>;
}

/** Hook: devuelve UseQueryResult<FacebookData, Error> ya tipado */
export default function useFacebookData(): UseQueryResult<FacebookData, Error> {
  return useQuery<FacebookData, Error>({
    queryKey: ["facebook-overview"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/facebook/overview`);
      if (!res.ok) throw new Error("Failed to load Facebook data");
      return res.json();
    },
    refetchInterval: 60 * 1000, // opcional: refresca cada 60 s
  });
}
