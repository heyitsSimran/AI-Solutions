-- ============================================
-- AI-Solutions Supabase Database Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. Inquiries Table (R4: Contact Form Submissions)
-- ============================================
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_company TEXT NOT NULL,
  customer_country TEXT NOT NULL,
  customer_title TEXT NOT NULL,
  requirements TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. Reviews Table (R3: Customer Reviews)
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_company TEXT NOT NULL,
  ratings JSONB NOT NULL DEFAULT '{"usability": 5, "accuracy": 5, "support": 5, "overall": 5}'::jsonb,
  comment TEXT NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. Admin Metrics Table (R5/R7: Analytics - SEPARATED from inquiries)
-- ============================================
CREATE TABLE IF NOT EXISTS admin_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_type TEXT NOT NULL UNIQUE,
  metric_value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default metrics
INSERT INTO admin_metrics (metric_type, metric_value) 
VALUES ('analytics', '{"totalPageViews": 0, "successfulLogins": 0, "failedLogins": 0, "formSubmissionsByDate": {}, "pageViewsByDate": {}}'::jsonb)
ON CONFLICT (metric_type) DO NOTHING;

-- ============================================
-- 4. System Logs Table (R5: Backend Log Files)
-- ============================================
CREATE TABLE IF NOT EXISTS system_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  level TEXT NOT NULL CHECK (level IN ('info', 'warning', 'error', 'security')),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. Sent Emails Table (R8: Email Confirmation Log)
-- ============================================
CREATE TABLE IF NOT EXISTS sent_emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  to_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  token TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. Conversations Table (AI Assistant History)
-- ============================================
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Indexes for Performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_system_logs_created_at ON system_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_system_logs_level ON system_logs(level);
CREATE INDEX IF NOT EXISTS idx_sent_emails_created_at ON sent_emails(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_session_id ON conversations(session_id);

-- ============================================
-- RLS Policies (Security)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sent_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Inquiries: Only authenticated admin can read, anyone can insert
CREATE POLICY "Anyone can insert inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can read inquiries" ON inquiries
  FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Service role can delete inquiries" ON inquiries
  FOR DELETE USING (auth.role() = 'service_role');

-- Reviews: Anyone can read and insert, admin can delete
CREATE POLICY "Anyone can read reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert reviews" ON reviews
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can delete reviews" ON reviews
  FOR DELETE USING (auth.role() = 'service_role');

-- Admin Metrics: Only service role can access
CREATE POLICY "Service role can manage metrics" ON admin_metrics
  FOR ALL USING (auth.role() = 'service_role');

-- System Logs: Only service role can access
CREATE POLICY "Service role can manage logs" ON system_logs
  FOR ALL USING (auth.role() = 'service_role');

-- Sent Emails: Only service role can access
CREATE POLICY "Service role can manage emails" ON sent_emails
  FOR ALL USING (auth.role() = 'service_role');

-- Conversations: Service role can manage
CREATE POLICY "Service role can manage conversations" ON conversations
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- Functions for Metrics Updates
-- ============================================

-- Function to update metrics atomically
CREATE OR REPLACE FUNCTION update_metric(
  p_metric_type TEXT,
  p_updates JSONB
)
RETURNS VOID AS $$
BEGIN
  UPDATE admin_metrics
  SET metric_value = metric_value || p_updates,
      updated_at = NOW()
  WHERE metric_type = p_metric_type;
END;
$$ LANGUAGE plpgsql;

-- Function to increment page views
CREATE OR REPLACE FUNCTION increment_page_views()
RETURNS VOID AS $$
DECLARE
  today_date TEXT;
BEGIN
  today_date := TO_CHAR(NOW(), 'YYYY-MM-DD');
  UPDATE admin_metrics
  SET metric_value = jsonb_set(
    metric_value,
    '{totalPageViews}',
    ((metric_value->>'totalPageViews')::int + 1)::text::jsonb
  ),
  metric_value = jsonb_set(
    metric_value,
    '{pageViewsByDate, ' || today_date || '}',
    COALESCE((metric_value->'pageViewsByDate'->>today_date)::int + 1, 1)::text::jsonb
  ),
  updated_at = NOW()
  WHERE metric_type = 'analytics';
END;
$$ LANGUAGE plpgsql;

-- Function to increment form submissions
CREATE OR REPLACE FUNCTION increment_form_submissions()
RETURNS VOID AS $$
DECLARE
  today_date TEXT;
BEGIN
  today_date := TO_CHAR(NOW(), 'YYYY-MM-DD');
  UPDATE admin_metrics
  SET metric_value = jsonb_set(
    metric_value,
    '{formSubmissionsByDate, ' || today_date || '}',
    COALESCE((metric_value->'formSubmissionsByDate'->>today_date)::int + 1, 1)::text::jsonb
  ),
  updated_at = NOW()
  WHERE metric_type = 'analytics';
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Grant permissions for API access
-- ============================================
GRANT SELECT ON inquiries TO anon;
GRANT INSERT ON inquiries TO anon;
GRANT SELECT ON reviews TO anon;
GRANT INSERT ON reviews TO anon;
GRANT SELECT ON system_logs TO anon;
GRANT SELECT ON sent_emails TO anon;
GRANT SELECT ON admin_metrics TO anon;
