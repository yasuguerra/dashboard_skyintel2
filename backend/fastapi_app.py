from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="SkyIntel API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ga/overview")
def ga_overview():
    return {
        "trafficData": [
            {"month": "Jan", "users": 4200, "sessions": 5100, "pageviews": 8300},
            {"month": "Feb", "users": 4800, "sessions": 5900, "pageviews": 9200},
            {"month": "Mar", "users": 5200, "sessions": 6400, "pageviews": 10100},
            {"month": "Apr", "users": 4900, "sessions": 6000, "pageviews": 9800},
            {"month": "May", "users": 5800, "sessions": 7100, "pageviews": 11400},
            {"month": "Jun", "users": 6200, "sessions": 7600, "pageviews": 12300},
        ],
        "deviceData": [
            {"name": "Mobile", "value": 65, "color": "#3b82f6"},
            {"name": "Desktop", "value": 28, "color": "#10b981"},
            {"name": "Tablet", "value": 7, "color": "#f59e0b"},
        ],
        "topPages": [
            {"page": "/home", "views": 12540, "bounceRate": 32},
            {"page": "/products", "views": 8920, "bounceRate": 45},
            {"page": "/about", "views": 6780, "bounceRate": 28},
            {"page": "/contact", "views": 4560, "bounceRate": 52},
            {"page": "/blog", "views": 3240, "bounceRate": 38},
        ],
        "conversionGoals": [
            {"goal": "Newsletter Signup", "completions": 234, "rate": 4.2},
            {"goal": "Purchase", "completions": 89, "rate": 1.6},
            {"goal": "Download", "completions": 456, "rate": 8.1},
            {"goal": "Contact Form", "completions": 123, "rate": 2.8},
        ],
    }

@app.get("/ads/overview")
def ads_overview():
    return {
        "campaignPerformance": [
            {"campaign": "Brand Campaign", "spend": 1200, "clicks": 2400, "conversions": 48, "ctr": 3.2, "cpc": 0.50, "roas": 4.8},
            {"campaign": "Product Search", "spend": 980, "clicks": 1960, "conversions": 42, "ctr": 2.8, "cpc": 0.50, "roas": 5.2},
            {"campaign": "Display Remarketing", "spend": 650, "clicks": 1300, "conversions": 19, "ctr": 2.1, "cpc": 0.50, "roas": 3.1},
            {"campaign": "Shopping Ads", "spend": 410, "clicks": 820, "conversions": 28, "ctr": 4.1, "cpc": 0.50, "roas": 6.8},
        ],
        "dailySpend": [
            {"date": "Mon", "spend": 145, "clicks": 290, "conversions": 12},
            {"date": "Tue", "spend": 162, "clicks": 324, "conversions": 15},
            {"date": "Wed", "spend": 139, "clicks": 278, "conversions": 11},
            {"date": "Thu", "spend": 178, "clicks": 356, "conversions": 18},
            {"date": "Fri", "spend": 155, "clicks": 310, "conversions": 14},
            {"date": "Sat", "spend": 132, "clicks": 264, "conversions": 9},
            {"date": "Sun", "spend": 119, "clicks": 238, "conversions": 8},
        ],
        "keywordPerformance": [
            {"keyword": "digital marketing", "impressions": 15420, "clicks": 462, "ctr": 3.0, "cpc": 1.25, "quality": 8},
            {"keyword": "social media management", "impressions": 12340, "clicks": 371, "ctr": 3.0, "cpc": 1.18, "quality": 7},
            {"keyword": "content marketing", "impressions": 9876, "clicks": 296, "ctr": 3.0, "cpc": 1.05, "quality": 9},
            {"keyword": "seo services", "impressions": 8765, "clicks": 263, "ctr": 3.0, "cpc": 1.45, "quality": 6},
            {"keyword": "ppc advertising", "impressions": 7654, "clicks": 230, "ctr": 3.0, "cpc": 1.38, "quality": 8},
        ],
        "devicePerformance": [
            {"name": "Mobile", "spend": 1680, "conversions": 67, "color": "#3b82f6"},
            {"name": "Desktop", "spend": 1120, "conversions": 45, "color": "#10b981"},
            {"name": "Tablet", "spend": 440, "conversions": 15, "color": "#f59e0b"},
        ],
    }

@app.get("/facebook/overview")
def facebook_overview():
    return {
        "engagementData": [
            {"date": "Mon", "reach": 12400, "likes": 340, "comments": 89, "shares": 45},
            {"date": "Tue", "reach": 15600, "likes": 420, "comments": 112, "shares": 67},
            {"date": "Wed", "reach": 11200, "likes": 298, "comments": 76, "shares": 38},
            {"date": "Thu", "reach": 18900, "likes": 512, "comments": 134, "shares": 89},
            {"date": "Fri", "reach": 16700, "likes": 445, "comments": 118, "shares": 72},
            {"date": "Sat", "reach": 21300, "likes": 578, "comments": 156, "shares": 94},
            {"date": "Sun", "reach": 19800, "likes": 534, "comments": 142, "shares": 81},
        ],
        "audienceInsights": [
            {"age": "18-24", "percentage": 15, "color": "#3b82f6"},
            {"age": "25-34", "percentage": 35, "color": "#10b981"},
            {"age": "35-44", "percentage": 28, "color": "#f59e0b"},
            {"age": "45-54", "percentage": 15, "color": "#ef4444"},
            {"age": "55+", "percentage": 7, "color": "#8b5cf6"},
        ],
        "topPosts": [
            {"type": "Video", "content": "Behind the scenes of our product launch", "reach": 45200, "engagement": 2340, "engagementRate": 5.2},
            {"type": "Image", "content": "Customer success story testimonial", "reach": 32100, "engagement": 1890, "engagementRate": 5.9},
            {"type": "Carousel", "content": "Top 5 features of our new service", "reach": 28700, "engagement": 1456, "engagementRate": 5.1},
            {"type": "Link", "content": "Industry insights blog post", "reach": 19800, "engagement": 987, "engagementRate": 5.0},
        ],
        "contentTypes": [
            {"name": "Video", "posts": 12, "engagement": 8.2, "color": "#3b82f6"},
            {"name": "Image", "posts": 28, "engagement": 6.1, "color": "#10b981"},
            {"name": "Carousel", "posts": 8, "engagement": 7.4, "color": "#f59e0b"},
            {"name": "Link", "posts": 15, "engagement": 4.8, "color": "#ef4444"},
        ],
    }

@app.get("/instagram/overview")
def instagram_overview():
    return {
        "growthData": [
            {"week": "Week 1", "followers": 22800, "posts": 7, "engagement": 1420},
            {"week": "Week 2", "followers": 22950, "posts": 6, "engagement": 1380},
            {"week": "Week 3", "followers": 23100, "posts": 8, "engagement": 1560},
            {"week": "Week 4", "followers": 23250, "posts": 5, "engagement": 1290},
        ],
        "contentPerformance": [
            {"type": "Reels", "posts": 15, "avgLikes": 890, "avgComments": 67, "avgViews": 12400},
            {"type": "Carousel", "posts": 12, "avgLikes": 645, "avgComments": 34, "avgViews": 8900},
            {"type": "Photo", "posts": 23, "avgLikes": 523, "avgComments": 28, "avgViews": 6700},
            {"type": "IGTV", "posts": 6, "avgLikes": 412, "avgComments": 22, "avgViews": 5600},
        ],
        "hashtagPerformance": [
            {"hashtag": "#digitalmarketing", "reach": 45200, "impressions": 67800},
            {"hashtag": "#socialmedia", "reach": 38900, "impressions": 56300},
            {"hashtag": "#contentcreator", "reach": 32100, "impressions": 48700},
            {"hashtag": "#marketing", "reach": 28400, "impressions": 42600},
            {"hashtag": "#branding", "reach": 24700, "impressions": 38200},
        ],
        "audienceActivity": [
            {"hour": "06:00", "activity": 12},
            {"hour": "09:00", "activity": 35},
            {"hour": "12:00", "activity": 68},
            {"hour": "15:00", "activity": 45},
            {"hour": "18:00", "activity": 89},
            {"hour": "21:00", "activity": 92},
            {"hour": "00:00", "activity": 23},
        ],
        "storyMetrics": [
            {"name": "Views", "value": 85, "color": "#3b82f6"},
            {"name": "Exits", "value": 15, "color": "#ef4444"},
        ],
    }