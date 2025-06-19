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
import useFacebookData, { FacebookData } from "@/hooks/useFacebookData"; // Importar FacebookData

const FacebookDashboard = () => {
  const { data }: { data: FacebookData | undefined } = useFacebookData(); // Tipar data explícitamente

  const engagementData = data?.engagementData ?? [];
  const audienceInsights = data?.audienceInsights ?? [];
  const topPosts = data?.topPosts ?? [];
  const contentTypes = data?.contentTypes ?? [];

  return (
    <div className="space-y-6">
      {/* AI Insights Panel */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Insights – Facebook
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Performance
              </Badge>
              <p className="text-sm">
                Video content generates 38 % higher engagement than images.
                Increase video posting frequency.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Audience
              </Badge>
              <p className="text-sm">
                Your 25-34 age group (35 % of audience) is most active on
                weekends. Schedule key posts accordingly.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Badge
                variant="secondary"
                className="bg-yellow-100 text-yellow-800"
              >
                Timing
              </Badge>
              <p className="text-sm">
                Saturday posts reach 21 K + users on average. Consider posting
                important announcements on Saturdays.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 👉 Aquí puedes seguir añadiendo tus gráficos (engagementData, audienceInsights, etc.) */}
    </div>
  );
};

export default FacebookDashboard;

