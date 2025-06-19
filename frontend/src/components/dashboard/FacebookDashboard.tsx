import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FacebookIcon } from 'lucide-react'; // Assuming you have lucide-react for icons
// Import chart components as needed, e.g., from recharts or similar
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define interfaces for the data structures expected from the API
interface EngagementData {
  date: string;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
}

interface AudienceInsight {
  age: string;
  percentage: number;
  color: string;
}

interface TopPost {
  type: string;
  content: string;
  reach: number;
  engagement: number;
  engagementRate: number;
}

interface ContentType {
  name: string;
  posts: number;
  engagement: number;
  color: string;
}

interface FacebookChartData {
  engagementData: EngagementData[];
  audienceInsights: AudienceInsight[];
  topPosts: TopPost[];
  contentTypes: ContentType[];
}

interface FacebookDataResponse {
  chartData: FacebookChartData;
  aiInsight: string;
}

const FacebookDashboard: React.FC = () => {
  const [data, setData] = useState<FacebookDataResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>(''); // Example: '2023-01-01'
  const [endDate, setEndDate] = useState<string>('');   // Example: '2023-01-31'

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Adjust the API endpoint URL as needed
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        // Include startDate and endDate as query parameters if they are set
        const queryParams = new URLSearchParams();
        if (startDate) queryParams.append('startDate', startDate);
        if (endDate) queryParams.append('endDate', endDate);
        
        const response = await fetch(`${apiUrl}/facebook/overview?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const result: FacebookDataResponse = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]); // Refetch data when startDate or endDate changes

  if (loading) {
    return <div>Loading Facebook data...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!data) {
    return <div>No Facebook data available.</div>;
  }

  const { chartData, aiInsight } = data;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="col-span-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Facebook Overview</CardTitle>
          <FacebookIcon className="h-6 w-6 text-blue-600" />
        </CardHeader>
        <CardContent>
          {/* TODO: Add date range pickers here for startDate and endDate */}
          {/* Example: <DateRangePicker onRangeChange={(start, end) => { setStartDate(start); setEndDate(end); }} /> */}
        </CardContent>
      </Card>

      {/* Example Card for Engagement Data */}
      <Card className="col-span-full lg:col-span-2">
        <CardHeader>
          <CardTitle>Engagement Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {/* Placeholder for Engagement Chart */}
          {/* <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData.engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="likes" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="comments" stroke="#82ca9d" />
              <Line type="monotone" dataKey="shares" stroke="#ffc658" />
              <Line type="monotone" dataKey="reach" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer> */}
          <p className="text-center text-gray-500">Engagement chart placeholder</p>
        </CardContent>
      </Card>

      {/* Example Card for Audience Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Audience Insights</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Placeholder for Audience Insights Chart (e.g., Pie Chart) */}
          <ul className="space-y-2">
            {chartData.audienceInsights.map((audience, index) => (
              <li key={index} className="flex items-center justify-between">
                <span className="flex items-center">
                  <span className="inline-block w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: audience.color }}></span>
                  {audience.age}
                </span>
                <span>{audience.percentage}%</span>
              </li>
            ))}
          </ul>
           <p className="text-center text-gray-500 mt-4">Audience chart placeholder</p>
        </CardContent>
      </Card>

      {/* Example Card for Content Types */}
      <Card>
        <CardHeader>
          <CardTitle>Content Types</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Placeholder for Content Types Chart (e.g., Bar Chart or Pie Chart) */}
          <ul className="space-y-2">
            {chartData.contentTypes.map((content, index) => (
              <li key={index} className="flex items-center justify-between">
                 <span className="flex items-center">
                  <span className="inline-block w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: content.color }}></span>
                  {content.name} ({content.posts} posts)
                </span>
                <span>{content.engagement} engagement</span>
              </li>
            ))}
          </ul>
          <p className="text-center text-gray-500 mt-4">Content types chart placeholder</p>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Top Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chartData.topPosts.map((post, index) => (
              <div key={index} className="p-2 border rounded-md">
                <p className="font-semibold">{post.type}</p>
                <p className="text-sm text-gray-600 truncate" title={post.content}>{post.content}</p>
                <div className="flex justify-between text-xs mt-1">
                  <span>Reach: {post.reach}</span>
                  <span>Engagement: {post.engagement}</span>
                  <span>Rate: {post.engagementRate.toFixed(2)}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>AI Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{aiInsight}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacebookDashboard;
