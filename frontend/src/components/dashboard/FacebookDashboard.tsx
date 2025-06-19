from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
from typing import Optional, List, Dict, Any
import pandas as pd

# Asumiendo que estos archivos están en el mismo directorio o PYTHONPATH está configurado
from utils import query_ga
from data_processing import (
    get_facebook_posts, process_facebook_posts,
    get_instagram_posts, process_instagram_posts
)
from ai import get_openai_response # Asegúrate que esta función exista y funcione como se espera
import config # Para FB_ACCESS_TOKEN, GA_PROPERTY_ID, etc.

app = FastAPI(title="SkyIntel API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción, especifica tus dominios de frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def format_date_params(start_date_str: Optional[str], end_date_str: Optional[str]) -> tuple[str, str]:
    """Helper para formatear fechas o usar defaults."""
    if end_date_str:
        end_date = pd.to_datetime(end_date_str).strftime('%Y-%m-%d')
    else:
        end_date = datetime.now().strftime('%Y-%m-%d')

    if start_date_str:
        start_date = pd.to_datetime(start_date_str).strftime('%Y-%m-%d')
    else:
        start_date = (datetime.now() - timedelta(days=30)).strftime('%Y-%m-%d')
    return start_date, end_date

@app.get("/ga/overview")
def ga_overview_endpoint(start_date_param: Optional[str] = Query(None, alias="startDate"), 
                         end_date_param: Optional[str] = Query(None, alias="endDate")):
    start_date, end_date = format_date_params(start_date_param, end_date_param)

    # Traffic Data (ejemplo, ajusta métricas y dimensiones según necesites)
    df_traffic = query_ga(
        metrics=['sessions', 'activeUsers', 'screenPageViews'], 
        dimensions=['date'], 
        start_date=start_date, 
        end_date=end_date
    )
    # Renombrar para coincidir con el frontend si es necesario, ej: 'screenPageViews' a 'pageviews'
    # df_traffic.rename(columns={'activeUsers': 'users', 'screenPageViews': 'pageviews'}, inplace=True)
    traffic_data = df_traffic.to_dict(orient='records') if not df_traffic.empty else []
    
    # Device Data
    df_device = query_ga(metrics=['activeUsers'], dimensions=['deviceCategory'], start_date=start_date, end_date=end_date)
    # Asignar colores como en los datos dummy
    device_colors = {"desktop": "#10b981", "mobile": "#3b82f6", "tablet": "#f59e0b"}
    device_data = []
    if not df_device.empty:
        for _, row in df_device.iterrows():
            device_data.append({
                "name": row['deviceCategory'], 
                "value": row['activeUsers'], 
                "color": device_colors.get(row['deviceCategory'].lower(), "#cccccc")
            })

    # Top Pages
    df_pages = query_ga(metrics=['screenPageViews', 'bounceRate'], dimensions=['pagePath'], start_date=start_date, end_date=end_date)
    # df_pages['bounceRate'] = df_pages['bounceRate'] * 100 # GA4 bounceRate es 0-1
    top_pages_data = df_pages.sort_values(by='screenPageViews', ascending=False).head(10).to_dict(orient='records') if not df_pages.empty else []
    if top_pages_data: # Asegurar que bounceRate sea un porcentaje si es necesario
        for page in top_pages_data: page['bounceRate'] = round(page.get('bounceRate', 0) * 100, 2)


    # Conversion Goals (esto es más complejo, GA4 usa eventos. Necesitarías definir tus eventos de conversión)
    # Ejemplo placeholder, necesitarás adaptar esto a tus eventos de conversión en GA4
    df_conversions = query_ga(metrics=['conversions'], dimensions=['eventName'], start_date=start_date, end_date=end_date)
    conversion_goals_data = []
    if not df_conversions.empty:
        for _, row in df_conversions.iterrows():
            conversion_goals_data.append({
                "goal": row['eventName'], 
                "completions": row['conversions'], 
                "rate": 0 # Necesitarías calcular la tasa basada en sesiones o usuarios
            })
    
    chart_data = {
        "trafficData": traffic_data,
        "deviceData": device_data,
        "topPages": top_pages_data,
        "conversionGoals": conversion_goals_data,
    }

    ai_context = f"Google Analytics data for period {start_date} to {end_date}. Traffic: {len(traffic_data)} data points. Devices: {len(device_data)} categories. Top pages: {len(top_pages_data)} pages. Conversions: {len(conversion_goals_data)} goals."
    ai_insight = "AI Insight for GA Overview (placeholder - implement get_openai_response)"
    try:
        ai_insight = get_openai_response("Provide an overview and key actions based on this Google Analytics data.", ai_context)
    except Exception as e:
        print(f"Error getting AI insight for GA: {e}")


    return {"chartData": chart_data, "aiInsight": ai_insight}

@app.get("/ads/overview")
def ads_overview_endpoint(start_date_param: Optional[str] = Query(None, alias="startDate"), 
                          end_date_param: Optional[str] = Query(None, alias="endDate")):
    # TODO: Implementar lógica para obtener datos reales de Google Ads
    # Por ahora, se devuelven datos dummy con la nueva estructura
    start_date, end_date = format_date_params(start_date_param, end_date_param)
    
    dummy_chart_data = {
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
    ai_insight = f"AI Insight for Ads Overview (placeholder for period {start_date} to {end_date})"
    return {"chartData": dummy_chart_data, "aiInsight": ai_insight}

@app.get("/facebook/overview")
def facebook_overview_endpoint(start_date_param: Optional[str] = Query(None, alias="startDate"), 
                               end_date_param: Optional[str] = Query(None, alias="endDate")):
    start_date, end_date = format_date_params(start_date_param, end_date_param)
    start_date_dt = pd.to_datetime(start_date)
    end_date_dt = pd.to_datetime(end_date)

    try:
        # Asegúrate de que config.FB_FACEBOOK_PAGE_ID esté definido
        # Si config.py no tiene FB_FACEBOOK_PAGE_ID, esto fallará.
        # Deberías añadirlo a config.py o manejar el error apropiadamente.
        page_id = getattr(config, 'FB_FACEBOOK_PAGE_ID', None)
        if not page_id:
            raise ValueError("FB_FACEBOOK_PAGE_ID no está configurado en config.py")

        raw_posts = get_facebook_posts(page_id) 
        df_fb_posts = process_facebook_posts(raw_posts)
        
        if not df_fb_posts.empty and 'created_time' in df_fb_posts.columns:
            df_fb_posts['created_time'] = pd.to_datetime(df_fb_posts['created_time'])
            df_fb_posts_filtered = df_fb_posts[
                (df_fb_posts['created_time'] >= start_date_dt) & 
                (df_fb_posts['created_time'] <= end_date_dt)
            ]
        else:
            df_fb_posts_filtered = pd.DataFrame(columns=df_fb_posts.columns if not df_fb_posts.empty else ['created_time', 'likes_count', 'comments_count', 'shares_count', 'impressions', 'message'])


        # Transformar datos al formato esperado por el frontend
        engagement_data = []
        if not df_fb_posts_filtered.empty:
            daily_engagement = df_fb_posts_filtered.groupby(df_fb_posts_filtered['created_time'].dt.date).agg(
                likes=('likes_count', 'sum'),
                comments=('comments_count', 'sum'),
                shares=('shares_count', 'sum'),
                reach=('impressions', 'sum') 
            ).reset_index()
            for _, row in daily_engagement.iterrows():
                engagement_data.append({
                    "date": row['created_time'].strftime('%Y-%m-%d'),
                    "likes": int(row['likes']),
                    "comments": int(row['comments']),
                    "shares": int(row['shares']),
                    "reach": int(row['reach'])
                })
        
        audience_insights_data = [{"age": "25-34", "percentage": 35, "color": "#10b981"}] 
        
        top_posts_data = []
        if not df_fb_posts_filtered.empty:
            top_posts_df = df_fb_posts_filtered.sort_values(by='impressions', ascending=False).head(5)
            for _, row in top_posts_df.iterrows():
                engagement_value = row.get('likes_count',0) + row.get('comments_count',0) + row.get('shares_count',0)
                engagement_rate_value = (engagement_value / row.get('impressions', 1)) * 100 if row.get('impressions', 0) > 0 else 0
                top_posts_data.append({
                    "type": "Post", 
                    "content": row.get('message', '')[:100], 
                    "reach": int(row.get('impressions', 0)),
                    "engagement": int(engagement_value),
                    "engagementRate": round(engagement_rate_value, 2)
                })

        content_types_data = [{"name": "Image", "posts": len(df_fb_posts_filtered), "engagement": 0, "color": "#10b981"}] 

        chart_data = {
            "engagementData": engagement_data,
            "audienceInsights": audience_insights_data,
            "topPosts": top_posts_data,
            "contentTypes": content_types_data,
        }
        ai_context = f"Facebook data from {start_date} to {end_date}. Posts: {len(df_fb_posts_filtered)}. Total likes: {df_fb_posts_filtered['likes_count'].sum() if not df_fb_posts_filtered.empty else 0}."
        ai_insight = "AI Insight for Facebook (placeholder)"
        try:
            ai_insight = get_openai_response("Provide an overview and key actions based on this Facebook data.", ai_context)
        except Exception as e:
            print(f"Error getting AI insight for Facebook: {e}")
        
        return {"chartData": chart_data, "aiInsight": ai_insight}

    except Exception as e:
        print(f"Error in facebook_overview_endpoint: {e}")
        return {"chartData": {"engagementData": [], "audienceInsights": [], "topPosts": [], "contentTypes": []}, "aiInsight": f"Error fetching Facebook data: {str(e)}"}


@app.get("/instagram/overview")
def instagram_overview_endpoint(start_date_param: Optional[str] = Query(None, alias="startDate"), 
                                end_date_param: Optional[str] = Query(None, alias="endDate")):
    start_date, end_date = format_date_params(start_date_param, end_date_param)
    start_date_dt = pd.to_datetime(start_date)
    end_date_dt = pd.to_datetime(end_date)

    try:
        # Asegúrate de que config.FB_INSTAGRAM_BUSINESS_ACCOUNT_ID esté definido
        ig_id = getattr(config, 'FB_INSTAGRAM_BUSINESS_ACCOUNT_ID', None)
        if not ig_id:
            raise ValueError("FB_INSTAGRAM_BUSINESS_ACCOUNT_ID no está configurado en config.py")

        raw_media = get_instagram_posts(ig_id)
        df_ig_media = process_instagram_posts(raw_media)

        if not df_ig_media.empty and 'timestamp' in df_ig_media.columns:
            df_ig_media['timestamp'] = pd.to_datetime(df_ig_media['timestamp'])
            df_ig_media_filtered = df_ig_media[
                (df_ig_media['timestamp'] >= start_date_dt) & 
                (df_ig_media['timestamp'] <= end_date_dt)
            ]
        else:
            df_ig_media_filtered = pd.DataFrame(columns=df_ig_media.columns if not df_ig_media.empty else ['timestamp', 'id', 'engagement', 'media_type', 'like_count', 'comments_count', 'video_views'])


        growth_data = [] 
        if not df_ig_media_filtered.empty:
            weekly_posts = df_ig_media_filtered.groupby(pd.Grouper(key='timestamp', freq='W-MON')).agg(
                posts=('id', 'count'),
                engagement=('engagement', 'sum') 
            ).reset_index()
            for i, row in weekly_posts.iterrows():
                growth_data.append({
                    "week": f"Week {row['timestamp'].isocalendar()[1]} ({row['timestamp'].strftime('%Y-%m-%d')})", # Usar número de semana ISO
                    "followers": 0, 
                    "posts": int(row['posts']),
                    "engagement": int(row['engagement'])
                })

        content_performance_data = []
        if not df_ig_media_filtered.empty:
            performance_by_type = df_ig_media_filtered.groupby('media_type').agg(
                posts=('id', 'count'),
                avgLikes=('like_count', 'mean'),
                avgComments=('comments_count', 'mean'),
                avgViews=('video_views', 'mean') 
            ).reset_index()
            for _, row in performance_by_type.iterrows():
                content_performance_data.append({
                    "type": row['media_type'],
                    "posts": int(row['posts']),
                    "avgLikes": int(round(row['avgLikes'] or 0, 0)),
                    "avgComments": int(round(row['avgComments'] or 0, 0)),
                    "avgViews": int(round(row['avgViews'] or 0, 0))
                })
        
        hashtag_performance_data = [{"hashtag": "#example", "reach": 1000, "impressions": 1500}] 
        audience_activity_data = [{"hour": "18:00", "activity": 89}] 
        story_metrics_data = [{"name": "Views", "value": 0, "color": "#3b82f6"}] 

        chart_data = {
            "growthData": growth_data,
            "contentPerformance": content_performance_data,
            "hashtagPerformance": hashtag_performance_data,
            "audienceActivity": audience_activity_data,
            "storyMetrics": story_metrics_data,
        }
        ai_context = f"Instagram data from {start_date} to {end_date}. Media items: {len(df_ig_media_filtered)}. Total likes: {df_ig_media_filtered['like_count'].sum() if not df_ig_media_filtered.empty else 0}."
        ai_insight = "AI Insight for Instagram (placeholder)"
        try:
            ai_insight = get_openai_response("Provide an overview and key actions based on this Instagram data.", ai_context)
        except Exception as e:
            print(f"Error getting AI insight for Instagram: {e}")

        return {"chartData": chart_data, "aiInsight": ai_insight}

    except Exception as e:
        print(f"Error in instagram_overview_endpoint: {e}")
        return {"chartData": {"growthData": [], "contentPerformance": [], "hashtagPerformance": [], "audienceActivity": [], "storyMetrics": []}, "aiInsight": f"Error fetching Instagram data: {str(e)}"}

@app.get("/api/overview/all")
def overall_overview_endpoint(start_date_param: Optional[str] = Query(None, alias="startDate"), 
                              end_date_param: Optional[str] = Query(None, alias="endDate")):
    start_date, end_date = format_date_params(start_date_param, end_date_param)
    start_date_dt = pd.to_datetime(start_date)
    end_date_dt = pd.to_datetime(end_date)

    # --- Google Analytics Summary ---
    ga_sessions = 0
    ga_users = 0
    ga_conversions = 0
    try:
        df_ga_summary = query_ga(metrics=['sessions', 'activeUsers', 'conversions'], dimensions=[], start_date=start_date, end_date=end_date)
        if not df_ga_summary.empty:
            ga_sessions = int(df_ga_summary['sessions'].sum())
            ga_users = int(df_ga_summary['activeUsers'].sum())
            ga_conversions = int(df_ga_summary['conversions'].sum())
    except Exception as e:
        print(f"Error fetching GA summary for overall overview: {e}")

    # --- Facebook Summary ---
    fb_total_impressions = 0
    fb_total_likes = 0
    try:
        page_id = getattr(config, 'FB_FACEBOOK_PAGE_ID', None)
        if page_id:
            raw_fb_posts = get_facebook_posts(page_id)
            df_fb_posts = process_facebook_posts(raw_fb_posts)
            if not df_fb_posts.empty and 'created_time' in df_fb_posts.columns:
                df_fb_posts['created_time'] = pd.to_datetime(df_fb_posts['created_time'])
                df_fb_filtered = df_fb_posts[
                    (df_fb_posts['created_time'] >= start_date_dt) & 
                    (df_fb_posts['created_time'] <= end_date_dt)
                ]
                if not df_fb_filtered.empty:
                    fb_total_impressions = int(df_fb_filtered['impressions'].sum())
                    fb_total_likes = int(df_fb_filtered['likes_count'].sum())
    except Exception as e:
        print(f"Error fetching Facebook summary for overall overview: {e}")

    # --- Instagram Summary ---
    ig_total_impressions = 0
    ig_total_likes = 0
    try:
        ig_id = getattr(config, 'FB_INSTAGRAM_BUSINESS_ACCOUNT_ID', None)
        if ig_id:
            raw_ig_media = get_instagram_posts(ig_id)
            df_ig_media = process_instagram_posts(raw_ig_media)
            if not df_ig_media.empty and 'timestamp' in df_ig_media.columns:
                df_ig_media['timestamp'] = pd.to_datetime(df_ig_media['timestamp'])
                df_ig_filtered = df_ig_media[
                    (df_ig_media['timestamp'] >= start_date_dt) & 
                    (df_ig_media['timestamp'] <= end_date_dt)
                ]
                if not df_ig_filtered.empty:
                    ig_total_impressions = int(df_ig_filtered['impressions'].sum())
                    ig_total_likes = int(df_ig_filtered['like_count'].sum())
    except Exception as e:
        print(f"Error fetching Instagram summary for overall overview: {e}")
    
    # --- Ads Summary (Dummy) ---
    ads_total_spend = 1500 # Placeholder
    ads_total_conversions = 50 # Placeholder

    # Estructura similar a lovable.dev (simplificada)
    overview_data = {
        "kpis": [
            {"title": "Website Sessions (GA)", "value": f"{ga_sessions:,}", "period": f"{start_date} to {end_date}"},
            {"title": "Website Users (GA)", "value": f"{ga_users:,}", "period": f"{start_date} to {end_date}"},
            {"title": "Website Conversions (GA)", "value": f"{ga_conversions:,}", "period": f"{start_date} to {end_date}"},
            {"title": "Facebook Impressions", "value": f"{fb_total_impressions:,}", "period": f"{start_date} to {end_date}"},
            {"title": "Facebook Likes", "value": f"{fb_total_likes:,}", "period": f"{start_date} to {end_date}"},
            {"title": "Instagram Impressions", "value": f"{ig_total_impressions:,}", "period": f"{start_date} to {end_date}"},
            {"title": "Instagram Likes", "value": f"{ig_total_likes:,}", "period": f"{start_date} to {end_date}"},
            {"title": "Ads Spend", "value": f"${ads_total_spend:,}", "period": f"{start_date} to {end_date}"}, # Dummy
            {"title": "Ads Conversions", "value": f"{ads_total_conversions:,}", "period": f"{start_date} to {end_date}"}, # Dummy
        ],
        "charts": [] # Podrías añadir pequeños gráficos de tendencia aquí si es necesario
    }

    ai_context = (
        f"Overall business performance from {start_date} to {end_date}. "
        f"GA: Sessions={ga_sessions}, Users={ga_users}, Conversions={ga_conversions}. "
        f"Facebook: Impressions={fb_total_impressions}, Likes={fb_total_likes}. "
        f"Instagram: Impressions={ig_total_impressions}, Likes={ig_total_likes}. "
        f"Ads: Spend=${ads_total_spend}, Conversions={ads_total_conversions}."
    )
    ai_insight = "Overall AI Insight (placeholder)"
    try:
        ai_insight = get_openai_response("Provide a high-level summary of business performance and suggest one key strategic action.", ai_context)
    except Exception as e:
        print(f"Error getting AI insight for overall overview: {e}")

    return {"overviewData": overview_data, "aiInsight": ai_insight}