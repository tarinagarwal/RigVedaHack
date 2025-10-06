import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nirvāṇa - Ancient Wisdom, Modern Intelligence",
  description: "Explore the Rigveda with AI-powered chat, quizzes, and search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
