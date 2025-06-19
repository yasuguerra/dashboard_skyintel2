import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:8000";

export interface InstagramData {
  growthData: Array<{ week: string; followers: number; posts: number; engagement: number }>;
  contentPerformance: Array<{ type: string; posts: number; avgLikes: number; avgComments: number; avgViews: number }>;
  hashtagPerformance: Array<{ hashtag: string; reach: number; impressions: number }>;
  audienceActivity: Array<{ hour: string; activity: number }>;
  storyMetrics: Array<{ name: string; value: number; color: string }>;
}

export const useInstagramData = () =>
  useQuery<InstagramData>([
    "instagram-overview",
  ], async () => {
    const res = await fetch(`${API_URL}/instagram/overview`);
    if (!res.ok) throw new Error("Failed to load Instagram data");
    return res.json();
  });

export default useInstagramData;