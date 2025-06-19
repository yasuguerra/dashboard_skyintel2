
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Brain, TrendingUp, Target, Lightbulb, AlertTriangle, Star } from "lucide-react";

const AIInsights = () => {
  const overallPerformance = [
    { platform: "Google Analytics", score: 85, trend: "+12%" },
    { platform: "Google Ads", score: 78, trend: "+8%" },
    { platform: "Facebook", score: 82, trend: "+15%" },
    { platform: "Instagram", score: 89, trend: "+18%" },
    { platform: "TikTok", score: 92, trend: "+25%" }
  ];

  const crossPlatformInsights = [
    { 
      insight: "TikTok content drives 34% more Instagram engagement when cross-posted within 2 hours",
      impact: "High",
      action: "Create TikTok-first strategy",
      platforms: ["TikTok", "Instagram"]
    },
    {
      insight: "Google Ads clicks increase 23% when promoted content matches Facebook viral posts",
      impact: "Medium",
      action: "Sync ad content with social trends",
      platforms: ["Google Ads", "Facebook"]
    },
    {
      insight: "Email signups from GA4 convert 45% better from Instagram traffic vs Facebook",
      impact: "High",
      action: "Increase Instagram CTAs",
      platforms: ["Google Analytics", "Instagram"]
    }
  ];

  const contentRecommendations = [
    {
      type: "Video Tutorial",
      confidence: 94,
      reasoning: "Educational content performs 67% better across all platforms",
      estimatedReach: "45K+",
      platforms: ["Instagram", "TikTok", "Facebook"]
    },
    {
      type: "Behind the Scenes",
      confidence: 87,
      reasoning: "Authentic content increases engagement by 34%",
      estimatedReach: "32K+",
      platforms: ["Instagram", "TikTok"]
    },
    {
      type: "User Generated Content",
      confidence: 91,
      reasoning: "UGC has 2.3x higher conversion rates",
      estimatedReach: "28K+",
      platforms: ["Facebook", "Instagram"]
    }
  ];

  const optimizationOpportunities = [
    {
      area: "Google Ads Quality Score",
      currentScore: 6.2,
      potentialScore: 8.5,
      impact: "23% cost reduction",
      effort: "Medium"
    },
    {
      area: "Instagram Story Completion",
      currentScore: 65,
      potentialScore: 82,
      impact: "17% more reach",
      effort: "Low"
    },
    {
      area: "Facebook Post Timing",
      currentScore: 72,
      potentialScore: 89,
      impact: "31% more engagement",
      effort: "Low"
    }
  ];

  const predictiveAnalytics = [
    { metric: "Expected Followers Growth", value: "+15.2%", confidence: 87 },
    { metric: "Projected Ad Spend Efficiency", value: "+12.8%", confidence: 82 },
    { metric: "Content Engagement Increase", value: "+23.4%", confidence: 91 },
    { metric: "Conversion Rate Improvement", value: "+8.7%", confidence: 78 }
  ];

  const platformSynergy = [
    { platform: "TikTok", synergy: 95, color: "#ef4444" },
    { platform: "Instagram", synergy: 89, color: "#e11d48" },
    { platform: "Facebook", synergy: 76, color: "#3b82f6" },
    { platform: "Google Ads", synergy: 82, color: "#10b981" },
    { platform: "Google Analytics", synergy: 88, color: "#f59e0b" }
  ];

  return (
    <div className="space-y-6">
      {/* AI Overview Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Brain className="h-6 w-6" />
            AI-Powered Cross-Platform Insights
          </CardTitle>
          <CardDescription className="text-blue-100">
            Comprehensive analysis across all your digital marketing channels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold">94%</p>
              <p className="text-blue-100 text-sm">Overall Health Score</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">+18.5%</p>
              <p className="text-blue-100 text-sm">Cross-Platform Growth</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">12</p>
              <p className="text-blue-100 text-sm">Actionable Insights</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">$2.4K</p>
              <p className="text-blue-100 text-sm">Potential Savings</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Platform Performance Overview
          </CardTitle>
          <CardDescription>AI-calculated performance scores for each platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {overallPerformance.map((platform, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{platform.platform}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{platform.score}/100</span>
                      <Badge variant={platform.score >= 85 ? "default" : platform.score >= 75 ? "secondary" : "outline"}>
                        {platform.trend}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={platform.score} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cross-Platform Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Cross-Platform Strategic Insights
          </CardTitle>
          <CardDescription>AI-discovered opportunities for platform synergy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {crossPlatformInsights.map((insight, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-medium mb-2">{insight.insight}</p>
                    <div className="flex items-center gap-2 mb-2">
                      {insight.platforms.map((platform, i) => (
                        <Badge key={i} variant="outline">{platform}</Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Recommended Action:</strong> {insight.action}
                    </p>
                  </div>
                  <Badge variant={insight.impact === "High" ? "default" : "secondary"}>
                    {insight.impact} Impact
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              AI Content Recommendations
            </CardTitle>
            <CardDescription>Data-driven content suggestions for maximum impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contentRecommendations.map((rec, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{rec.type}</h4>
                    <Badge variant="default">{rec.confidence}% confidence</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{rec.reasoning}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span>Est. Reach: {rec.estimatedReach}</span>
                    <div className="flex gap-1">
                      {rec.platforms.map((platform, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{platform}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Optimization Opportunities
            </CardTitle>
            <CardDescription>Quick wins to improve performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {optimizationOpportunities.map((opp, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{opp.area}</h4>
                    <Badge variant={opp.effort === "Low" ? "default" : "secondary"}>
                      {opp.effort} effort
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm mb-2">
                    <span>Current: {opp.currentScore}</span>
                    <span>→</span>
                    <span>Potential: {opp.potentialScore}</span>
                  </div>
                  <p className="text-sm font-medium text-green-600">{opp.impact}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            30-Day Predictive Analytics
          </CardTitle>
          <CardDescription>AI forecasts based on current trends and optimization implementation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {predictiveAnalytics.map((prediction, index) => (
              <div key={index} className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{prediction.value}</p>
                <p className="text-sm font-medium mb-1">{prediction.metric}</p>
                <Badge variant="outline" className="text-xs">
                  {prediction.confidence}% confidence
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Platform Synergy Radar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Platform Synergy Analysis
          </CardTitle>
          <CardDescription>How well your platforms work together</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={platformSynergy}>
                <PolarGrid />
                <PolarAngleAxis dataKey="platform" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar
                  name="Synergy Score"
                  dataKey="synergy"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
            
            <div className="space-y-3">
              <h4 className="font-medium">Synergy Recommendations:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <p>Facebook synergy is lowest (76%). Consider integrating Facebook Pixel with Google Analytics for better attribution.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Star className="h-4 w-4 text-green-600 mt-0.5" />
                  <p>TikTok-Instagram synergy is excellent (95%). Continue cross-posting strategy with 2-hour delays.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                  <p>Google Ads can leverage high-performing TikTok content for display remarketing campaigns.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Center */}
      <Card>
        <CardHeader>
          <CardTitle>AI Action Center</CardTitle>
          <CardDescription>Priority actions recommended by AI analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto p-4 flex flex-col items-start gap-2">
              <div className="font-medium">Optimize Google Ads</div>
              <div className="text-xs opacity-90">Improve quality scores for 23% cost reduction</div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
              <div className="font-medium">Create Video Tutorial</div>
              <div className="text-xs opacity-70">94% confidence, 45K+ estimated reach</div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
              <div className="font-medium">Sync Posting Times</div>
              <div className="text-xs opacity-70">31% more engagement across platforms</div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsights;
