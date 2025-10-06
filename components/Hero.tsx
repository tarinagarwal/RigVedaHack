"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-float">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-orange-900">
              AI-Powered Vedic Learning
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Rigveda AI</span>
          </h1>

          <p className="text-2xl md:text-3xl text-orange-900/80 mb-4 font-medium">
            Ancient Wisdom Meets Modern Intelligence
          </p>

          <p className="text-lg md:text-xl text-orange-800/60 mb-12 max-w-3xl mx-auto leading-relaxed">
            Explore 3,500 years of sacred knowledge through AI-powered
            conversations, interactive quizzes, and intelligent search.
            Experience the Rigveda like never before.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/chat">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-lg px-8 py-6 btn-hover shadow-2xl"
              >
                Start Exploring
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Button>
            </Link>
            <Button
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-orange-400 text-orange-900 hover:bg-orange-100 btn-hover"
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="glass-dark rounded-2xl p-6 card-hover">
              <div className="text-4xl font-bold gradient-text mb-2">10</div>
              <div className="text-sm text-orange-800/70">Mandalas</div>
            </div>
            <div className="glass-dark rounded-2xl p-6 card-hover">
              <div className="text-4xl font-bold gradient-text mb-2">1000+</div>
              <div className="text-sm text-orange-800/70">Suktas</div>
            </div>
            <div className="glass-dark rounded-2xl p-6 card-hover">
              <div className="text-4xl font-bold gradient-text mb-2">AI</div>
              <div className="text-sm text-orange-800/70">Powered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      
    </section>
  );
}
