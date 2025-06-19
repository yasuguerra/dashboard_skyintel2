import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Brain } from "lucide-react";
import useInstagramData, { InstagramData } from "@/hooks/useInstagramData"; // Importar InstagramData

const InstagramDashboard = () => {
  const { data }: { data: InstagramData | undefined } = useInstagramData(); // Tipar data explícitamente

  const growthData = data?.growthData ?? [];
  const contentPerformance = data?.contentPerformance ?? [];
  const hashtagPerformance = data?.hashtagPerformance ?? [];
  const audienceActivity = data?.audienceActivity ?? [];
  const storyMetrics = data?.storyMetrics ?? [];

  return (
    <div className="space-y-6">
      {/* AI Insights Panel */}
      <Card className="bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-pink-600" />
            AI Insights – Instagram
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Growth
              </Badge>
              <p className="text-sm">
                Reels generate 43 % more engagement than photos. Create 2–3
                Reels per week for optimal growth.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Timing
              </Badge>
              <p className="text-sm">
                Peak audience activity is at 9&nbsp;PM. Schedule your best
                content around this time for maximum reach.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-800"
              >
                Hashtags
              </Badge>
              <p className="text-sm">
                #digitalmarketing shows highest reach (45 K). Use similar
                industry hashtags for better discoverability.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 👉 Aquí agregarás tus gráficos de growthData, contentPerformance, etc. */}
    </div>
  );
};

export default InstagramDashboard;
