
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Users, Heart, MessageCircle, Eye, Brain } from "lucide-react";

const InstagramDashboard = () => {
  const growthData = [
    { week: "Week 1", followers: 22800, posts: 7, engagement: 1420 },
    { week: "Week 2", followers: 22950, posts: 6, engagement: 1380 },
    { week: "Week 3", followers: 23100, posts: 8, engagement: 1560 },
    { week: "Week 4", followers: 23250, posts: 5, engagement: 1290 }
  ];

  const contentPerformance = [
    { type: "Reels", posts: 15, avgLikes: 890, avgComments: 67, avgViews: 12400 },
    { type: "Carousel", posts: 12, avgLikes: 645, avgComments: 34, avgViews: 8900 },
    { type: "Photo", posts: 23, avgLikes: 523, avgComments: 28, avgViews: 6700 },
    { type: "IGTV", posts: 6, avgLikes: 412, avgComments: 22, avgViews: 5600 }
  ];

  const hashtagPerformance = [
    { hashtag: "#digitalmarketing", reach: 45200, impressions: 67800 },
    { hashtag: "#socialmedia", reach: 38900, impressions: 56300 },
    { hashtag: "#contentcreator", reach: 32100, impressions: 48700 },
    { hashtag: "#marketing", reach: 28400, impressions: 42600 },
    { hashtag: "#branding", reach: 24700, impressions: 38200 }
  ];

  const audienceActivity = [
    { hour: "06:00", activity: 12 },
    { hour: "09:00", activity: 35 },
    { hour: "12:00", activity: 68 },
    { hour: "15:00", activity: 45 },
    { hour: "18:00", activity: 89 },
    { hour: "21:00", activity: 92 },
    { hour: "00:00", activity: 23 }
  ];

  const storyMetrics = [
    { name: "Views", value: 85, color: "#3b82f6" },
    { name: "Exits", value: 15, color: "#ef4444" }
  ];

  return (
    <div className="space-y-6">
      {/* AI Insights Panel */}
      <Card className="bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-pink-600" />
            AI Insights - Instagram
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800">Growth</Badge>
              <p className="text-sm">Reels generate 43% more engagement than photos. Create 2-3 Reels per week for optimal growth.</p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">Timing</Badge>
              <p className="text-sm">Peak audience activity is at 9 PM. Schedule your best content around this time for maximum reach.</p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">Hashtags</Badge>
              <p className="text-sm">#digitalmarketing shows highest reach (45K). Use similar industry hashtags for better discoverability.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23,127</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.2%</span> this month
            </p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Likes</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">678</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.8%</span> per post
            </p>
            <Progress value={68} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Comments</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.1%</span> per post
            </p>
            <Progress value={62} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.8%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+1.4%</span> improvement
            </p>
            <Progress value={68} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Tracking */}
        <Card>
          <CardHeader>
            <CardTitle>Growth Tracking</CardTitle>
            <CardDescription>Followers and engagement over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="followers" stroke="#3b82f6" strokeWidth={2} name="Followers" />
                <Line type="monotone" dataKey="engagement" stroke="#10b981" strokeWidth={2} name="Engagement" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Audience Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Audience Activity</CardTitle>
            <CardDescription>When your audience is most active</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={audienceActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Activity']} />
                <Bar dataKey="activity" fill="#e11d48" name="Activity" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Content Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Content Performance by Type</CardTitle>
          <CardDescription>Average performance metrics for different content types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Content Type</th>
                  <th className="text-right p-2">Posts</th>
                  <th className="text-right p-2">Avg. Likes</th>
                  <th className="text-right p-2">Avg. Comments</th>
                  <th className="text-right p-2">Avg. Views</th>
                  <th className="text-right p-2">Performance</th>
                </tr>
              </thead>
              <tbody>
                {contentPerformance.map((content, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{content.type}</td>
                    <td className="p-2 text-right">{content.posts}</td>
                    <td className="p-2 text-right">{content.avgLikes}</td>
                    <td className="p-2 text-right">{content.avgComments}</td>
                    <td className="p-2 text-right">{content.avgViews.toLocaleString()}</td>
                    <td className="p-2 text-right">
                      <Badge variant={content.type === "Reels" ? "default" : "secondary"}>
                        {content.type === "Reels" ? "Best" : content.type === "Carousel" ? "Good" : "Average"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Hashtags and Stories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Hashtags */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Hashtags</CardTitle>
            <CardDescription>Hashtags driving the most reach</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hashtagPerformance.map((hashtag, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{hashtag.hashtag}</p>
                    <p className="text-sm text-muted-foreground">
                      {hashtag.reach.toLocaleString()} reach • {hashtag.impressions.toLocaleString()} impressions
                    </p>
                  </div>
                  <Badge variant="outline">{index + 1}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Story Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Story Performance</CardTitle>
            <CardDescription>Story completion and exit rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={storyMetrics}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {storyMetrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">4.2K</p>
                  <p className="text-sm text-muted-foreground">Avg. Story Views</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">89%</p>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstagramDashboard;
