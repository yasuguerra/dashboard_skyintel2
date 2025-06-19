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
import useGoogleAnalyticsData from "@/hooks/useGoogleAnalyticsData";

const GoogleAnalytics = () => {
  const { data } = useGoogleAnalyticsData();

  const trafficData = data?.trafficData ?? [];
  const deviceData = data?.deviceData ?? [];
  const topPages = data?.topPages ?? [];
  const conversionGoals = data?.conversionGoals ?? [];

  return (
    <div className="space-y-6">
      {/* AI Insights Panel */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50
