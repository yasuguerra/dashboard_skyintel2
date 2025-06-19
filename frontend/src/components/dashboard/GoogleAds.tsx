
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { DollarSign, MousePointer, Eye, TrendingUp, Brain } from "lucide-react";

const GoogleAds = () => {
  const campaignPerformance = [
    { campaign: "Brand Campaign", spend: 1200, clicks: 2400, conversions: 48, ctr: 3.2, cpc: 0.50, roas: 4.8 },
    { campaign: "Product Search", spend: 980, clicks: 1960, conversions: 42, ctr: 2.8, cpc: 0.50, roas: 5.2 },
    { campaign: "Display Remarketing", spend: 650, clicks: 1300, conversions: 19, ctr: 2.1, cpc: 0.50, roas: 3.1 },
    { campaign: "Shopping Ads", spend: 410, clicks: 820, conversions: 28, ctr: 4.1, cpc: 0.50, roas: 6.8 }
  ];

  const dailySpend = [
    { date: "Mon", spend: 145, clicks: 290, conversions: 12 },
    { date: "Tue", spend: 162, clicks: 324, conversions: 15 },
    { date: "Wed", spend: 139, clicks: 278, conversions: 11 },
    { date: "Thu", spend: 178, clicks: 356, conversions: 18 },
    { date: "Fri", spend: 155, clicks: 310, conversions: 14 },
    { date: "Sat", spend: 132, clicks: 264, conversions: 9 },
    { date: "Sun", spend: 119, clicks: 238, conversions: 8 }
  ];

  const keywordPerformance = [
    { keyword: "digital marketing", impressions: 15420, clicks: 462, ctr: 3.0, cpc: 1.25, quality: 8 },
    { keyword: "social media management", impressions: 12340, clicks: 371, ctr: 3.0, cpc: 1.18, quality: 7 },
    { keyword: "content marketing", impressions: 9876, clicks: 296, ctr: 3.0, cpc: 1.05, quality: 9 },
    { keyword: "seo services", impressions: 8765, clicks: 263, ctr: 3.0, cpc: 1.45, quality: 6 },
    { keyword: "ppc advertising", impressions: 7654, clicks: 230, ctr: 3.0, cpc: 1.38, quality: 8 }
  ];

  const devicePerformance = [
    { name: "Mobile", spend: 1680, conversions: 67, color: "#3b82f6" },
    { name: "Desktop", spend: 1120, conversions: 45, color: "#10b981" },
    { name: "Tablet", spend: 440, conversions: 15, color: "#f59e0b" }
  ];

  return (
    <div className="space-y-6">
      {/* AI Insights Panel */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-green-600" />
            AI Insights - Google Ads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800">Optimization</Badge>
              <p className="text-sm">Shopping Ads campaign has the highest ROAS (6.8x). Consider increasing budget allocation by 20%.</p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Alert</Badge>
              <p className="text-sm">Quality score for "seo services" keyword is low (6/10). Review ad relevance and landing page.</p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">Opportunity</Badge>
              <p className="text-sm">Mobile conversions are strong. Consider creating mobile-specific ad copies for better performance.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,240</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+5.2%</span> from last week
            </p>
            <Progress value={65} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6,480</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.7%</span> from last week
            </p>
            <Progress value={72} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. CPC</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.50</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-12.3%</span> improvement
            </p>
            <Progress value={45} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROAS</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2x</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18.5%</span> from last week
            </p>
            <Progress value={84} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Performance</CardTitle>
            <CardDescription>Spend, clicks, and conversions by day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailySpend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="spend" fill="#3b82f6" name="Spend ($)" />
                <Bar dataKey="clicks" fill="#10b981" name="Clicks" />
                <Bar dataKey="conversions" fill="#f59e0b" name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Device Performance</CardTitle>
            <CardDescription>Spend distribution by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={devicePerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="spend"
                >
                  {devicePerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Spend']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
          <CardDescription>Detailed metrics for all active campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Campaign</th>
                  <th className="text-right p-2">Spend</th>
                  <th className="text-right p-2">Clicks</th>
                  <th className="text-right p-2">Conversions</th>
                  <th className="text-right p-2">CTR</th>
                  <th className="text-right p-2">CPC</th>
                  <th className="text-right p-2">ROAS</th>
                </tr>
              </thead>
              <tbody>
                {campaignPerformance.map((campaign, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{campaign.campaign}</td>
                    <td className="p-2 text-right">${campaign.spend}</td>
                    <td className="p-2 text-right">{campaign.clicks.toLocaleString()}</td>
                    <td className="p-2 text-right">{campaign.conversions}</td>
                    <td className="p-2 text-right">{campaign.ctr}%</td>
                    <td className="p-2 text-right">${campaign.cpc}</td>
                    <td className="p-2 text-right">
                      <Badge variant={campaign.roas > 4 ? "default" : "secondary"}>
                        {campaign.roas}x
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top Keywords */}
      <Card>
        <CardHeader>
          <CardTitle>Top Keywords</CardTitle>
          <CardDescription>Best performing keywords and their metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {keywordPerformance.map((keyword, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{keyword.keyword}</p>
                  <p className="text-sm text-muted-foreground">
                    {keyword.impressions.toLocaleString()} impressions • {keyword.clicks} clicks
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span>{keyword.ctr}% CTR</span>
                  <span>${keyword.cpc} CPC</span>
                  <Badge variant={keyword.quality >= 8 ? "default" : keyword.quality >= 6 ? "secondary" : "destructive"}>
                    QS: {keyword.quality}/10
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleAds;
