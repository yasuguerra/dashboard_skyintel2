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
  PieChart, Pie, Cell,
} from "recharts";
import { Brain, Loader2, AlertTriangle } from "lucide-react";
import { useGoogleAdsData, GoogleAdsDataResponse } from "@/hooks/useGoogleAdsData";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface GoogleAdsProps {
  startDate?: string;
  endDate?: string;
}

const GoogleAds: React.FC<GoogleAdsProps> = ({ startDate, endDate }) => {
  const { data: adsDataResponse, isLoading, isError, error } = useGoogleAdsData({ startDate, endDate });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <p className="ml-2 text-lg">Loading Google Ads Data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error Fetching Google Ads Data</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : 'An unknown error occurred.'}
        </AlertDescription>
      </Alert>
    );
  }

  if (!adsDataResponse) {
    return <p className="text-center mt-4">No Google Ads data available for the selected period.</p>;
  }

  const { chartData, aiInsight } = adsDataResponse;
  // Como los datos de Ads son dummy del backend, podemos usarlos directamente.
  // Si fueran reales, extraeríamos de chartData como: const { campaignPerformance } = chartData || {};
  const { campaignPerformance, dailySpend, keywordPerformance, devicePerformance } = chartData || {};
  
  const deviceColors = devicePerformance?.map(d => d.color) || ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* AI Insights Panel */}
      {aiInsight && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Brain className="h-5 w-5" />
              AI Insights – Google Ads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm md:text-base whitespace-pre-line">{aiInsight}</p>
          </CardContent>
        </Card>
      )}

      {/* Sección de Gráficos */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Gráfico de Rendimiento de Campaña */}
        {campaignPerformance && campaignPerformance.length > 0 && (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>Spend, Clicks, Conversions, ROAS by campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={campaignPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="campaign" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="spend" fill="#8884d8" name="Spend" />
                  <Bar dataKey="roas" fill="#82ca9d" name="ROAS" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Gráfico de Gasto Diario */}
        {dailySpend && dailySpend.length > 0 && (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Daily Spend & Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailySpend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" dataKey="spend" name="Spend" />
                  <YAxis yAxisId="right" orientation="right" dataKey="conversions" name="Conversions" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="spend" stroke="#FF7F50" name="Spend" />
                  <Line yAxisId="right" type="monotone" dataKey="conversions" stroke="#4682B4" name="Conversions" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
      
      {devicePerformance && devicePerformance.length > 0 && (
         <Card className="mt-6 shadow-md">
            <CardHeader>
              <CardTitle>Device Performance (Conversions)</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={devicePerformance}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="conversions" // Usando 'conversions' o 'spend' según lo que quieras mostrar
                    nameKey="name"
                  >
                    {devicePerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={deviceColors[index % deviceColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} Conversions`, name]}/>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
      )}

      {/* Placeholder para Keyword Performance */}
      {keywordPerformance && keywordPerformance.length > 0 && (
        <Card className="mt-6 shadow-md">
          <CardHeader>
            <CardTitle>Keyword Performance</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-gray-500">Table for keywords (CTR, CPC, Quality Score) could be implemented here.</p>
             {/* Ejemplo de cómo podrías mostrar algunos datos */}
             <ul className="mt-2 space-y-1">
                {keywordPerformance.slice(0,3).map(kw => (
                    <li key={kw.keyword} className="text-xs">
                        <strong>{kw.keyword}:</strong> Impressions: {kw.impressions}, CTR: {kw.ctr}%, Quality: {kw.quality}/10
                    </li>
                ))}
             </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GoogleAds;
