import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Articles & Gallery | AI-Solutions",
  description: "Read technical marketing articles, research papers, and explore our corporate event photo galleries.",
};

const ARTICLES = [
  {
    id: "a1",
    title: "AI in Operations Scheduling: Minimizing Latency with Multi-Agent Systems",
    excerpt: "Discover how multi-agent reinforcement learning optimizes shop floor scheduling and reduces operational overhead by up to 34% through proactive pathfinding.",
    readTime: "5 min read",
    date: "May 28, 2026",
    author: "Dr. Aris Thorne",
    tag: "Technical Paper",
    content: "The deployment of multi-agent reinforcement learning in industrial scheduling represents a paradigm shift from traditional rule-based systems. Our research demonstrates that by coordinating autonomous agents across supply chain nodes, organizations can achieve a 34% reduction in scheduling latency while maintaining 99.7% compliance with operational constraints.",
  },
  {
    id: "a2",
    title: "Edge AI & Quality Assurance: Sub-Millimeter Vision Flaw Detection Protocols",
    excerpt: "An in-depth look at deploying convolutional neural networks directly to production line edge devices for sub-millimeter defects with zero cloud latency.",
    readTime: "4 min read",
    date: "Jun 02, 2026",
    author: "Elena Rostova",
    tag: "Research Note",
    content: "Edge-deployed neural networks eliminate the latency associated with cloud inference, enabling real-time defect detection at production line speeds. Our VisionGuard system achieves sub-5ms inference times while maintaining 99.8% detection accuracy on sub-millimeter manufacturing defects.",
  },
  {
    id: "a3",
    title: "Vetting Engineering Skill Trees: How Semantic AI Eliminates Hiring Biases",
    excerpt: "Learn how indexing applicant profiles into semantic knowledge maps ensures objective qualification screening and speeds up time-to-hire by 60%.",
    readTime: "6 min read",
    date: "Jun 04, 2026",
    author: "Marcus Chen",
    tag: "Case Study",
    content: "Traditional resume screening introduces unconscious biases that disproportionately affect qualified candidates. TalentScout's semantic skill tree approach maps candidate qualifications to job requirements using objective data, resulting in a 60% reduction in time-to-hire while improving candidate-role fit by 42%.",
  },
  {
    id: "a4",
    title: "The Future of Digital Employee Experience: AI-Driven Workflows",
    excerpt: "Exploring how AI-powered platforms are transforming the way engineering teams collaborate, innovate, and deliver results in the modern workplace.",
    readTime: "7 min read",
    date: "Jun 08, 2026",
    author: "Dr. Aris Thorne",
    tag: "Industry Insight",
    content: "Digital employee experience platforms are evolving beyond simple task management to become intelligent collaborators. By analyzing workflow patterns, identifying bottlenecks, and proactively suggesting optimizations, AI systems are enabling engineering teams to focus on high-value creative work.",
  },
  {
    id: "a5",
    title: "Predictive Maintenance in Wind Energy: AI-Powered Turbine Optimization",
    excerpt: "How weather-aware AI scheduling reduces unplanned downtime in wind farm operations and increases annual energy output by 15%.",
    readTime: "5 min read",
    date: "Jun 10, 2026",
    author: "Elena Rostova",
    tag: "Technical Paper",
    content: "Integrating weather prediction models with maintenance scheduling algorithms enables wind farm operators to service turbines during optimal windows, reducing unplanned downtime by 67% and increasing annual energy output by 15%. Our AetherFlow ERP system demonstrated these results across 500+ turbines.",
  },
  {
    id: "a6",
    title: "Ethical AI in Manufacturing: Balancing Automation and Workforce Development",
    excerpt: "A framework for implementing AI systems that augment rather than replace human workers in manufacturing environments.",
    readTime: "8 min read",
    date: "Jun 12, 2026",
    author: "Marcus Chen",
    tag: "Industry Insight",
    content: "As AI systems become more capable, the question of workforce displacement becomes increasingly relevant. Our research proposes a framework where AI handles repetitive quality checks while human workers focus on complex decision-making and continuous improvement activities.",
  },
];

const GALLERY = [
  {
    id: 0,
    src: "/images/summit_event.png",
    alt: "AI-Solutions Summit 2026 keynote event displaying neural network architectures on giant stage screens.",
    title: "AI-Solutions Summit 2026",
    desc: "Keynote presentation introducing the new multi-agent scheduling frameworks to industrial stakeholders.",
    event: "Summit 2026",
  },
  {
    id: 1,
    src: "/images/hackathon_event.png",
    alt: "Engineering developers working collaboratively around screens in a modern lounge workspace.",
    title: "Developer Hackathon",
    desc: "Collaborative design workshop exploring real-time model integration on edge controllers.",
    event: "Hackathon 2025",
  },
  {
    id: 2,
    src: "/images/meetup_event.png",
    alt: "Professional attendees networking and viewing web dashboards during an evening meetup.",
    title: "Community Meetup & Networking",
    desc: "Local tech innovators sharing case study results and discussing digital employee experience platforms.",
    event: "Meetup 2025",
  },
];

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-700 dark:text-violet-400 text-xs font-bold tracking-wide uppercase mb-6">
            Articles & Gallery
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Technical Insights &{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Media Gallery
            </span>
          </h1>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Deep dive into technical reports, research papers, and explore photos from our corporate events.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Technical Marketing Materials
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">In-depth articles and research from our engineering teams.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.map((art) => (
              <article
                key={art.id}
                className="group flex flex-col justify-between bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 p-6 hover:border-violet-500/30 dark:hover:border-violet-500/30 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-3 text-xs mb-4">
                    <span className="px-2 py-0.5 rounded bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400 font-bold">
                      {art.tag}
                    </span>
                    <span className="text-zinc-400 dark:text-zinc-500">{art.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {art.title}
                  </h3>
                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="font-semibold">{art.author}</span>
                  <span>{art.date}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900/40 border-y border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Corporate Event Gallery
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Capturing moments from our summits, hackathons, and meetups.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY.map((img) => (
              <div
                key={img.id}
                className="group relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width-768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">{img.event}</span>
                  <h3 className="font-bold text-base tracking-tight mt-1">{img.title}</h3>
                  <p className="text-xs text-zinc-300 mt-1 line-clamp-2">{img.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
