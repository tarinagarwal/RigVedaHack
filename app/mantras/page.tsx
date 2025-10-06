"use client";

import Navbar from "@/components/Navbar";
import MantrasInterface from "@/components/MantrasInterface";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function MantrasPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="text-5xl">🎵</span>
              <h1 className="text-5xl md:text-6xl font-bold gradient-text">
                Vedic Mantras
              </h1>
            </div>
            <p className="text-xl text-coral-800/70">
              Listen to authentic Rigveda chanting
            </p>
          </div>

          <div className="glass rounded-3xl p-8 max-w-7xl mx-auto shadow-2xl">
            <MantrasInterface />
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
