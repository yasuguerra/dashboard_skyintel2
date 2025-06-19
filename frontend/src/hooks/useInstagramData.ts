import { useQuery, UseQueryResult } from "@tanstack/react-query";

const API_URL = "http://localhost:8000";

/** Ajusta los campos al JSON real que devuelve tu backend */
export interface InstagramData {
  growthData: Array<{ week: string; followers: number; posts: number; engagement: number }>;
  contentPerformance: Array<{ type: string; posts: number; avgLikes: number; avgComments: number; avgViews: number }>;
  hashtagPerformance: Array<{ hashtag: string; reach: number; impressions: number }>;
  audienceActivity: Array<{ hour: string; activity: number }>;
  storyMetrics: Array<{ name: string; value: number; color: string }>;
}

/** Hook tipado: devuelve UseQueryResult<InstagramData, Error> */
export default function useInstagramData(): UseQueryResult<InstagramData, Error> {
  return useQuery<InstagramData, Error>({
    queryKey: ["instagram-overview"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/instagram/overview`);
      if (!res.ok) throw new Error("Failed to load Instagram data");
      return res.json();
    },
    refetchInterval: 60 * 1000, // opcional
  });
}
