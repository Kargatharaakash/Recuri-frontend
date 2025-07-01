import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Web Assistant - Premium Chat Experience",
  description: "Experience the future of AI-powered web search and conversation with our premium chatbot interface.",
  keywords: "AI, chatbot, web search, artificial intelligence, premium UI",
  authors: [{ name: "Premium AI Solutions" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0ea5e9",
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