import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  // PieChart, Pie, Cell, // Descomenta si los usas
} from "recharts";
import { Brain, Loader2, AlertTriangle } from "lucide-react";
import { useInstagramData, InstagramDataResponse } from "@/hooks/useInstagramData";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface InstagramDashboardProps {
  startDate?: string;
  endDate?: string;
}

const InstagramDashboard: React.FC<InstagramDashboardProps> = ({ startDate, endDate }) => {
  const { data: igDataResponse, isLoading, isError, error } = useInstagramData({ startDate, endDate });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
        <p className="ml-2 text-lg">Loading Instagram Data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error Fetching Instagram Data</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : 'An unknown error occurred.'}
        </AlertDescription>
      </Alert>
    );
  }

  if (!igDataResponse) {
    return <p className="text-center mt-4">No Instagram data available for the selected period.</p>;
  }

  const { chartData, aiInsight } = igDataResponse;
  const { growthData, contentPerformance, hashtagPerformance, audienceActivity, storyMetrics } = chartData || {};

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* AI Insights Panel */}
      {aiInsight && (
        <Card className="bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-pink-700">
              <Brain className="h-5 w-5" />
              AI Insights – Instagram
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm md:text-base whitespace-pre-line">{aiInsight}</p>
          </CardContent>
        </Card>
      )}

      {/* Sección de Gráficos */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Gráfico de Crecimiento (Growth Data) */}
        {growthData && growthData.length > 0 && (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Account Growth</CardTitle>
              <CardDescription>Followers, Posts, Engagement per week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis yAxisId="left" dataKey="followers" name="Followers"/>
                  <YAxis yAxisId="right" orientation="right" dataKey="engagement" name="Engagement" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="followers" stroke="#8884d8" name="Followers" />
                  <Line yAxisId="right" type="monotone" dataKey="engagement" stroke="#82ca9d" name="Engagement" />
                  {/* Podrías añadir 'posts' en otro eje o como barras si es necesario */}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Gráfico de Rendimiento de Contenido */}
        {contentPerformance && contentPerformance.length > 0 && (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription>Average likes, comments, views by content type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={contentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avgLikes" fill="#ff7300" name="Avg. Likes" />
                  <Bar dataKey="avgComments" fill="#387908" name="Avg. Comments" />
                  <Bar dataKey="avgViews" fill="#4682B4" name="Avg. Views (Reels/Video)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Placeholder para otros gráficos (hashtagPerformance, audienceActivity, storyMetrics) */}
      {/* 
      <Card className="mt-6">
        <CardHeader><CardTitle>Hashtag Performance</CardTitle></CardHeader>
        <CardContent> // Implementar visualización </CardContent>
      </Card>
      */}
    </div>
  );
};

export default InstagramDashboard;
