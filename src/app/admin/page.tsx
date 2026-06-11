"use client";

import { useState, useEffect } from "react";
import AnalyticsCharts from "@/components/AnalyticsCharts";

interface Inquiry {
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

interface AdminMetrics {
  totalPageViews: number;
  successfulLogins: number;
  failedLogins: number;
  formSubmissionsByDate: Record<string, number>;
  pageViewsByDate: Record<string, number>;
}

interface SystemLog {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "security";
  message: string;
}

interface SentEmail {
  id: string;
  to: string;
  subject: string;
  body: string;
  token: string;
  timestamp: string;
}

interface Review {
  id: string;
  customerName: string;
  customerCompany: string;
  ratings: { usability: number; accuracy: number; support: number; overall: number };
  comment: string;
  verified: boolean;
  createdAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [metrics, setMetrics] = useState<AdminMetrics>({
    totalPageViews: 0,
    successfulLogins: 0,
    failedLogins: 0,
    formSubmissionsByDate: {},
    pageViewsByDate: {},
  });
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [sentEmails, setSentEmails] = useState<SentEmail[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<"inquiries" | "reviews" | "metrics" | "logs" | "emails">("inquiries");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: string; id: string } | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    } else {
      checkSession();
    }
  }, [isAuthenticated]);

  const checkSession = async () => {
    try {
      const res = await fetch("/api/admin/data");
      if (res.ok) {
        setIsAuthenticated(true);
      }
    } catch (e) {
      // Not logged in
    }
  };

  const loadDashboardData = async () => {
    try {
      const res = await fetch("/api/admin/data");
      const result = await res.json();
      if (res.ok && result.success) {
        setInquiries(result.data.inquiries || []);
        setMetrics(result.data.metrics || {
          totalPageViews: 0,
          successfulLogins: 0,
          failedLogins: 0,
          formSubmissionsByDate: {},
          pageViewsByDate: {},
        });
        setLogs(result.data.logs || []);
        setSentEmails(result.data.sentEmails || []);
        setReviews(result.data.reviews || []);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPassword("");
      } else {
        setLoginError(data.error || "Authentication failed");
      }
    } catch (err) {
      setLoginError("Connection failed");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setIsAuthenticated(false);
      setInquiries([]);
      setLogs([]);
      setSentEmails([]);
      setReviews([]);
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "inquiry", id }),
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
        setSelectedInquiry(null);
        setDeleteConfirm(null);
      }
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    }
  };

  const handleDeleteReview = async (id: string) => {
    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "review", id }),
      });
      if (res.ok) {
        setReviews((prev) => prev.filter((rev) => rev.id !== id));
        setSelectedReview(null);
        setDeleteConfirm(null);
      }
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };

  const handleClearLogs = async () => {
    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "logs" }),
      });
      if (res.ok) {
        setLogs([]);
      }
    } catch (err) {
      console.error("Failed to clear logs:", err);
    }
  };

  const handleExportData = (type: string) => {
    let data: any;
    let filename: string;

    switch (type) {
      case "inquiries":
        data = inquiries;
        filename = "inquiries_export.json";
        break;
      case "reviews":
        data = reviews;
        filename = "reviews_export.json";
        break;
      case "logs":
        data = logs;
        filename = "logs_export.json";
        break;
      case "emails":
        data = sentEmails;
        filename = "emails_export.json";
        break;
      default:
        return;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 sm:px-6">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-xl">
          <div className="text-center mb-6">
            <span className="inline-flex w-10 h-10 rounded-full bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 items-center justify-center mb-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </span>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Admin Console Access</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Protected by secure cryptographic hashing protocols. Unverified attempts are logged.
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="user" className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Username</label>
              <input id="user" type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 bg-transparent dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500 text-zinc-900 dark:text-zinc-50" />
            </div>
            <div>
              <label htmlFor="pass" className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Password</label>
              <input id="pass" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 bg-transparent dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500 text-zinc-900 dark:text-zinc-50" />
            </div>
            {loginError && <p className="text-xs font-semibold text-rose-600" role="alert">{loginError}</p>}
            <button type="submit" disabled={loginLoading} className="w-full py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-colors disabled:opacity-50">
              {loginLoading ? "Verifying Hash..." : "Authenticate Session"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      {/* Header bar */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50">Admin Control Panel</h1>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-250/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            Data Separation Active
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-350">
            Role: <span className="font-bold">System Administrator</span>
          </span>
          <button type="button" onClick={handleLogout} className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors">
            Logout
          </button>
        </div>
      </header>

      {/* Workspace Wrapper */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Core Quick stats widgets */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="block text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Total Inquiries</span>
            <span className="block text-3xl font-black text-zinc-900 dark:text-zinc-50 mt-1">{inquiries.length}</span>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="block text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Total Reviews</span>
            <span className="block text-3xl font-black text-zinc-900 dark:text-zinc-50 mt-1">{reviews.length}</span>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="block text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Page Views</span>
            <span className="block text-3xl font-black text-zinc-900 dark:text-zinc-50 mt-1">{metrics.totalPageViews}</span>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="block text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Successful Logins</span>
            <span className="block text-3xl font-black text-zinc-900 dark:text-zinc-50 mt-1">{metrics.successfulLogins}</span>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="block text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Failed Logins</span>
            <span className="block text-3xl font-black text-rose-600 dark:text-rose-400 mt-1">{metrics.failedLogins}</span>
          </div>
        </div>

        {/* Dashboard Tabs menu */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto" role="tablist" aria-label="Dashboard views">
          {[
            { id: "inquiries", label: `Inquiries (${inquiries.length})` },
            { id: "reviews", label: `Reviews (${reviews.length})` },
            { id: "metrics", label: "Analytics" },
            { id: "logs", label: `Logs (${logs.length})` },
            { id: "emails", label: `Emails (${sentEmails.length})` },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 text-sm font-semibold border-b-2 transition-all focus:outline-none whitespace-nowrap ${
                  active ? "border-violet-600 text-violet-600 dark:text-violet-400" : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Display area */}
        <div className="flex-1 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm min-h-[400px]">
          
          {/* Tab 1: Inquiries Panel */}
          {activeTab === "inquiries" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Customer Inquiry Logs</h2>
                <div className="flex gap-2">
                  <button onClick={() => handleExportData("inquiries")} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors">
                    Export JSON
                  </button>
                </div>
              </div>
              {inquiries.length === 0 ? (
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">No prospective customer inquiries registered.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-left text-sm text-zinc-600 dark:text-zinc-300">
                    <thead className="bg-zinc-50 dark:bg-zinc-800/40 text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400">
                      <tr>
                        <th className="px-4 py-3">Token</th>
                        <th className="px-4 py-3">Customer Details</th>
                        <th className="px-4 py-3">Company / Title</th>
                        <th className="px-4 py-3">Project Requirements</th>
                        <th className="px-4 py-3">Submitted</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                      {inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20">
                          <td className="px-4 py-4 font-mono font-bold text-violet-600 dark:text-violet-400 text-xs">{inq.token}</td>
                          <td className="px-4 py-4">
                            <div className="font-bold text-zinc-900 dark:text-zinc-100">{inq.customerName}</div>
                            <div className="text-xs text-zinc-400">{inq.customerEmail}</div>
                            <div className="text-xs text-zinc-400">{inq.customerPhone}</div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="font-semibold text-zinc-800 dark:text-zinc-200">{inq.customerCompany}</div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">{inq.customerTitle} | {inq.customerCountry}</div>
                          </td>
                          <td className="px-4 py-4 max-w-xs">
                            <p className="text-xs line-clamp-3 text-zinc-600 dark:text-zinc-300" title={inq.requirements}>{inq.requirements}</p>
                          </td>
                          <td className="px-4 py-4 text-xs text-zinc-400 whitespace-nowrap">{new Date(inq.createdAt).toLocaleDateString()}</td>
                          <td className="px-4 py-4">
                            <div className="flex gap-2">
                              <button onClick={() => setSelectedInquiry(inq)} className="text-xs text-violet-600 hover:text-violet-700 font-semibold">View</button>
                              <button onClick={() => setDeleteConfirm({ type: "inquiry", id: inq.id })} className="text-xs text-rose-600 hover:text-rose-700 font-semibold">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Reviews Panel */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Customer Reviews Management</h2>
                <button onClick={() => handleExportData("reviews")} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors">
                  Export JSON
                </button>
              </div>
              {reviews.length === 0 ? (
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">No reviews submitted yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-zinc-900 dark:text-zinc-100">{rev.customerName}</h4>
                          <span className="text-xs text-zinc-400">{rev.customerCompany}</span>
                        </div>
                        {rev.verified && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">Verified</span>
                        )}
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 italic mb-3">&ldquo;{rev.comment}&rdquo;</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-0.5 text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg key={i} className={`w-3.5 h-3.5 ${i < rev.ratings.overall ? "fill-current" : "text-zinc-200 dark:text-zinc-800"}`} viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setSelectedReview(rev)} className="text-xs text-violet-600 hover:text-violet-700 font-semibold">View</button>
                          <button onClick={() => setDeleteConfirm({ type: "review", id: rev.id })} className="text-xs text-rose-600 hover:text-rose-700 font-semibold">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Analytics Visualization */}
          {activeTab === "metrics" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Dynamic Submission Peaks & View Trends</h2>
                <button onClick={() => handleExportData("logs")} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors">
                  Export Metrics
                </button>
              </div>
              <AnalyticsCharts metrics={metrics} />
            </div>
          )}

          {/* Tab 4: System Logs Panel */}
          {activeTab === "logs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Authorized Backend Log Files</h2>
                <div className="flex gap-2">
                  <button onClick={() => handleExportData("logs")} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors">
                    Export JSON
                  </button>
                  <button onClick={handleClearLogs} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-100 hover:bg-rose-200 dark:bg-rose-900/30 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-400 transition-colors">
                    Clear All Logs
                  </button>
                </div>
              </div>
              {logs.length === 0 ? (
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">No system logs logged yet.</p>
              ) : (
                <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs max-h-[500px] overflow-y-auto space-y-2.5">
                  {logs.slice().reverse().map((log) => {
                    let levelColor = "text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400";
                    if (log.level === "warning") levelColor = "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400";
                    if (log.level === "security") levelColor = "text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400";
                    if (log.level === "error") levelColor = "text-red-700 bg-red-50 dark:bg-red-950/40 dark:text-red-400";
                    return (
                      <div key={log.id} className="flex flex-col sm:flex-row sm:items-center gap-2 border-b border-zinc-200/40 dark:border-zinc-800/50 pb-2">
                        <span className="text-zinc-400 font-semibold flex-shrink-0">[{new Date(log.timestamp).toLocaleString()}]</span>
                        <span className={`px-2 py-0.5 rounded font-bold uppercase text-[9px] flex-shrink-0 text-center ${levelColor}`}>{log.level}</span>
                        <span className="text-zinc-700 dark:text-zinc-300 break-all leading-normal">{log.message}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Tab 5: Emails Panel */}
          {activeTab === "emails" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Simulated Confirmation Outbox</h2>
                <button onClick={() => handleExportData("emails")} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors">
                  Export JSON
                </button>
              </div>
              {sentEmails.length === 0 ? (
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">No confirmation emails dispatched yet.</p>
              ) : (
                <div className="space-y-6">
                  {sentEmails.slice().reverse().map((eml) => (
                    <div key={eml.id} className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-3 gap-2">
                        <div>
                          <span className="block text-xs font-bold text-zinc-400">Recipients:</span>
                          <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{eml.to}</span>
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-zinc-400 text-right">Dispatched:</span>
                          <span className="text-xs text-zinc-500">{new Date(eml.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="block text-xs font-bold text-zinc-400 mb-1">Subject:</span>
                        <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">{eml.subject}</span>
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-zinc-400 mb-1.5">Email Body:</span>
                        <pre className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed text-zinc-700 dark:text-zinc-300">{eml.body}</pre>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setSelectedInquiry(null)}>
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Inquiry Details</h3>
              <button onClick={() => setSelectedInquiry(null)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><span className="text-xs font-bold text-zinc-400 uppercase">Token</span><p className="font-mono font-bold text-violet-600">{selectedInquiry.token}</p></div>
                <div><span className="text-xs font-bold text-zinc-400 uppercase">Date</span><p className="text-sm">{new Date(selectedInquiry.createdAt).toLocaleString()}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><span className="text-xs font-bold text-zinc-400 uppercase">Name</span><p className="font-semibold">{selectedInquiry.customerName}</p></div>
                <div><span className="text-xs font-bold text-zinc-400 uppercase">Email</span><p className="text-sm">{selectedInquiry.customerEmail}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><span className="text-xs font-bold text-zinc-400 uppercase">Phone</span><p className="text-sm">{selectedInquiry.customerPhone}</p></div>
                <div><span className="text-xs font-bold text-zinc-400 uppercase">Company</span><p className="font-semibold">{selectedInquiry.customerCompany}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><span className="text-xs font-bold text-zinc-400 uppercase">Country</span><p className="text-sm">{selectedInquiry.customerCountry}</p></div>
                <div><span className="text-xs font-bold text-zinc-400 uppercase">Title</span><p className="text-sm">{selectedInquiry.customerTitle}</p></div>
              </div>
              <div><span className="text-xs font-bold text-zinc-400 uppercase">Requirements</span><p className="text-sm mt-1 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl">{selectedInquiry.requirements}</p></div>
            </div>
          </div>
        </div>
      )}

      {/* Review Detail Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setSelectedReview(null)}>
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Review Details</h3>
              <button onClick={() => setSelectedReview(null)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-4">
              <div><span className="text-xs font-bold text-zinc-400 uppercase">Customer</span><p className="font-semibold">{selectedReview.customerName} | {selectedReview.customerCompany}</p></div>
              <div><span className="text-xs font-bold text-zinc-400 uppercase">Ratings</span>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {Object.entries(selectedReview.ratings).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-950 p-2 rounded-lg">
                      <span className="text-xs capitalize text-zinc-500">{key}</span>
                      <span className="text-sm font-bold text-violet-600">{val}/5</span>
                    </div>
                  ))}
                </div>
              </div>
              <div><span className="text-xs font-bold text-zinc-400 uppercase">Comment</span><p className="text-sm mt-1 italic bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl">&ldquo;{selectedReview.comment}&rdquo;</p></div>
              <div><span className="text-xs font-bold text-zinc-400 uppercase">Verified</span><p className="text-sm mt-1">{selectedReview.verified ? "Yes" : "No"}</p></div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Confirm Deletion</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
              Are you sure you want to delete this {deleteConfirm.type}? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg text-sm font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors">
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteConfirm.type === "inquiry") handleDeleteInquiry(deleteConfirm.id);
                  else if (deleteConfirm.type === "review") handleDeleteReview(deleteConfirm.id);
                }}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
