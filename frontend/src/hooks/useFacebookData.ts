import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:8000";

export interface FacebookData {
  engagementData: Array<{ date: string; reach: number; likes: number; comments: number; shares: number }>;
  audienceInsights: Array<{ age: string; percentage: number; color: string }>;
  topPosts: Array<{ type: string; content: string; reach: number; engagement: number; engagementRate: number }>;
  contentTypes: Array<{ name: string; posts: number; engagement: number; color: string }>;
}

export const useFacebookData = () =>
  useQuery<FacebookData>([
    "facebook-overview",
  ], async () => {
    const res = await fetch(`${API_URL}/facebook/overview`);
    if (!res.ok) throw new Error("Failed to load Facebook data");
    return res.json();
  });

export default useFacebookData;