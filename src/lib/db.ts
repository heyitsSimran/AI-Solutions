import { supabaseAdmin } from "./supabase";

// ============================================
// Data Structures
// ============================================

export interface Inquiry {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany: string;
  customerCountry: string;
  customerTitle: string;
  requirements: string;
  token: string;
  createdAt: string;
}

export interface Review {
  id: string;
  customerName: string;
  customerCompany: string;
  ratings: {
    usability: number;
    accuracy: number;
    support: number;
    overall: number;
  };
  comment: string;
  verified: boolean;
  createdAt: string;
}

export interface AdminMetrics {
  totalPageViews: number;
  successfulLogins: number;
  failedLogins: number;
  formSubmissionsByDate: Record<string, number>;
  pageViewsByDate: Record<string, number>;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "security";
  message: string;
}

export interface SentEmail {
  id: string;
  to: string;
  subject: string;
  body: string;
  token: string;
  timestamp: string;
}

// ============================================
// Inquiries Operations
// ============================================

export async function getInquiries(): Promise<Inquiry[]> {
  const { data, error } = await supabaseAdmin
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching inquiries:", error);
    return [];
  }

  return (data || []).map((row) => ({
    id: row.id,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    customerCompany: row.customer_company,
    customerCountry: row.customer_country,
    customerTitle: row.customer_title,
    requirements: row.requirements,
    token: row.token,
    createdAt: row.created_at,
  }));
}

export async function addInquiry(
  inquiry: Omit<Inquiry, "id" | "createdAt">
): Promise<Inquiry> {
  const { data, error } = await supabaseAdmin
    .from("inquiries")
    .insert({
      customer_name: inquiry.customerName,
      customer_email: inquiry.customerEmail,
      customer_phone: inquiry.customerPhone,
      customer_company: inquiry.customerCompany,
      customer_country: inquiry.customerCountry,
      customer_title: inquiry.customerTitle,
      requirements: inquiry.requirements,
      token: inquiry.token,
    })
    .select()
    .single();

  if (error) {
    console.error("Error adding inquiry:", error);
    throw error;
  }

  // Update submission metrics
  await incrementFormSubmissions();

  return {
    id: data.id,
    customerName: data.customer_name,
    customerEmail: data.customer_email,
    customerPhone: data.customer_phone,
    customerCompany: data.customer_company,
    customerCountry: data.customer_country,
    customerTitle: data.customer_title,
    requirements: data.requirements,
    token: data.token,
    createdAt: data.created_at,
  };
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("inquiries")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting inquiry:", error);
    return false;
  }
  return true;
}

// ============================================
// Reviews Operations
// ============================================

export async function getReviews(): Promise<Review[]> {
  const { data, error } = await supabaseAdmin
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  return (data || []).map((row) => ({
    id: row.id,
    customerName: row.customer_name,
    customerCompany: row.customer_company,
    ratings: row.ratings,
    comment: row.comment,
    verified: row.verified,
    createdAt: row.created_at,
  }));
}

export async function addReview(
  review: Omit<Review, "id" | "createdAt">
): Promise<Review> {
  const { data, error } = await supabaseAdmin
    .from("reviews")
    .insert({
      customer_name: review.customerName,
      customer_company: review.customerCompany,
      ratings: review.ratings,
      comment: review.comment,
      verified: review.verified,
    })
    .select()
    .single();

  if (error) {
    console.error("Error adding review:", error);
    throw error;
  }

  return {
    id: data.id,
    customerName: data.customer_name,
    customerCompany: data.customer_company,
    ratings: data.ratings,
    comment: data.comment,
    verified: data.verified,
    createdAt: data.created_at,
  };
}

export async function deleteReview(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("reviews")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting review:", error);
    return false;
  }
  return true;
}

// ============================================
// Metrics Operations (Data Separation: separate from inquiries)
// ============================================

export async function getMetrics(): Promise<AdminMetrics> {
  const defaultMetrics: AdminMetrics = {
    totalPageViews: 0,
    successfulLogins: 0,
    failedLogins: 0,
    formSubmissionsByDate: {},
    pageViewsByDate: {},
  };

  const { data, error } = await supabaseAdmin
    .from("admin_metrics")
    .select("metric_value")
    .eq("metric_type", "analytics")
    .single();

  if (error || !data) {
    return defaultMetrics;
  }

  return {
    totalPageViews: data.metric_value.totalPageViews || 0,
    successfulLogins: data.metric_value.successfulLogins || 0,
    failedLogins: data.metric_value.failedLogins || 0,
    formSubmissionsByDate: data.metric_value.formSubmissionsByDate || {},
    pageViewsByDate: data.metric_value.pageViewsByDate || {},
  };
}

export async function updateMetrics(
  updater: (metrics: AdminMetrics) => void
): Promise<AdminMetrics> {
  const metrics = await getMetrics();
  updater(metrics);

  const { error } = await supabaseAdmin
    .from("admin_metrics")
    .update({
      metric_value: {
        totalPageViews: metrics.totalPageViews,
        successfulLogins: metrics.successfulLogins,
        failedLogins: metrics.failedLogins,
        formSubmissionsByDate: metrics.formSubmissionsByDate,
        pageViewsByDate: metrics.pageViewsByDate,
      },
      updated_at: new Date().toISOString(),
    })
    .eq("metric_type", "analytics");

  if (error) {
    console.error("Error updating metrics:", error);
  }

  return metrics;
}

async function incrementPageViews(): Promise<void> {
  const today = new Date().toISOString().split("T")[0];
  await updateMetrics((m) => {
    m.totalPageViews += 1;
    m.pageViewsByDate[today] = (m.pageViewsByDate[today] || 0) + 1;
  });
}

async function incrementFormSubmissions(): Promise<void> {
  const today = new Date().toISOString().split("T")[0];
  await updateMetrics((m) => {
    m.formSubmissionsByDate[today] = (m.formSubmissionsByDate[today] || 0) + 1;
  });
}

// ============================================
// System Logs Operations (Data Separation: logs separate from client inquiries)
// ============================================

export async function getSystemLogs(): Promise<SystemLog[]> {
  const { data, error } = await supabaseAdmin
    .from("system_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1000);

  if (error) {
    console.error("Error fetching logs:", error);
    return [];
  }

  return (data || []).map((row) => ({
    id: row.id,
    timestamp: row.created_at,
    level: row.level,
    message: row.message,
  }));
}

export async function addSystemLog(
  level: SystemLog["level"],
  message: string
): Promise<SystemLog> {
  const { data, error } = await supabaseAdmin
    .from("system_logs")
    .insert({ level, message })
    .select()
    .single();

  if (error) {
    console.error("Error adding log:", error);
    throw error;
  }

  return {
    id: data.id,
    timestamp: data.created_at,
    level: data.level,
    message: data.message,
  };
}

export async function clearSystemLogs(): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("system_logs")
    .delete()
    .neq("id", "");

  if (error) {
    console.error("Error clearing logs:", error);
    return false;
  }
  return true;
}

// ============================================
// Mock Email Outbox Operations
// ============================================

export async function getSentEmails(): Promise<SentEmail[]> {
  const { data, error } = await supabaseAdmin
    .from("sent_emails")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching emails:", error);
    return [];
  }

  return (data || []).map((row) => ({
    id: row.id,
    to: row.to_email,
    subject: row.subject,
    body: row.body,
    token: row.token,
    timestamp: row.created_at,
  }));
}

export async function addSentEmail(
  to: string,
  subject: string,
  body: string,
  token: string
): Promise<SentEmail> {
  const { data, error } = await supabaseAdmin
    .from("sent_emails")
    .insert({
      to_email: to,
      subject,
      body,
      token,
    })
    .select()
    .single();

  if (error) {
    console.error("Error adding email:", error);
    throw error;
  }

  return {
    id: data.id,
    to: data.to_email,
    subject: data.subject,
    body: data.body,
    token: data.token,
    timestamp: data.created_at,
  };
}

// ============================================
// Conversations Operations (AI Assistant)
// ============================================

export async function addConversation(
  sessionId: string,
  role: "user" | "assistant",
  content: string
): Promise<void> {
  const { error } = await supabaseAdmin
    .from("conversations")
    .insert({ session_id: sessionId, role, content });

  if (error) {
    console.error("Error adding conversation:", error);
  }
}

export async function getConversationHistory(
  sessionId: string
): Promise<{ role: string; content: string }[]> {
  const { data, error } = await supabaseAdmin
    .from("conversations")
    .select("role, content")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })
    .limit(50);

  if (error) {
    console.error("Error fetching conversation:", error);
    return [];
  }

  return data || [];
}
