"use client";

import { useEffect, useState } from "react";
import { RigvedaVerse } from "@/types/rigveda";
import { loadAllVerses } from "@/lib/rigveda-data";
import Navbar from "@/components/Navbar";
import ExploreInterface from "@/components/ExploreInterface";
import ScrollToTop from "@/components/ScrollToTop";

export default function ExplorePage() {
  const [verses, setVerses] = useState<RigvedaVerse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllVerses()
      .then(setVerses)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="text-5xl">🔍</span>
              <h1 className="text-5xl md:text-6xl font-bold gradient-text">
                Explore Suktas
              </h1>
            </div>
            <p className="text-xl text-orange-800/70">
              Search and browse through all Rigveda Suktas
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">🕉️</span>
                </div>
              </div>
              <p className="mt-6 text-lg text-orange-800/70 animate-pulse">
                Loading sacred texts...
              </p>
            </div>
          ) : (
            <div className="glass rounded-3xl p-8 max-w-7xl mx-auto shadow-2xl">
              <ExploreInterface verses={verses} />
            </div>
          )}
        </div>
      </main>

      <ScrollToTop />
    </div>
  );
}
