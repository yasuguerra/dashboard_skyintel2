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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Brain, Loader2, AlertTriangle } from "lucide-react";
import useGoogleAnalyticsData, { GoogleAnalyticsDataResponse } from "@/hooks/useGoogleAnalyticsData";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface GoogleAnalyticsProps {
  startDate?: string;
  endDate?: string;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ startDate, endDate }) => {
  const { data: gaDataResponse, isLoading, isError, error } = useGoogleAnalyticsData({ startDate, endDate });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="ml-2 text-lg">Loading Google Analytics Data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error Fetching Google Analytics Data</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : 'An unknown error occurred.'}
        </AlertDescription>
      </Alert>
    );
  }

  if (!gaDataResponse) {
    return <p className="text-center mt-4">No Google Analytics data available for the selected period.</p>;
  }

  const { chartData, aiInsight } = gaDataResponse;
  const { trafficData, deviceData, topPages, conversionGoals } = chartData || {};
  
  // Colores para el PieChart de deviceData
  const COLORS = deviceData?.map(d => d.color) || ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* AI Insights Panel */}
      {aiInsight && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Brain className="h-5 w-5" />
              AI Insights – Google Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm md:text-base whitespace-pre-line">{aiInsight}</p>
          </CardContent>
        </Card>
      )}

      {/* Sección de Gráficos */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Gráfico de Tráfico */}
        {trafficData && trafficData.length > 0 && (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
              <CardDescription>Sessions, Users, Pageviews over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sessions" stroke="#8884d8" name="Sessions" />
                  {trafficData[0]?.users !== undefined && <Line type="monotone" dataKey="users" stroke="#82ca9d" name="Users" />}
                  {trafficData[0]?.pageviews !== undefined && <Line type="monotone" dataKey="pageviews" stroke="#ffc658" name="Pageviews" />}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Gráfico de Dispositivos */}
        {deviceData && deviceData.length > 0 && (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Device Breakdown</CardTitle>
              <CardDescription>Users by device category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Tabla de Top Pages */}
      {topPages && topPages.length > 0 && (
        <Card className="mt-6 shadow-md">
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most viewed pages and their bounce rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page Path</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bounce Rate (%)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topPages.map((page, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-xs">{page.pagePath}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.screenPageViews}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.bounceRate?.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Placeholder para Conversion Goals */}
      {/* 
      <Card className="mt-6">
        <CardHeader><CardTitle>Conversion Goals</CardTitle></CardHeader>
        <CardContent> // Implementar visualización para conversionGoals </CardContent>
      </Card>
      */}
    </div>
  );
};

export default GoogleAnalytics;
