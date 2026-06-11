import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events | AI-Solutions",
  description: "Explore AI-Solutions' past and upcoming corporate events, summits, hackathons, and community meetups.",
};

const PAST_EVENTS = [
  {
    id: "e1",
    title: "AI-Solutions Summit 2026",
    date: "March 15, 2026",
    location: "London Convention Centre",
    type: "Summit",
    description: "Keynote presentation introducing the new multi-agent scheduling frameworks to industrial stakeholders. Over 500 attendees from 12 countries explored the future of AI-driven engineering operations.",
    highlights: [
      "Keynote by Dr. Aris Thorne on multi-agent scheduling",
      "Live demo of AetherFlow ERP v3.0",
      "Panel discussion on AI ethics in manufacturing",
      "Networking session with 500+ industry professionals",
    ],
    attendees: 500,
    image: "/images/summit_event.png",
  },
  {
    id: "e2",
    title: "Developer Hackathon 2025",
    date: "November 8, 2025",
    location: "Innovation Hub, Cambridge",
    type: "Hackathon",
    description: "Collaborative design workshop exploring real-time model integration on edge controllers. Teams competed to build the most innovative VisionGuard QA deployment in 48 hours.",
    highlights: [
      "48-hour continuous development sprint",
      "12 teams from 8 organizations",
      "Winner: Real-time defect visualization dashboard",
      "3 new features adopted into VisionGuard roadmap",
    ],
    attendees: 120,
    image: "/images/hackathon_event.png",
  },
  {
    id: "e3",
    title: "Community Meetup & Networking",
    date: "September 22, 2025",
    location: "TechSpace Oxford",
    type: "Meetup",
    description: "Local tech innovators sharing case study results and discussing digital employee experience platforms. An evening of knowledge sharing and community building.",
    highlights: [
      "3 case study presentations",
      "Interactive Q&A with engineering team",
      "Hands-on VisionGuard demo stations",
      "Networking drinks and open discussion",
    ],
    attendees: 80,
    image: "/images/meetup_event.png",
  },
];

const UPCOMING_EVENTS = [
  {
    id: "eu1",
    title: "AI-Solutions Summit 2027",
    date: "March 20, 2027",
    location: "Manchester Central",
    type: "Summit",
    description: "Our flagship annual summit returns with expanded tracks on edge AI, autonomous scheduling, and the future of digital employee experience platforms.",
    registrationOpen: true,
  },
  {
    id: "eu2",
    title: "Edge AI Workshop Series",
    date: "July 12, 2026",
    location: "Virtual (Zoom)",
    type: "Workshop",
    description: "A 3-part workshop series on deploying VisionGuard QA models to edge devices. Hands-on sessions with live coding and real hardware demonstrations.",
    registrationOpen: true,
  },
  {
    id: "eu3",
    title: "Partner Innovation Day",
    date: "September 5, 2026",
    location: "AI-Solutions HQ, London",
    type: "Networking",
    description: "Exclusive event for current and prospective deployment partners to preview upcoming product releases and provide direct feedback to the engineering team.",
    registrationOpen: false,
  },
];

const EVENT_TYPES = ["All", "Summit", "Hackathon", "Meetup", "Workshop", "Networking"];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-700 dark:text-violet-400 text-xs font-bold tracking-wide uppercase mb-6">
            Our Events
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Summits, Hackathons &{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Community
            </span>
          </h1>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Join us at industry-leading events where we showcase the latest in AI-powered engineering solutions.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                Upcoming Events
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Don&apos;t miss our next events and workshops.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {UPCOMING_EVENTS.map((event) => (
              <div key={event.id} className="bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400">
                    {event.type}
                  </span>
                  {event.registrationOpen ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200/20">
                      Registration Open
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200/20">
                      Invitation Only
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{event.title}</h3>
                <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 space-y-1">
                  <p>{event.date}</p>
                  <p>{event.location}</p>
                </div>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{event.description}</p>
                <div className="mt-6 pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
                  <Link href="/contact" className="text-sm font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors">
                    Register Interest &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900/40 border-y border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Past Events
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Highlights from our previous events and conferences.</p>
          </div>

          <div className="space-y-12">
            {PAST_EVENTS.map((event) => (
              <div key={event.id} className="bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image */}
                  <div className="relative aspect-video lg:aspect-auto bg-zinc-100 dark:bg-zinc-900">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-950/10" />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400">
                        {event.type}
                      </span>
                      <span className="text-xs text-zinc-400 dark:text-zinc-500">{event.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{event.title}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{event.location} | {event.attendees} attendees</p>
                    <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{event.description}</p>
                    
                    <div className="mt-6">
                      <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Event Highlights</h4>
                      <ul className="space-y-1.5">
                        {event.highlights.map((h, j) => (
                          <li key={j} className="flex items-start text-xs text-zinc-600 dark:text-zinc-400">
                            <svg className="h-4 w-4 text-violet-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
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
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Host an AI-Solutions Event?</h2>
          <p className="mt-4 text-zinc-400 text-lg">We partner with organizations worldwide to deliver AI workshops and presentations.</p>
          <div className="mt-8">
            <Link href="/contact" className="px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-md transition-all">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
