"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <About />

      {/* Footer */}
      <footer className="py-12 border-t border-orange-200/30 glass-dark">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg">
                <span className="text-xl"></span>
              </div>
              <span className="text-2xl font-bold gradient-text">
                Rigveda AI
              </span>
            </div>
            <p className="text-orange-800/70 mb-4">
              Ancient Wisdom, Modern Intelligence
            </p>
            <p className="text-sm text-orange-800/50">
              Built by Tarin Agarwal and Srividya Davuluri
            </p>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
}
