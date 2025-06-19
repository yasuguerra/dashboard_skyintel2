import React from 'react';
import { useOverallOverviewData } from '@/hooks/useOverallOverviewData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react'; // Icono de carga

interface OverallOverviewProps {
  startDate?: string;
  endDate?: string;
}

const OverallOverview: React.FC<OverallOverviewProps> = ({ startDate, endDate }) => {
  const { data: overviewResponse, isLoading, isError, error } = useOverallOverviewData({ startDate, endDate });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-lg">Loading Overview Data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : 'An unknown error occurred while fetching overview data.'}
        </AlertDescription>
      </Alert>
    );
  }

  if (!overviewResponse) {
    return <p className="text-center mt-4">No overview data available.</p>;
  }

  const { overviewData, aiInsight } = overviewResponse;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <h1 className="text-3xl font-bold tracking-tight">Overall Business Overview</h1>
      
      {/* KPIs Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Key Performance Indicators</h2>
        {overviewData?.kpis && overviewData.kpis.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {overviewData.kpis.map((kpi, index) => (
              <Card key={index} className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">{kpi.title}</CardTitle>
                  {kpi.period && <CardDescription>{kpi.period}</CardDescription>}
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{kpi.value}</p>
                  {/* Aquí podrías añadir indicadores de tendencia si los tuvieras */}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>No KPIs available.</p>
        )}
      </section>

      {/* AI Insights Section */}
      {aiInsight && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">AI-Powered Insights</h2>
          <Card className="bg-gradient-to-r from-sky-50 to-cyan-50 border-sky-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sky-700">
                {/* Puedes añadir un icono de cerebro o similar aquí */}
                Strategic Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base whitespace-pre-line">{aiInsight}</p>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Aquí podrías añadir los mini-gráficos de overviewData.charts si los implementas */}
      {/* 
      {overviewData?.charts && overviewData.charts.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Trend Charts</h2>
          // Lógica para renderizar gráficos
        </section>
      )}
      */}
    </div>
  );
};

export default OverallOverview;
