
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, MousePointer, Clock, Brain } from "lucide-react";

const GoogleAnalytics = () => {
  const trafficData = [
    { month: "Jan", users: 4200, sessions: 5100, pageviews: 8300 },
    { month: "Feb", users: 4800, sessions: 5900, pageviews: 9200 },
    { month: "Mar", users: 5200, sessions: 6400, pageviews: 10100 },
    { month: "Apr", users: 4900, sessions: 6000, pageviews: 9800 },
    { month: "May", users: 5800, sessions: 7100, pageviews: 11400 },
    { month: "Jun", users: 6200, sessions: 7600, pageviews: 12300 }
  ];

  const deviceData = [
    { name: "Mobile", value: 65, color: "#3b82f6" },
    { name: "Desktop", value: 28, color: "#10b981" },
    { name: "Tablet", value: 7, color: "#f59e0b" }
  ];

  const topPages = [
    { page: "/home", views: 12540, bounceRate: 32 },
    { page: "/products", views: 8920, bounceRate: 45 },
    { page: "/about", views: 6780, bounceRate: 28 },
    { page: "/contact", views: 4560, bounceRate: 52 },
    { page: "/blog", views: 3240, bounceRate: 38 }
  ];

  const conversionGoals = [
    { goal: "Newsletter Signup", completions: 234, rate: 4.2 },
    { goal: "Purchase", completions: 89, rate: 1.6 },
    { goal: "Download", completions: 456, rate: 8.1 },
    { goal: "Contact Form", completions: 123, rate: 2.8 }
  ];

  return (
    <div className="space-y-6">
      {/* AI Insights Panel */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            AI Insights - Google Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800">Growth</Badge>
              <p className="text-sm">Your mobile traffic increased by 23% this month. Consider optimizing mobile UX further.</p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Opportunity</Badge>
              <p className="text-sm">High bounce rate on /contact page (52%). Review page load speed and content relevance.</p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">Trend</Badge>
              <p className="text-sm">Newsletter signups are performing well (4.2% conversion rate). Scale this funnel.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52,420</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.3%</span> from last month
            </p>
            <Progress value={68} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3m 42s</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.2%</span> from last month
            </p>
            <Progress value={82} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">-3.1%</span> improvement
            </p>
            <Progress value={34} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Trends</CardTitle>
            <CardDescription>Users, Sessions, and Pageviews over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="sessions" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="pageviews" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
            <CardDescription>Traffic distribution by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages and Conversions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most visited pages and their performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{page.page}</p>
                    <p className="text-sm text-muted-foreground">{page.views.toLocaleString()} views</p>
                  </div>
                  <Badge variant={page.bounceRate > 40 ? "destructive" : "secondary"}>
                    {page.bounceRate}% bounce
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversion Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Goals</CardTitle>
            <CardDescription>Goal completions and conversion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{goal.goal}</span>
                    <span className="text-sm text-muted-foreground">{goal.rate}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={goal.rate * 10} className="flex-1" />
                    <span className="text-sm font-medium">{goal.completions}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoogleAnalytics;
