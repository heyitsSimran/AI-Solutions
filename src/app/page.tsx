import Tracker from "@/components/Tracker";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VirtualDisplay from "@/components/VirtualDisplay";
import MarketingGallery from "@/components/MarketingGallery";
import ReviewTool from "@/components/ReviewTool";
import ContactForm from "@/components/ContactForm";
import AIAssistant from "@/components/AIAssistant";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Tracker executes page view analytics (data-separation compliant) */}
      <Tracker />

      {/* Nav Section */}
      <Navbar />

      {/* Core layout wrapping sections */}
      <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1}>
        {/* R1: Hero and Virtual display */}
        <Hero />
        
        {/* R1: Products and deployments */}
        <VirtualDisplay />

        {/* R2: Articles, Corporate event gallery, Partner schedules */}
        <MarketingGallery />

        {/* R3: Multi-level ratings and customer reviews list */}
        <ReviewTool />

        {/* R4: Contact inquiry proposal form */}
        <ContactForm />
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 text-zinc-400 py-12 border-t border-zinc-800" aria-label="Corporate Footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded bg-violet-600 flex items-center justify-center text-white font-black text-sm">
                  AI
                </span>
                <span className="text-white font-bold tracking-tight text-base">
                  AI-Solutions
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                AI-powered platforms optimizing developer efficiency, edge QA inspection, and operations resource scheduling for modern engineering organizations.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-xs hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/services" className="text-xs hover:text-white transition-colors">Services</Link></li>
                <li><Link href="/portfolio" className="text-xs hover:text-white transition-colors">Portfolio</Link></li>
                <li><Link href="/events" className="text-xs hover:text-white transition-colors">Events</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/articles" className="text-xs hover:text-white transition-colors">Articles & Gallery</Link></li>
                <li><Link href="/contact" className="text-xs hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Products</h3>
              <ul className="space-y-2">
                <li><span className="text-xs">AetherFlow ERP</span></li>
                <li><span className="text-xs">VisionGuard QA</span></li>
                <li><span className="text-xs">TalentScout Recruiter</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-center md:text-left">
              &copy; {new Date().getFullYear()} AI-Solutions Ltd. Developed by Student Developer Simran Patel. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs font-semibold">
              <Link href="/about" className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-violet-500 rounded px-1 py-0.5">About</Link>
              <Link href="/services" className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-violet-500 rounded px-1 py-0.5">Services</Link>
              <Link href="/contact" className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-violet-500 rounded px-1 py-0.5">Contact</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* R6: Floating Live AI Assistant Widget */}
      <AIAssistant />
    </>
  );
}
