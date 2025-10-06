"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import TranslationsInterface from "@/components/TranslationsInterface";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function TranslationsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="text-5xl">🌐</span>
              <h1 className="text-5xl md:text-6xl font-bold gradient-text">
                Translations
              </h1>
            </div>
            <p className="text-xl text-coral-800/70">
              View Rigveda Suktas with multiple translations
            </p>
          </div>

          <div className="glass rounded-3xl p-8 max-w-7xl mx-auto shadow-2xl">
            <TranslationsInterface />
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
