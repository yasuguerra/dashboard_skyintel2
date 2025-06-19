
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Users, Heart, MessageCircle, Share2, Brain } from "lucide-react";

const FacebookDashboard = () => {
  const engagementData = [
    { date: "Mon", reach: 12400, likes: 340, comments: 89, shares: 45 },
    { date: "Tue", reach: 15600, likes: 420, comments: 112, shares: 67 },
    { date: "Wed", reach: 11200, likes: 298, comments: 76, shares: 38 },
    { date: "Thu", reach: 18900, likes: 512, comments: 134, shares: 89 },
    { date: "Fri", reach: 16700, likes: 445, comments: 118, shares: 72 },
    { date: "Sat", reach: 21300, likes: 578, comments: 156, shares: 94 },
    { date: "Sun", reach: 19800, likes: 534, comments: 142, shares: 81 }
  ];

  const audienceInsights = [
    { age: "18-24", percentage: 15, color: "#3b82f6" },
    { age: "25-34", percentage: 35, color: "#10b981" },
    { age: "35-44", percentage: 28, color: "#f59e0b" },
    { age: "45-54", percentage: 15, color: "#ef4444" },
    { age: "55+", percentage: 7, color: "#8b5cf6" }
  ];

  const topPosts = [
    { 
      type: "Video", 
      content: "Behind the scenes of our product launch", 
      reach: 45200, 
      engagement: 2340, 
      engagementRate: 5.2 
    },
    { 
      type: "Image", 
      content: "Customer success story testimonial", 
      reach: 32100, 
      engagement: 1890, 
      engagementRate: 5.9 
    },
    { 
      type: "Carousel", 
      content: "Top 5 features of our new service", 
      reach: 28700, 
      engagement: 1456, 
      engagementRate: 5.1 
    },
    { 
      type: "Link", 
      content: "Industry insights blog post", 
      reach: 19800, 
      engagement: 987, 
      engagementRate: 5.0 
    }
  ];

  const contentTypes = [
    { name: "Video", posts: 12, engagement: 8.2, color: "#3b82f6" },
    { name: "Image", posts: 28, engagement: 6.1, color: "#10b981" },
    { name: "Carousel", posts: 8, engagement: 7.4, color: "#f59e0b" },
    { name: "Link", posts: 15, engagement: 4.8, color: "#ef4444" }
  ];

  return (
    <div className="space-y-6">
      {/* AI Insights Panel */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Insights - Facebook
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800">Performance</Badge>
              <p className="text-sm">Video content generates 38% higher engagement than images. Increase video posting frequency.</p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">Audience</Badge>
              <p className="text-sm">Your 25-34 age group (35% of audience) is most active on weekends. Schedule key posts accordingly.</p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Timing</Badge>
              <p className="text-sm">Saturday posts reach 21K+ users on average. Consider posting important announcements on Saturdays.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Reach</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127,340</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18.2%</span> from last week
            </p>
            <Progress value={78} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,127</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+23.1%</span> from last week
            </p>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">827</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+14.7%</span> from last week
            </p>
            <Progress value={72} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.4%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.3%</span> from last week
            </p>
            <Progress value={84} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Engagement */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Engagement</CardTitle>
            <CardDescription>Reach and engagement metrics by day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="reach" stroke="#3b82f6" strokeWidth={2} name="Reach" />
                <Line type="monotone" dataKey="likes" stroke="#10b981" strokeWidth={2} name="Likes" />
                <Line type="monotone" dataKey="comments" stroke="#f59e0b" strokeWidth={2} name="Comments" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Audience Demographics */}
        <Card>
          <CardHeader>
            <CardTitle>Audience Demographics</CardTitle>
            <CardDescription>Age distribution of your audience</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={audienceInsights}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ age, percentage }) => `${age} (${percentage}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                >
                  {audienceInsights.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Content Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
            <CardDescription>Your best content this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPosts.map((post, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{post.type}</Badge>
                      <span className="text-sm font-medium">{post.engagementRate}% engagement</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{post.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {post.reach.toLocaleString()} reach • {post.engagement.toLocaleString()} engagements
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Type Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Content Type Performance</CardTitle>
            <CardDescription>Engagement rates by content type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={contentTypes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'posts' ? `${value} posts` : `${value}% engagement`,
                  name === 'posts' ? 'Posts' : 'Engagement Rate'
                ]} />
                <Bar dataKey="posts" fill="#3b82f6" name="posts" />
                <Bar dataKey="engagement" fill="#10b981" name="engagement" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacebookDashboard;
