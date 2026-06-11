import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | AI-Solutions",
  description: "Explore AI-Solutions' comprehensive AI-powered services for operations scheduling, quality assurance, and talent acquisition.",
};

const SERVICES = [
  {
    id: "aetherflow",
    name: "AetherFlow ERP",
    tagline: "Autonomous Operations & Resource Scheduling",
    description: "An AI system that coordinates physical and virtual workloads, optimizing scheduling constraints, inventory buffers, and engineering resources across your entire supply chain.",
    features: [
      "Multi-agent task allocation with real-time rebalancing",
      "Dynamic pathfinding and bottleneck detection",
      "Carbon emission scheduling optimization",
      "Predictive supply chain forecasting",
      "Integration with existing ERP systems",
      "Real-time dashboard and reporting",
    ],
    metrics: { label: "Operational Speedup", value: "34%" },
    color: "from-blue-600 to-cyan-500",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    id: "visionguard",
    name: "VisionGuard QA",
    tagline: "High-Speed Edge Defect Analysis",
    description: "Operates at the manufacturing edge, identifying manufacturing anomalies and sub-millimeter defects with zero latency using deep neural networks deployed directly on production line sensors.",
    features: [
      "Sub-millimeter anomaly detection accuracy",
      "Multi-spectral feed ingestion capability",
      "Ultra-low latency edge scoring (<5ms)",
      "Automated compliance report generation",
      "Multi-camera orchestration support",
      "Cloud-synced defect analytics dashboard",
    ],
    metrics: { label: "Inspection Accuracy", value: "99.8%" },
    color: "from-violet-600 to-fuchsia-500",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
      </svg>
    ),
  },
  {
    id: "talentscout",
    name: "TalentScout Recruiter",
    tagline: "Advanced Talent Mapping & Skills Indexing",
    description: "Builds semantic profile trees for job applicants to automatically evaluate technical capability levels and match candidates with engineering roles, eliminating hiring bias through data-driven assessment.",
    features: [
      "Semantic skill tree parsing and matching",
      "Automated blind ranking protocols",
      "Personalized career pathway forecasting",
      "Continuous learning recommendation engine",
      "ATS integration support",
      "Diversity and inclusion analytics",
    ],
    metrics: { label: "Time-to-Hire Reduction", value: "60%" },
    color: "from-emerald-600 to-teal-500",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
];

const ADDITIONAL_SERVICES = [
  {
    name: "Custom AI Integration",
    description: "Tailored AI solutions designed to integrate with your existing infrastructure and workflows.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.19a1.125 1.125 0 01-1.636-.848V6.488a1.125 1.125 0 011.636-.848l5.384 3.19m0 0l5.384 3.19a1.125 1.125 0 010 1.696l-5.384 3.19m0-8.076l5.384 3.19" />
      </svg>
    ),
  },
  {
    name: "Data Analytics Consulting",
    description: "Expert guidance on leveraging your operational data for actionable business intelligence.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
  },
  {
    name: "Technical Training",
    description: "Comprehensive onboarding and training programs for your engineering teams on our AI platforms.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    name: "24/7 Technical Support",
    description: "Round-the-clock monitoring and support for all deployed AI systems with guaranteed SLAs.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-700 dark:text-violet-400 text-xs font-bold tracking-wide uppercase mb-6">
            Our Services
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            AI-Powered Solutions for{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Modern Engineering
            </span>
          </h1>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Three flagship platforms designed to optimize every stage of your engineering operations.
          </p>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {SERVICES.map((service, i) => (
            <div key={service.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} text-white mb-6`}>
                  {service.icon}
                </div>
                <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">{service.name}</h2>
                <p className="text-violet-600 dark:text-violet-400 font-semibold text-sm mt-1 uppercase tracking-wider">{service.tagline}</p>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">{service.description}</p>
                <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-2xl font-black text-violet-600 dark:text-violet-400">{service.metrics.value}</span>
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase">{service.metrics.label}</span>
                </div>
              </div>
              <div className={`bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <h3 className="text-sm font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-4">Core Capabilities</h3>
                <ul className="space-y-3">
                  {service.features.map((feat, j) => (
                    <li key={j} className="flex items-start text-sm text-zinc-600 dark:text-zinc-400">
                      <svg className="h-5 w-5 text-violet-600 dark:text-violet-400 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900/40 border-y border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Additional Services
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              End-to-end support for your AI transformation journey.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ADDITIONAL_SERVICES.map((svc, i) => (
              <div key={i} className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-4">
                  {svc.icon}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{svc.name}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{svc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-zinc-900 dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Start Your AI Transformation</h2>
          <p className="mt-4 text-zinc-400 text-lg">Schedule a consultation to discuss your specific requirements.</p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-md transition-all">
              Get in Touch
            </Link>
            <Link href="/portfolio" className="px-8 py-3.5 rounded-xl border border-zinc-700 hover:bg-zinc-800 text-zinc-300 font-bold text-sm transition-all">
              View Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
