"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 ">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src="/logo.png"
              alt="Nirvāṇa"
              className="w-14 h-14 object-contain"
            />
            <span className="text-2xl font-bold gradient-text">Nirvāṇa</span>
          </div>
          <p className="text-coral-800/70 mb-4">
            Ancient Wisdom, Modern Intelligence
          </p>
          <p className="text-sm text-coral-800/50">
            Built by{" "}
            <span className="font-bold text-coral-600">Tarin Agarwal</span> and{" "}
            <span className="font-bold text-coral-600">Srividya Davuluri</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
