"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/chat", label: "Chat" },
    { href: "/quiz", label: "Quiz" },
    { href: "/explore", label: "Explore" },
    { href: "/translations", label: "Translations" },
    { href: "/mantras", label: "Mantras" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-coral-200/50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 cursor-pointer">
            <img
              src="/logo.png"
              alt="Nirvāṇa"
              className="w-16 h-16 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold gradient-text">Nirvāṇa</h1>
              <p className="text-xs text-coral-600/70">
                Ancient Wisdom, Modern Intelligence
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActive(link.href)
                    ? "bg-gradient-to-r from-coral-500 to-coral-600 text-coral-50 shadow-lg scale-105"
                    : "text-coral-900 hover:text-coral-600 hover:bg-coral-100/80 hover:backdrop-blur-sm hover:scale-105"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-coral-100/80 backdrop-blur-sm transition-all duration-300 hover:scale-110"
          >
            <svg
              className="w-6 h-6 text-coral-900"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-coral-200/50 bg-white/80 backdrop-blur-lg rounded-b-2xl -mx-4 px-4 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block w-full text-left px-4 py-3 rounded-xl transition-all ${
                  isActive(link.href)
                    ? "bg-gradient-to-r from-coral-500 to-coral-600 text-coral-50 shadow-lg"
                    : "text-coral-900 hover:bg-coral-100/80 backdrop-blur-sm"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
