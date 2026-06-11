import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio | AI-Solutions",
  description: "Explore AI-Solutions' portfolio of successful AI deployments across aerospace, automotive, software engineering, and clean energy sectors.",
};

const CASE_STUDIES = [
  {
    id: "cs1",
    company: "Stellar Robotics",
    industry: "Aerospace",
    product: "AetherFlow ERP",
    outcome: "45% reduction in parts scheduling latency",
    description: "Coordinated structural wing assembly lines across three separate supply facilities, resolving micro-bottlenecks in raw material deliveries. The multi-agent scheduling system reduced production delays by 45% within the first quarter of deployment.",
    challenges: [
      "Fragmented supply chain across 3 facilities",
      "Manual scheduling causing 12-hour delays",
      "No real-time visibility into parts inventory",
    ],
    results: [
      "45% reduction in scheduling latency",
      "98.7% parts delivery accuracy",
      "$2.3M annual cost savings",
    ],
    date: "Q3 2025",
    duration: "6 months",
    color: "from-blue-600 to-cyan-500",
  },
  {
    id: "cs2",
    company: "Apex Systems",
    industry: "Automotive",
    product: "VisionGuard QA",
    outcome: "99.9% QA compliance with 0 recall incidents",
    description: "Deployed edge optical sensors along high-speed drivetrain assembly lines, analyzing surface finishes and bearing tolerances in real time. The system now processes over 10,000 inspections per hour with zero false negatives.",
    challenges: [
      "High-speed production line requiring <5ms inspection",
      "Sub-millimeter defect detection needed",
      "Existing manual QA causing bottlenecks",
    ],
    results: [
      "99.9% QA compliance achieved",
      "Zero recall incidents since deployment",
      "3x increase in inspection throughput",
    ],
    date: "Q4 2025",
    duration: "4 months",
    color: "from-violet-600 to-fuchsia-500",
  },
  {
    id: "cs3",
    company: "Innovate Software",
    industry: "Software Engineering",
    product: "TalentScout Recruiter",
    outcome: "Expanded tech team by 200 developers in 3 months",
    description: "Automated candidate vetting and technical capability maps, ensuring high-retention project matching and faster onboarding. The semantic skill matching reduced time-to-hire from 45 days to 18 days.",
    challenges: [
      "High volume of 500+ weekly applications",
      "Manual screening taking 8 hours per candidate",
      "High early-stage turnover (35% in first 6 months)",
    ],
    results: [
      "200 developers hired in 3 months",
      "60% reduction in time-to-hire",
      "Turnover reduced to 12%",
    ],
    date: "Q1 2026",
    duration: "3 months",
    color: "from-emerald-600 to-teal-500",
  },
  {
    id: "cs4",
    company: "Blue Horizon",
    industry: "Clean Energy",
    product: "AetherFlow ERP",
    outcome: "Optimized turbine maintenance windows by 22%",
    description: "Linked weather prediction models with regional operations teams to schedule offline turbine servicing at lowest impact times. The predictive maintenance system reduced unplanned downtime by 67%.",
    challenges: [
      "Unpredictable weather causing turbine damage",
      "Reactive maintenance approach",
      "500+ turbines across 12 wind farms",
    ],
    results: [
      "22% improvement in maintenance windows",
      "67% reduction in unplanned downtime",
      "15% increase in annual energy output",
    ],
    date: "Q2 2026",
    duration: "5 months",
    color: "from-amber-600 to-orange-500",
  },
  {
    id: "cs5",
    company: "Quantum Tech",
    industry: "Manufacturing",
    product: "VisionGuard QA",
    outcome: "Detected 99.7% of micro-fractures in semiconductor wafers",
    description: "Implemented multi-spectral imaging combined with deep learning to identify microscopic fractures in semiconductor wafers during the fabrication process, preventing defective chips from reaching downstream assembly.",
    challenges: [
      "Nano-scale defect detection requirements",
      "High throughput demand (10,000 wafers/day)",
      "Existing optical systems missing 15% of defects",
    ],
    results: [
      "99.7% defect detection rate",
      "Zero defective chips in final assembly",
      "$5M annual waste reduction",
    ],
    date: "Q2 2026",
    duration: "4 months",
    color: "from-rose-600 to-pink-500",
  },
  {
    id: "cs6",
    company: "Nexus Dynamics",
    industry: "Healthcare",
    product: "TalentScout Recruiter",
    outcome: "Hired 85 specialized biomedical engineers in 6 weeks",
    description: "Deployed semantic matching for a rapid scale-up of biomedical engineering talent, mapping complex cross-disciplinary skills to specific project requirements with precision matching.",
    challenges: [
      "Niche skill requirements (biomechanics + software)",
      "Urgent hiring timeline (6 weeks)",
      "Competitive market with limited talent pool",
    ],
    results: [
      "85 engineers hired in 6 weeks",
      "92% skill-role match accuracy",
      "Zero early-stage turnover",
    ],
    date: "Q3 2026",
    duration: "6 weeks",
    color: "from-indigo-600 to-blue-500",
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-700 dark:text-violet-400 text-xs font-bold tracking-wide uppercase mb-6">
            Our Portfolio
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Proven{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Case Studies
            </span>
          </h1>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Real results from our AI deployments across aerospace, automotive, software engineering, and clean energy sectors.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50+", label: "Clients Served" },
              { value: "34%", label: "Avg Speedup" },
              { value: "99.8%", label: "Accuracy Rate" },
              { value: "60%", label: "Hiring Efficiency" },
            ].map((stat, i) => (
              <div key={i}>
                <span className="text-3xl font-black text-violet-600 dark:text-violet-400">{stat.value}</span>
                <span className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {CASE_STUDIES.map((cs) => (
              <div key={cs.id} className="bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${cs.color}`}>
                    {cs.product}
                  </span>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 block">{cs.industry}</span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">{cs.date} | {cs.duration}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{cs.company}</h3>
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1">{cs.outcome}</p>
                <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{cs.description}</p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Challenges</h4>
                    <ul className="space-y-1.5">
                      {cs.challenges.map((ch, j) => (
                        <li key={j} className="flex items-start text-xs text-zinc-500 dark:text-zinc-400">
                          <svg className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
                          </svg>
                          {ch}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Results</h4>
                    <ul className="space-y-1.5">
                      {cs.results.map((res, j) => (
                        <li key={j} className="flex items-start text-xs text-zinc-500 dark:text-zinc-400">
                          <svg className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {res}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-zinc-900 dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Want Similar Results?</h2>
          <p className="mt-4 text-zinc-400 text-lg">Let us design a custom AI solution for your engineering operations.</p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-md transition-all">
              Start a Project
            </Link>
            <Link href="/services" className="px-8 py-3.5 rounded-xl border border-zinc-700 hover:bg-zinc-800 text-zinc-300 font-bold text-sm transition-all">
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
