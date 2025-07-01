import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recuri - Intelligent Web Research Assistant",
  description: "Advanced AI-powered web research that remembers, learns, and delivers precise answers instantly. Built for the Ripplica Interview Task.",
  keywords: "AI, web research, intelligent search, query agent, Ripplica",
  authors: [{ name: "Recuri Intelligence" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}