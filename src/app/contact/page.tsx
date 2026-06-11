"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [title, setTitle] = useState("");
  const [requirements, setRequirements] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successToken, setSuccessToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessToken(null);
    setCopied(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          customerCompany: company,
          customerCountry: country,
          customerTitle: title,
          requirements: requirements,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessToken(data.token);
        setName("");
        setEmail("");
        setPhone("");
        setCompany("");
        setCountry("");
        setTitle("");
        setRequirements("");
      } else {
        setError(data.error || "Failed to submit inquiry form");
      }
    } catch (err) {
      console.error("Submit contact error:", err);
      setError("Network connection issue. Please verify details and resubmit.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (successToken) {
      navigator.clipboard.writeText(successToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-700 dark:text-violet-400 text-xs font-bold tracking-wide uppercase mb-6">
            Contact Us
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Submit Your{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Project Inquiry
            </span>
          </h1>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            No account required. Submit your project parameters and receive a confirmation token. Our team will follow up within 24 business hours.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Info Sidebar */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Get in Touch</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Our engineering team is ready to discuss your project requirements and provide tailored AI solutions.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: "Email",
                    value: "simranpatel.np@gmail.com",
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    ),
                  },
                  {
                    label: "Phone",
                    value: "+977 9821344249",
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    ),
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800">
                    <span className="text-violet-600 dark:text-violet-400 mt-0.5">{item.icon}</span>
                    <div>
                      <span className="block text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{item.label}</span>
                      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {successToken ? (
                <div className="bg-gradient-to-tr from-violet-500/10 to-indigo-500/5 dark:from-violet-950/20 dark:to-zinc-900/5 rounded-3xl border border-violet-500/20 p-8 text-center animate-fade-in">
                  <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Inquiry Submitted Successfully</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-3 max-w-lg mx-auto">
                    Your inquiry has been stored securely. A confirmation token has been generated and sent to your email.
                  </p>
                  <div className="mt-8 max-w-xs mx-auto">
                    <span className="block text-xs uppercase tracking-wider font-bold text-zinc-400 dark:text-zinc-500 mb-2">Confirmation Token</span>
                    <div className="flex items-center gap-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-1 shadow-sm">
                      <code className="flex-1 text-base font-mono font-bold text-violet-600 dark:text-violet-400 py-1.5 px-3 select-all">{successToken}</code>
                      <button type="button" onClick={handleCopy} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors">
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-zinc-200/50 dark:border-zinc-800 flex justify-center">
                    <button type="button" onClick={() => setSuccessToken(null)} className="px-5 py-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all">
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-xl shadow-zinc-200/20 dark:shadow-none">
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">Inquiry Submission Form</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Customer Name</label>
                        <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ram Sharma" className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-violet-500 text-zinc-900 dark:text-zinc-50 text-sm transition-all" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Customer Email Address</label>
                        <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. ram@company.com" className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-violet-500 text-zinc-900 dark:text-zinc-50 text-sm transition-all" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Customer Phone Number</label>
                        <input id="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. +977 9841 123456" className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-violet-500 text-zinc-900 dark:text-zinc-50 text-sm transition-all" />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Customer Company Name</label>
                        <input id="company" type="text" required value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Himalaya Tech Pvt Ltd" className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-violet-500 text-zinc-900 dark:text-zinc-50 text-sm transition-all" />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Customer Country</label>
                        <input id="country" type="text" required value={country} onChange={(e) => setCountry(e.target.value)} placeholder="e.g. Nepal" className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-violet-500 text-zinc-900 dark:text-zinc-50 text-sm transition-all" />
                      </div>
                      <div>
                        <label htmlFor="title" className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Customer Title</label>
                        <input id="title" type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Chief Technology Officer" className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-violet-500 text-zinc-900 dark:text-zinc-50 text-sm transition-all" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="requirements" className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Detailed Job / Project Requirements</label>
                      <textarea id="requirements" required rows={5} value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder="Please describe your project requirements, integration targets, team size, and specific features needed..." className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-violet-500 text-zinc-900 dark:text-zinc-50 text-sm leading-relaxed transition-all" />
                    </div>

                    {error && (
                      <div className="text-sm font-semibold text-rose-600 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/10 rounded-xl p-3" role="alert">
                        {error}
                      </div>
                    )}

                    <div className="flex justify-end">
                      <button type="submit" disabled={loading} className="px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-md shadow-violet-600/15 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all disabled:opacity-50 flex items-center gap-2">
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Processing...
                          </>
                        ) : (
                          "Submit Inquiry Proposal"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
