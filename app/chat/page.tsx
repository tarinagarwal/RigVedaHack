"use client";

import { useEffect, useState } from "react";
import { RigvedaVerse } from "@/types/rigveda";
import { loadAllVerses } from "@/lib/rigveda-data";
import Navbar from "@/components/Navbar";
import ChatInterface from "@/components/ChatInterface";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function ChatPage() {
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
              <span className="text-5xl">💬</span>
              <h1 className="text-5xl md:text-6xl font-bold gradient-text">
                AI Chat
              </h1>
            </div>
            <p className="text-xl text-coral-800/70">
              Ask questions and get intelligent answers about the Rigveda
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-coral-200 border-t-coral-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">🕉️</span>
                </div>
              </div>
              <p className="mt-6 text-lg text-coral-800/70 animate-pulse">
                Loading sacred texts...
              </p>
            </div>
          ) : (
            <div className="glass rounded-3xl p-8 max-w-7xl mx-auto shadow-2xl">
              <ChatInterface verses={verses} />
            </div>
          )}
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
