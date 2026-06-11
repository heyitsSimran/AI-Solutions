"use client";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-white dark:bg-zinc-950">
      {/* Visual background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-violet-600/10 to-indigo-600/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-cyan-600/5 to-teal-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 text-left space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-700 dark:text-violet-400 text-xs font-bold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-violet-600 dark:bg-violet-400 animate-pulse" />
              Empowering Software & Systems Engineering
            </div>

            <h1 className="text-4xl font-extrabold sm:text-6xl tracking-tight leading-[1.1] text-zinc-900 dark:text-zinc-50">
              Accelerate the Digital{" "}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Employee Experience
              </span>
            </h1>

            <p className="max-w-2xl text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              AI-Solutions integrates intelligent scheduling models, edge visual analytics, and semantic recruiting trees to remove operational roadblocks and maximize engineering output.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#solutions"
                className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-750 text-white font-bold text-sm shadow-md shadow-violet-600/15 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all hover:scale-[1.02]"
              >
                Explore Software Solutions
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all hover:scale-[1.02]"
              >
                Inquire Proposal
              </a>
            </div>
          </div>

          {/* Visual Graphics Dashboard mock */}
          <div className="lg:col-span-5 animate-fade-in pointer-events-none select-none">
            <div className="relative rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 p-6 shadow-xl shadow-zinc-200/20 dark:shadow-none backdrop-blur-md">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full opacity-10 blur-xl" />
              
              {/* Header UI mock */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  AI CORE v2.8.4
                </div>
              </div>

              {/* Body stats mock */}
              <div className="space-y-4 pt-4 text-xs font-mono">
                <div className="flex justify-between items-center bg-white dark:bg-zinc-900/60 p-3 rounded-xl border border-zinc-250/20 shadow-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">AetherFlow Queue</span>
                  <span className="text-emerald-500 font-bold">ACTIVE (147 eps)</span>
                </div>
                <div className="flex justify-between items-center bg-white dark:bg-zinc-900/60 p-3 rounded-xl border border-zinc-250/20 shadow-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">VisionGuard Edge Defect Rate</span>
                  <span className="text-violet-500 font-bold">0.002% (NOMINAL)</span>
                </div>
                <div className="flex justify-between items-center bg-white dark:bg-zinc-900/60 p-3 rounded-xl border border-zinc-250/20 shadow-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">TalentScout Matching Match Rate</span>
                  <span className="text-cyan-500 font-bold">96.8% (OPTIMIZED)</span>
                </div>
              </div>

              {/* Progress bar mock */}
              <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex justify-between text-[10px] font-bold text-zinc-400 dark:text-zinc-500 mb-1.5 uppercase">
                  <span>Engine Workload</span>
                  <span>42%</span>
                </div>
                <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="w-[42%] h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
