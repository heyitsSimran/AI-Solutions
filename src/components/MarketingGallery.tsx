"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  tag: string;
}

interface PartnerCompany {
  id: string;
  name: string;
  date: string;
  product: string;
  status: "Scheduled" | "Vetting" | "Completed";
}

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  desc: string;
}

const ARTICLES: Article[] = [
  {
    id: "a1",
    title: "AI in Operations Scheduling: Minimizing Latency with Multi-Agent Systems",
    excerpt: "Discover how multi-agent reinforcement learning optimizes shop floor scheduling and reduces operational overhead by up to 34% through proactive pathfinding.",
    readTime: "5 min read",
    date: "May 28, 2026",
    author: "Dr. Aris Thorne",
    tag: "Technical Paper"
  },
  {
    id: "a2",
    title: "Edge AI & Quality Assurance: Sub-Millimeter Vision Flaw Detection Protocols",
    excerpt: "An in-depth look at deploying convolutional neural networks directly to production line edge devices for sub-millimeter defects with zero cloud latency.",
    readTime: "4 min read",
    date: "Jun 02, 2026",
    author: "Elena Rostova",
    tag: "Research Note"
  },
  {
    id: "a3",
    title: "Vetting Engineering Skill Trees: How Semantic AI Eliminates Hiring Biases",
    excerpt: "Learn how indexing applicant profiles into semantic knowledge maps ensures objective qualification screening and speeds up time-to-hire by 60%.",
    readTime: "6 min read",
    date: "Jun 04, 2026",
    author: "Marcus Chen",
    tag: "Case Study"
  }
];

const PARTNERS: PartnerCompany[] = [
  { id: "p1", name: "Quantum Tech", date: "Nov 12, 2026", product: "AetherFlow ERP", status: "Scheduled" },
  { id: "p2", name: "Innovate Software", date: "Dec 05, 2026", product: "TalentScout Recruiter", status: "Vetting" },
  { id: "p3", name: "Apex Systems", date: "Jan 18, 2027", product: "VisionGuard QA", status: "Scheduled" },
  { id: "p4", name: "Stellar Robotics", date: "Feb 22, 2027", product: "AetherFlow ERP", status: "Completed" },
  { id: "p5", name: "Blue Horizon", date: "Mar 15, 2027", product: "VisionGuard QA", status: "Scheduled" }
];

const IMAGES: GalleryImage[] = [
  {
    id: 0,
    src: "/images/summit_event.png",
    alt: "AI-Solutions Summit 2026 keynote event displaying neural network architectures on giant stage screens.",
    title: "AI-Solutions Summit 2026",
    desc: "Keynote presentation introducing the new multi-agent scheduling frameworks to industrial stakeholders."
  },
  {
    id: 1,
    src: "/images/hackathon_event.png",
    alt: "Engineering developers working collaboratively around screens in a modern lounge workspace.",
    title: "Developer Hackathon",
    desc: "Collaborative design workshop exploring real-time model integration on edge controllers."
  },
  {
    id: 2,
    src: "/images/meetup_event.png",
    alt: "Professional attendees networking and viewing web dashboards during an evening meetup.",
    title: "Community Meetup & Networking",
    desc: "Local tech innovators sharing case study results and discussing digital employee experience platforms."
  }
];

export default function MarketingGallery() {
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const closeLightbox = () => {
    setActiveImageIdx(null);
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 50);
  };

  const openLightbox = (index: number, triggerElement: HTMLButtonElement) => {
    triggerRef.current = triggerElement;
    setActiveImageIdx(index);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (activeImageIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        setActiveImageIdx((prev) => (prev !== null && prev < IMAGES.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowLeft") {
        setActiveImageIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : IMAGES.length - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImageIdx]);

  return (
    <section id="gallery" className="py-20 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Marketing Articles */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 sm:text-4xl tracking-tight">
              Technical Marketing Materials
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Deep dive into technical reports, research, and insights prepared by AI-Solutions&apos; engineering teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

        {/* Corporate Event Media Gallery */}
        <div className="mb-20 border-t border-zinc-200/50 dark:border-zinc-800/50 pt-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 sm:text-4xl tracking-tight">
              Corporate Event Gallery
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Capturing moments from our community outreach, technical summits, and collaborative code hackathons.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {IMAGES.map((img) => (
              <button
                key={img.id}
                type="button"
                onClick={(e) => openLightbox(img.id, e.currentTarget)}
                className="group relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 focus:outline-none focus:ring-4 focus:ring-violet-500 text-left cursor-pointer"
                aria-label={`Open photo lightbox for ${img.title}`}
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-w-768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="font-bold text-base tracking-tight">{img.title}</h3>
                  <p className="text-xs text-zinc-300 mt-1 line-clamp-1">{img.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Scheduled Employment/Partnerships Table */}
        <div className="border-t border-zinc-200/50 dark:border-zinc-800/50 pt-16">
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Deployment Partnerships Schedule
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              List of partner organizations scheduled for platform employment integrations and pilot setups.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-left text-sm text-zinc-600 dark:text-zinc-300">
              <thead className="bg-zinc-50 dark:bg-zinc-900/60 text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400">
                <tr>
                  <th scope="col" className="px-6 py-4">Company Name</th>
                  <th scope="col" className="px-6 py-4">Integration Target Date</th>
                  <th scope="col" className="px-6 py-4">Platform Deploying</th>
                  <th scope="col" className="px-6 py-4">Vetting Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-850 bg-transparent">
                {PARTNERS.map((partner) => (
                  <tr key={partner.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-zinc-900 dark:text-zinc-100">{partner.name}</td>
                    <td className="px-6 py-4">{partner.date}</td>
                    <td className="px-6 py-4 text-violet-600 dark:text-violet-400 font-medium">{partner.product}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          partner.status === "Completed"
                            ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400"
                            : partner.status === "Vetting"
                            ? "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400"
                            : "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400"
                        }`}
                      >
                        {partner.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Accessible Photo Lightbox Overlay */}
      {activeImageIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-10 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox Viewer"
        >
          {/* Close Backdrop Button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute inset-0 w-full h-full bg-transparent cursor-default border-none"
            aria-label="Close Lightbox"
          />

          <div className="relative max-w-4xl w-full flex flex-col items-center z-10">
            {/* Action Bar */}
            <div className="absolute -top-12 right-0 flex items-center gap-4">
              <span className="text-zinc-400 text-xs font-medium">
                {activeImageIdx + 1} / {IMAGES.length}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeLightbox}
                className="text-zinc-400 hover:text-white rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-zinc-900 border border-zinc-800"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav Arrows */}
            <button
              type="button"
              onClick={() => setActiveImageIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : IMAGES.length - 1))}
              className="absolute left-2 sm:-left-16 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-zinc-950/70 border border-zinc-850 hover:scale-105 transition-all"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setActiveImageIdx((prev) => (prev !== null && prev < IMAGES.length - 1 ? prev + 1 : 0))}
              className="absolute right-2 sm:-right-16 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-zinc-950/70 border border-zinc-850 hover:scale-105 transition-all"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {/* Active Image */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950">
              <Image
                src={IMAGES[activeImageIdx].src}
                alt={IMAGES[activeImageIdx].alt}
                fill
                sizes="(max-w-1024px) 100vw, 1024px"
                className="object-contain"
                priority
              />
            </div>

            {/* Caption */}
            <div className="w-full text-center mt-6">
              <h3 className="text-white font-bold text-lg">{IMAGES[activeImageIdx].title}</h3>
              <p className="text-zinc-400 text-sm mt-1 max-w-xl mx-auto">{IMAGES[activeImageIdx].desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
