import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | AI-Solutions",
  description: "Learn about AI-Solutions' mission, values, and the team behind our AI-powered digital employee experience platform.",
};

const TEAM = [
  {
    name: "Dr. Aris Thorne",
    role: "Chief Technology Officer",
    bio: "Former MIT AI Lab researcher specializing in multi-agent systems and autonomous scheduling architectures.",
  },
  {
    name: "Elena Rostova",
    role: "Head of Edge AI Engineering",
    bio: "Pioneer in deploying deep learning models to manufacturing edge devices with sub-millisecond inference.",
  },
  {
    name: "Marcus Chen",
    role: "Lead Data Scientist",
    bio: "Expert in semantic knowledge graph construction and NLP-driven talent matching algorithms.",
  },
  {
    name: "Simran Patel",
    role: "Student Developer & Consultant",
    bio: "BSc (Hons) Computer Systems Engineering student responsible for full-stack development and system integration.",
  },
];

const VALUES = [
  {
    title: "Innovation",
    description: "We push the boundaries of AI technology to create solutions that transform how engineering teams operate.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    title: "Reliability",
    description: "Our systems are built for 99.9% uptime with redundant failovers and continuous monitoring.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Accessibility",
    description: "We ensure our platform meets WCAG 2.1 standards so every user can engage with our technology.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: "Security",
    description: "Enterprise-grade cryptographic protocols protect all data with strict access control and audit logging.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-700 dark:text-violet-400 text-xs font-bold tracking-wide uppercase mb-6">
              About AI-Solutions
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              Powering the Future of{" "}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Digital Employee Experience
              </span>
            </h1>
            <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              AI-Solutions combines cutting-edge artificial intelligence with deep industry expertise to help engineering and software design companies maximize their operational potential.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Our Mission
              </h2>
              <p className="mt-6 text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                To accelerate the digital transformation of engineering organizations by deploying intelligent AI systems that optimize scheduling, quality assurance, and talent acquisition workflows.
              </p>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                We believe that artificial intelligence should augment human capability, not replace it. Our solutions are designed to remove operational roadblocks so engineers can focus on what they do best: creating innovative products that shape the future.
              </p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">Key Achievements</h3>
              <div className="space-y-4">
                {[
                  { stat: "34%", label: "Average operational speedup across deployments" },
                  { stat: "99.8%", label: "Inspection accuracy with VisionGuard QA" },
                  { stat: "60%", label: "Reduction in time-to-hire with TalentScout" },
                  { stat: "50+", label: "Enterprise clients served globally" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-2xl font-black text-violet-600 dark:text-violet-400 w-20">{item.stat}</span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900/40 border-y border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              The principles that guide every solution we build and every partnership we form.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((value, i) => (
              <div key={i} className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{value.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Our Team
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              The experts behind AI-Solutions&apos; innovative technology platform.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, i) => (
              <div key={i} className="bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{member.name}</h3>
                <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 mt-1 uppercase tracking-wider">{member.role}</p>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-zinc-900 dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Ready to Transform Your Operations?</h2>
          <p className="mt-4 text-zinc-400 text-lg">Let&apos;s discuss how AI-Solutions can optimize your engineering workflows.</p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-md transition-all">
              Contact Us
            </Link>
            <Link href="/services" className="px-8 py-3.5 rounded-xl border border-zinc-700 hover:bg-zinc-800 text-zinc-300 font-bold text-sm transition-all">
              View Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
