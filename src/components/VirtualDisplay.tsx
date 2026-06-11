"use client";

import { useState } from "react";

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  metrics: string;
  color: string;
}

interface Deployment {
  id: string;
  product: string;
  industry: string;
  company: string;
  outcome: string;
  description: string;
  date: string;
}

const PRODUCTS: Product[] = [
  {
    id: "aetherflow",
    name: "AetherFlow ERP",
    tagline: "Autonomous operations and resource scheduling optimizer",
    description: "An AI system that coordinates physical and virtual workloads, optimizing scheduling constraints, inventory buffers, and engineering resources.",
    features: [
      "Multi-agent task allocation",
      "Dynamic pathfinding & bottleneck detection",
      "Carbon emission scheduling optimization",
      "Predictive supply chain forecasting"
    ],
    metrics: "34% operational speedup",
    color: "from-blue-600 to-cyan-500"
  },
  {
    id: "visionguard",
    name: "VisionGuard QA",
    tagline: "High-speed real-time defect analysis and visual inspection",
    description: "Operates at the manufacturing edge, identifying manufacturing anomalies and sub-millimeter defects with zero latency using deep neural networks.",
    features: [
      "Sub-millimeter anomaly detection",
      "Multi-spectral feed ingestion",
      "Ultra-low latency edge scoring (<5ms)",
      "Automated compliance report generation"
    ],
    metrics: "99.8% inspection accuracy",
    color: "from-violet-600 to-fuchsia-500"
  },
  {
    id: "talentscout",
    name: "TalentScout Recruiter",
    tagline: "Advanced talent mapping and engineering skills indexer",
    description: "Builds semantic profile trees for job applicants to automatically evaluate technical capability levels and match candidates with engineering roles.",
    features: [
      "Semantic skill tree parsing",
      "Automated blind ranking protocols",
      "Personalized career pathway forecasting",
      "Continuous learning recommendation engine"
    ],
    metrics: "60% reduction in time-to-hire",
    color: "from-emerald-600 to-teal-500"
  }
];

const DEPLOYMENTS: Deployment[] = [
  {
    id: "d1",
    product: "AetherFlow ERP",
    industry: "Aerospace",
    company: "Stellar Robotics",
    outcome: "45% reduction in parts scheduling latency",
    description: "Coordinated structural wing assembly lines across three separate supply facilities, resolving micro-bottlenecks in raw material deliveries.",
    date: "Q3 2025"
  },
  {
    id: "d2",
    product: "VisionGuard QA",
    industry: "Automotive",
    company: "Apex Systems",
    outcome: "99.9% QA compliance with 0 recall incidents",
    description: "Deployed edge optical sensors along high-speed drivetrain assembly lines, analyzing surface finishes and bearing tolerances in real time.",
    date: "Q4 2025"
  },
  {
    id: "d3",
    product: "TalentScout Recruiter",
    industry: "Software Engineering",
    company: "Innovate Software",
    outcome: "Expanded tech team by 200 developers in 3 months",
    description: "Automated candidate vetting and technical capability maps, ensuring high-retention project matching and faster onboarding.",
    date: "Q1 2026"
  },
  {
    id: "d4",
    product: "AetherFlow ERP",
    industry: "Clean Energy",
    company: "Blue Horizon",
    outcome: "Optimized turbine maintenance windows by 22%",
    description: "Linked weather prediction models with regional operations teams to schedule offline turbine servicing at lowest impact times.",
    date: "Q2 2026"
  }
];

export default function VirtualDisplay() {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0].id);
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const industries = ["All", ...Array.from(new Set(DEPLOYMENTS.map((d) => d.industry)))];

  const filteredDeployments = selectedIndustry === "All"
    ? DEPLOYMENTS
    : DEPLOYMENTS.filter((d) => d.industry === selectedIndustry);

  return (
    <section id="solutions" className="py-20 bg-zinc-50 dark:bg-zinc-900/40 border-y border-zinc-100 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Virtual Product Display
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Explore our state-of-the-art AI solutions built to optimize employee workflows and industrial performance.
          </p>
        </div>

        {/* Dynamic Solutions Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          
          {/* Sidebar Tabs */}
          <div className="flex flex-col gap-3" role="tablist" aria-label="AI Solutions Showcase">
            {PRODUCTS.map((prod) => {
              const isActive = selectedProduct === prod.id;
              return (
                <button
                  key={prod.id}
                  id={`tab-${prod.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${prod.id}`}
                  onClick={() => setSelectedProduct(prod.id)}
                  className={`text-left p-5 rounded-2xl transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                    isActive
                      ? "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/40 dark:shadow-none scale-[1.02] border-l-4 border-l-violet-600"
                      : "bg-transparent border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/50 border-zinc-100 dark:border-zinc-900"
                  }`}
                >
                  <span className="block text-sm font-semibold tracking-wider text-violet-600 dark:text-violet-400 uppercase">
                    {prod.metrics}
                  </span>
                  <span className="block text-xl font-bold mt-1 text-zinc-900 dark:text-zinc-50">
                    {prod.name}
                  </span>
                  <span className="block text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">
                    {prod.tagline}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Product Detail Panel */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-xl shadow-zinc-200/30 dark:shadow-none min-h-[350px] flex flex-col justify-between">
            {PRODUCTS.map((prod) => {
              if (prod.id !== selectedProduct) return null;
              return (
                <div
                  key={prod.id}
                  id={`panel-${prod.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${prod.id}`}
                  className="animate-fade-in flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${prod.color}`}>
                        Active Deployment
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
                        {prod.metrics}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                      {prod.name}
                    </h3>
                    <p className="mt-1 text-sm italic text-violet-600 dark:text-violet-400">
                      {prod.tagline}
                    </p>

                    <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
                      {prod.description}
                    </p>

                    {/* Features list */}
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-3">
                        Core Capabilities
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3" aria-label={`Features of ${prod.name}`}>
                        {prod.features.map((feat, index) => (
                          <li key={index} className="flex items-start text-sm text-zinc-600 dark:text-zinc-400">
                            <svg
                              className="h-5 w-5 text-violet-600 dark:text-violet-400 mr-2 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-900 flex justify-end">
                    <a
                      href="#contact"
                      className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                    >
                      Inquire About {prod.name}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Deployments / Historical Records Section */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                Deployment History & Case Studies
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                A historical log of verified system installations across key sectors.
              </p>
            </div>
            
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter case studies by industry">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setSelectedIndustry(ind)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                    selectedIndustry === ind
                      ? "bg-violet-600 border-violet-600 text-white shadow-md shadow-violet-500/10"
                      : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          {/* Deployment Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-live="polite">
            {filteredDeployments.map((dep) => (
              <div
                key={dep.id}
                className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400">
                      {dep.industry}
                    </span>
                    <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                      {dep.date}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                    {dep.company}
                  </h4>
                  <p className="text-xs text-violet-600 dark:text-violet-400 mt-0.5">
                    Platform: <span className="font-semibold">{dep.product}</span>
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-3">
                    {dep.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                  <span className="block text-xs uppercase tracking-wider font-semibold text-zinc-400 dark:text-zinc-500">
                    Verified Outcome
                  </span>
                  <span className="block text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {dep.outcome}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
