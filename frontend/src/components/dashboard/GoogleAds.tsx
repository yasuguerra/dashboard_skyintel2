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
import useGoogleAdsData from "@/hooks/useGoogleAdsData";

const GoogleAds = () => {
  const { data } = useGoogleAdsData();

  const campaignPerformance = data?.campaignPerformance ?? [];
  const dailySpend = data?.dailySpend ?? [];
  const keywordPerformance = data?.keywordPerformance ?? [];
  const devicePerformance = data?.devicePerformance ?? [];

  return (
    <div className="space-y-6">
      {/* AI Insights Panel */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-green-600" />
            AI Insights – Google Ads
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Optimization
              </Badge>
              <p className="text-sm">
                Shopping Ads campaign has the highest ROAS (6.8×). Consider increasing budget allocation by 20 %.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Badge
                variant="secondary"
                className="bg-yellow-100 text-yellow-800"
              >
                Alert
              </Badge>
              <p className="text-sm">
                Quality score for “seo services” keyword is low (6 / 10). Review ad relevance and landing page.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800"
              >
                Opportunity
              </Badge>
              <p className="text-sm">
                Mobile conversions are strong. Consider creating mobile-specific ad copies for better performance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 👉 Aquí seguirán tus gráficos de campaignPerformance, dailySpend, etc. */}
    </div>
  );
};

export default GoogleAds;
