
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Play, Heart, MessageCircle, Share2, Brain } from "lucide-react";

const TikTokDashboard = () => {
  const videoPerformance = [
    { video: "Product Demo #1", views: 125400, likes: 8920, comments: 234, shares: 567, duration: "15s" },
    { video: "Behind Scenes", views: 98200, likes: 7340, comments: 189, shares: 423, duration: "30s" },
    { video: "Tutorial Part 1", views: 76800, likes: 5610, comments: 156, shares: 298, duration: "45s" },
    { video: "Team Interview", views: 54300, likes: 3890, comments: 98, shares: 187, duration: "60s" },
    { video: "Quick Tips", views: 43200, likes: 3120, comments: 78, shares: 134, duration: "12s" }
  ];

  const weeklyGrowth = [
    { week: "Week 1", followers: 15200, views: 234000, engagement: 18400 },
    { week: "Week 2", followers: 15680, views: 267000, engagement: 21200 },
    { week: "Week 3", followers: 16100, views: 298000, engagement: 24600 },
    { week: "Week 4", followers: 16450, views: 312000, engagement: 26800 }
  ];

  const contentCategories = [
    { category: "Educational", videos: 12, avgViews: 67800, color: "#3b82f6" },
    { category: "Entertainment", videos: 18, avgViews: 89200, color: "#10b981" },
    { category: "Behind Scenes", videos: 8, avgViews: 54300, color: "#f59e0b" },
    { category: "Product Demo", videos: 6, avgViews: 92600, color: "#ef4444" }
  ];

  const audienceData = [
    { age: "13-17", percentage: 22, color: "#3b82f6" },
    { age: "18-24", percentage: 45, color: "#10b981" },
    { age: "25-34", percentage: 28, color: "#f59e0b" },
    { age: "35+", percentage: 5, color: "#ef4444" }
  ];

  const trendingHashtags = [
    { hashtag: "#tutorial", views: 2400000, trending: true },
    { hashtag: "#tips", views: 1800000, trending: true },
    { hashtag: "#fyp", views: 3200000, trending: false },
    { hashtag: "#viral", views: 1600000, trending: true },
    { hashtag: "#trending", views: 1400000, trending: false }
  ];

  const timeAnalysis = [
    { hour: "06:00", engagement: 15 },
    { hour: "09:00", engagement: 28 },
    { hour: "12:00", engagement: 45 },
    { hour: "15:00", engagement: 62 },
    { hour: "18:00", engagement: 89 },
    { hour: "21:00", engagement: 95 },
    { hour: "00:00", engagement: 34 }
  ];

  return (
    <div className="space-y-6">
      {/* AI Insights Panel */}
      <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-red-600" />
            AI Insights - TikTok
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800">Viral Potential</Badge>
              <p className="text-sm">Short videos (15s) get 2x more engagement. Keep content under 30 seconds for maximum reach.</p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="bg-red-100 text-red-800">Trending</Badge>
              <p className="text-sm">#tutorial and #tips are trending in your niche. Create educational content to ride the wave.</p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">Audience</Badge>
              <p className="text-sm">67% of your audience is under 25. Focus on trendy, fast-paced content that appeals to Gen Z.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892K</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+34.2%</span> this week
            </p>
            <Progress value={88} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34.2K</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+28.7%</span> this week
            </p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.8K</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+45.3%</span> this week
            </p>
            <Progress value={82} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shares</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1K</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+52.1%</span> this week
            </p>
            <Progress value={91} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Growth</CardTitle>
            <CardDescription>Followers, views, and engagement trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="followers" stroke="#3b82f6" strokeWidth={2} name="Followers" />
                <Line type="monotone" dataKey="views" stroke="#10b981" strokeWidth={2} name="Views" />
                <Line type="monotone" dataKey="engagement" stroke="#f59e0b" strokeWidth={2} name="Engagement" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Audience Demographics */}
        <Card>
          <CardHeader>
            <CardTitle>Audience Demographics</CardTitle>
            <CardDescription>Age distribution of your followers</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={audienceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ age, percentage }) => `${age} (${percentage}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                >
                  {audienceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Video Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Videos</CardTitle>
          <CardDescription>Your most successful content this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Video</th>
                  <th className="text-right p-2">Views</th>
                  <th className="text-right p-2">Likes</th>
                  <th className="text-right p-2">Comments</th>
                  <th className="text-right p-2">Shares</th>
                  <th className="text-right p-2">Duration</th>
                  <th className="text-right p-2">Performance</th>
                </tr>
              </thead>
              <tbody>
                {videoPerformance.map((video, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{video.video}</td>
                    <td className="p-2 text-right">{video.views.toLocaleString()}</td>
                    <td className="p-2 text-right">{video.likes.toLocaleString()}</td>
                    <td className="p-2 text-right">{video.comments}</td>
                    <td className="p-2 text-right">{video.shares}</td>
                    <td className="p-2 text-right">{video.duration}</td>
                    <td className="p-2 text-right">
                      <Badge variant={index < 2 ? "default" : index < 4 ? "secondary" : "outline"}>
                        {index < 2 ? "Viral" : index < 4 ? "Good" : "Average"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Content Categories and Hashtags */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Content Categories</CardTitle>
            <CardDescription>Performance by content type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={contentCategories}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'videos' ? `${value} videos` : `${value.toLocaleString()} avg views`,
                  name === 'videos' ? 'Videos' : 'Avg Views'
                ]} />
                <Bar dataKey="videos" fill="#3b82f6" name="videos" />
                <Bar dataKey="avgViews" fill="#10b981" name="avgViews" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Trending Hashtags */}
        <Card>
          <CardHeader>
            <CardTitle>Trending Hashtags</CardTitle>
            <CardDescription>Popular hashtags in your niche</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trendingHashtags.map((hashtag, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{hashtag.hashtag}</p>
                      {hashtag.trending && (
                        <Badge variant="default" className="bg-red-500">
                          Trending
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {hashtag.views.toLocaleString()} total views
                    </p>
                  </div>
                  <Badge variant="outline">#{index + 1}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Best Posting Times */}
      <Card>
        <CardHeader>
          <CardTitle>Best Posting Times</CardTitle>
          <CardDescription>When your audience is most active</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timeAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}%`, 'Engagement']} />
              <Bar dataKey="engagement" fill="#ef4444" name="Engagement" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TikTokDashboard;
