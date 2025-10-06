import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const fedorka = localFont({
  src: [
    {
      path: "../public/fonts/Fedorka.ttf",
      weight: "400",
    },
  ],
  variable: "--font-fedorka",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rigveda AI - Ancient Wisdom, Modern Intelligence",
  description: "Explore the Rigveda with AI-powered chat, quizzes, and search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fedorka.variable}>{children}</body>
    </html>
  );
}
