import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Query Chatbot",
  description: "Ask anything, get web-powered answers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
