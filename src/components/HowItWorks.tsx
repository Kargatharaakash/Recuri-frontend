"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Info, X, ZoomIn, ZoomOut } from "lucide-react";
import ReactMarkdown from "react-markdown";

const howItWorksContent = `# Recuri Web Query Agent — Full System Flow

This document explains the **end-to-end flow** of the Recuri Web Query Agent, covering both the frontend (Next.js/React) and backend (FastAPI + Playwright + LLMs + Pinecone).

---

## 🧑‍💻 1. User Interaction (Frontend)

- **User opens the chatbot UI** (Next.js, React, Tailwind).
- User types a query (e.g., "Top 10 AI tools for productivity") and hits send.
- The UI:
  - Shows an animated "typing" indicator (like ChatGPT).
  - Sends a POST request to \`/api/query\` on the backend (Render/Railway).

---

## 🌐 2. API Proxy (Frontend)

- The Next.js API route (\`/api/query.ts\`) proxies the request to the backend FastAPI endpoint.
- This allows for local development and CORS-free production.

---

## 🚀 3. Backend Query Flow (FastAPI + agent.py)

### a. **Validation**
- The backend receives the query.
- The agent uses Groq LLM (or Gemini fallback) to classify the query as VALID or INVALID.
- If INVALID, returns a message: "❌ This is not a valid search query..."

### b. **Similarity Search (Pinecone)**
- If VALID, the agent generates an embedding for the query (via Hugging Face Inference API).
- It checks Pinecone for a similar query (vector search).
- If a valid, non-error result is found, it is returned immediately.

### c. **Web Scraping (Playwright)**
- If no valid cached result, the agent launches Playwright (headless Chromium).
- It scrapes the first 5 pages of DuckDuckGo search results for the query.
- Extracts titles and links from the results.

### d. **Summarization (Groq LLM or Gemini)**
- The agent sends the scraped content + original query to Groq LLM (or Gemini fallback).
- The LLM generates a human-readable, markdown-formatted summary.

### e. **Result Storage**
- The agent saves the query, embedding, and result in Pinecone for future similarity search.

### f. **Response**
- The backend returns the summary (or error) as \`{ "result": ... }\` to the frontend.

---

## 💬 4. Frontend Display

- The frontend receives the result.
- Uses \`react-markdown\` and \`remark-gfm\` to render the markdown with full styling (bold, lists, links, etc.).
- Shows the response in a chat bubble, with a copy-to-clipboard button.
- The UI remains responsive and animated, just like ChatGPT.

---

## 🛡️ 5. Health & Keepalive

- \`/api/health\` endpoint is used for uptime checks and keepalive scripts to prevent Render/Railway from sleeping.

---

## 🛠️ 6. Deployment Notes

- **Dockerfile** installs Playwright and Chromium for browser scraping.
- **render.yaml** or Railway config ensures Playwright is installed at build time.
- All environment variables (API keys, tokens) are loaded and masked in logs.

---

## 📊 7. Error Handling

- If Playwright or web scraping fails, the agent falls back to requests+BeautifulSoup.
- If all scraping fails, a clear error is returned and not cached in Pinecone.
- Only valid, non-error results are cached and returned for similar queries.

---

## 🧩 8. Extensibility

- The agent is modular: you can swap out LLMs, search engines, or vector DBs as needed.
- The frontend is ready for further UI/UX enhancements (e.g., streaming, avatars, etc.).

---

## 📊 Visual System Architecture

The following diagrams illustrate the complete system flow and decision logic:

### Component Flow Overview
This diagram shows the three main processing stages: input validation, embeddings/search, and result handling.

![System Component Flow](https://cdn.builder.io/api/v1/image/assets%2F328c7bb534cd44c7a815863608f1f2d3%2F416fc05ab7384eebac046255299e9402?format=webp&width=800)

### Detailed Process Flow
Complete technical flow from CLI interaction through query validation, similarity search, web scraping, and result storage.

![Detailed System Flow](https://cdn.builder.io/api/v1/image/assets%2F328c7bb534cd44c7a815863608f1f2d3%2Fba791fb166dd4662a36c0e66bff31300?format=webp&width=800)

### Decision Tree Logic
Simplified decision flow showing query validation and processing paths.

![Decision Logic Flow](https://cdn.builder.io/api/v1/image/assets%2F328c7bb534cd44c7a815863608f1f2d3%2F8c7baef4573e4e3f95eafe6e01a34c80?format=webp&width=800)

---

**This flow ensures a robust, production-ready, and user-friendly web query agent, meeting all Ripplica task requirements.**`;

interface HowItWorksProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function HowItWorksButton({ isOpen, setIsOpen }: HowItWorksProps) {
  return (
    <motion.button
      onClick={() => setIsOpen(!isOpen)}
      className="bg-slate-900 text-white px-3 py-2 rounded-lg shadow-md hover:bg-slate-800 transition-colors flex items-center justify-center sm:space-x-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="block sm:hidden">
        <Info size={18} />
      </span>
      <span className="hidden sm:flex items-center space-x-2">
        <Info size={14} />
        <span className="text-sm font-medium">How it works</span>
        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </span>
    </motion.button>
  );
}

export default function HowItWorks({ isOpen, setIsOpen }: HowItWorksProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImgSrc, setModalImgSrc] = useState<string | null>(null);
  const [modalImgAlt, setModalImgAlt] = useState<string | null>(null);
  // Modal dialog for enlarged image (no zoom controls)
  const ImageModal = () =>
    modalOpen && modalImgSrc ? (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="relative bg-white rounded-lg shadow-2xl p-4 max-w-3xl w-full flex flex-col items-center">
          {/* Close button */}
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-2 right-2 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
            aria-label="Close"
          >
            <X size={24} className="text-slate-700" />
          </button>
          {/* Download button in modal */}
          <a
            href={modalImgSrc}
            download={modalImgAlt ? `${modalImgAlt}` : "image"}
            className="absolute top-2 left-2 bg-white/90 hover:bg-white text-slate-700 rounded-full p-2 shadow transition-colors z-10"
            title="Download image"
            onClick={e => e.stopPropagation()}
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 5v14m0 0l-5-5m5 5l5-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <img
            src={modalImgSrc}
            alt={modalImgAlt || ""}
            className="max-h-[70vh] w-auto rounded-lg border border-slate-200 shadow"
            style={{
              objectFit: "contain",
            }}
          />
          {modalImgAlt && (
            <span className="block text-xs text-slate-500 mt-2 text-center italic">
              {modalImgAlt}
            </span>
          )}
        </div>
      </div>
    ) : null;

  return (
    <>
      <ImageModal />
      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Sidebar Content */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-full max-w-full sm:w-[480px] bg-white shadow-2xl z-50 overflow-hidden"
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-3 sm:p-6 border-b border-gray-200 bg-slate-50">
                  <div className="flex items-center space-x-2">
                    <Info size={20} className="text-slate-700" />
                    <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                      System Overview
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <ChevronLeft size={20} className="text-slate-600" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-6">
                  <div className="prose prose-slate prose-sm max-w-none">
                    <ReactMarkdown
                      components={{
                        h1: ({ node, ...props }) => (
                          <h1
                            className="text-lg font-bold text-slate-900 mb-3"
                            {...props}
                          />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2
                            className="text-base font-semibold text-slate-800 mb-2 mt-4"
                            {...props}
                          />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3
                            className="text-sm font-semibold text-slate-700 mb-2 mt-3"
                            {...props}
                          />
                        ),
                        p: ({ node, children, ...props }) => {
                          // Check if this paragraph contains an image
                          const hasImage = React.Children.toArray(
                            children,
                          ).some(
                            (child) =>
                              React.isValidElement(child) &&
                              (child.type === "img" ||
                                (typeof child === "object" &&
                                  child.props &&
                                  child.props.src)),
                          );

                          if (hasImage) {
                            // If paragraph contains an image, render as div to avoid nesting issues
                            return (
                              <div
                                className="text-sm text-slate-600 mb-3 leading-relaxed"
                                {...props}
                              >
                                {children}
                              </div>
                            );
                          }

                          return (
                            <p
                              className="text-sm text-slate-600 mb-3 leading-relaxed"
                              {...props}
                            >
                              {children}
                            </p>
                          );
                        },
                        ul: ({ node, ...props }) => (
                          <ul
                            className="text-sm text-slate-600 mb-3 pl-4"
                            {...props}
                          />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="mb-1" {...props} />
                        ),
                        code: ({ inline = false, ...props }: { inline?: boolean } & React.HTMLAttributes<HTMLElement>) =>
                          inline ? (
                            <code
                              className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded text-xs font-mono"
                              {...props}
                            />
                          ) : (
                            <code
                              className="block bg-slate-100 text-slate-800 p-2 rounded text-xs font-mono overflow-x-auto"
                              {...props}
                            />
                          ),
                        strong: ({ node, ...props }) => (
                          <strong
                            className="font-semibold text-slate-800"
                            {...props}
                          />
                        ),
                        hr: ({ node, ...props }) => (
                          <hr className="my-4 border-slate-200" {...props} />
                        ),
img: ({ node, src, alt, ...props }) => (
  <span className="block my-6 relative group">
    <img
      src={src}
      alt={alt}
      className="w-full rounded-lg border border-slate-200 shadow-sm cursor-pointer transition-transform group-hover:scale-105"
      style={{ transition: "transform 0.2s" }}
      onClick={() => {
        setModalImgSrc(src || "");
        setModalImgAlt(alt || "");
        setModalOpen(true);
      }}
    />
    {/* Download button */}
    <a
      href={src}
      download={alt ? `${alt}` : "image"}
      className="absolute top-2 left-2 bg-white/90 hover:bg-white text-slate-700 rounded-full p-1 shadow transition-colors z-10"
      title="Download image"
      onClick={e => e.stopPropagation()}
    >
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 5v14m0 0l-5-5m5 5l5-5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
    {/* Tap to enlarge icon and text */}
    <span className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 text-xs text-white rounded px-2 py-1 opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none select-none z-10">
      <ZoomIn size={14} className="inline-block mr-1" />
      Tap to enlarge
    </span>
    {alt && (
      <span className="block text-xs text-slate-500 mt-2 text-center italic">
        {alt}
      </span>
    )}
  </span>
),
                      }}
                    >
                      {howItWorksContent}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
