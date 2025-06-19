
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, DollarSign, TrendingUp, Zap, Brain } from "lucide-react";
import GoogleAnalytics from "@/components/dashboard/GoogleAnalytics";
import GoogleAds from "@/components/dashboard/GoogleAds";
import FacebookDashboard from "@/components/dashboard/FacebookDashboard";
import InstagramDashboard from "@/components/dashboard/InstagramDashboard";
import TikTokDashboard from "@/components/dashboard/TikTokDashboard";
import AIInsights from "@/components/dashboard/AIInsights";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const platformStats = {
    ga4: { users: "45.2K", change: "+12.5%" },
    googleAds: { spend: "$3,240", roas: "4.2x" },
    facebook: { reach: "127K", engagement: "8.4%" },
    instagram: { followers: "23.1K", growth: "+5.2%" },
    tiktok: { views: "892K", likes: "34.2K" }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Social Media & Analytics Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive insights across all your digital platforms
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                Live Data
              </Badge>
              <Button variant="outline" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                AI Insights
              </Button>
            </div>
          </div>

          {/* Quick Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">GA4 Users</p>
                  <p className="text-2xl font-bold">{platformStats.ga4.users}</p>
                  <p className="text-blue-200 text-xs">{platformStats.ga4.change}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-200" />
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Ad Spend</p>
                  <p className="text-2xl font-bold">{platformStats.googleAds.spend}</p>
                  <p className="text-green-200 text-xs">ROAS: {platformStats.googleAds.roas}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-200" />
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">FB Reach</p>
                  <p className="text-2xl font-bold">{platformStats.facebook.reach}</p>
                  <p className="text-purple-200 text-xs">{platformStats.facebook.engagement} engagement</p>
                </div>
                <Users className="h-8 w-8 text-purple-200" />
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-pink-500 to-pink-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm">IG Followers</p>
                  <p className="text-2xl font-bold">{platformStats.instagram.followers}</p>
                  <p className="text-pink-200 text-xs">{platformStats.instagram.growth} growth</p>
                </div>
                <TrendingUp className="h-8 w-8 text-pink-200" />
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-red-500 to-red-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">TikTok Views</p>
                  <p className="text-2xl font-bold">{platformStats.tiktok.views}</p>
                  <p className="text-red-200 text-xs">{platformStats.tiktok.likes} likes</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-200" />
              </div>
            </Card>
          </div>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ga4">Google Analytics</TabsTrigger>
            <TabsTrigger value="googleads">Google Ads</TabsTrigger>
            <TabsTrigger value="facebook">Facebook</TabsTrigger>
            <TabsTrigger value="instagram">Instagram</TabsTrigger>
            <TabsTrigger value="tiktok">TikTok</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AIInsights />
          </TabsContent>

          <TabsContent value="ga4">
            <GoogleAnalytics />
          </TabsContent>

          <TabsContent value="googleads">
            <GoogleAds />
          </TabsContent>

          <TabsContent value="facebook">
            <FacebookDashboard />
          </TabsContent>

          <TabsContent value="instagram">
            <InstagramDashboard />
          </TabsContent>

          <TabsContent value="tiktok">
            <TikTokDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
