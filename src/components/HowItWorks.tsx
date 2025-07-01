"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
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

**This flow ensures a robust, production-ready, and user-friendly web query agent, meeting all Ripplica task requirements.**`;

export default function HowItWorks() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-slate-900 text-white p-3 rounded-xl shadow-lg hover:bg-slate-800 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center space-x-2">
          <Info size={16} />
          <span className="text-sm font-medium">How it works</span>
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </div>
      </motion.button>

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
              className="fixed left-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-hidden"
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-slate-50">
                  <div className="flex items-center space-x-2">
                    <Info size={20} className="text-slate-700" />
                    <h2 className="text-lg font-semibold text-slate-900">
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
                <div className="flex-1 overflow-y-auto p-6">
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
                        p: ({ node, ...props }) => (
                          <p
                            className="text-sm text-slate-600 mb-3 leading-relaxed"
                            {...props}
                          />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul
                            className="text-sm text-slate-600 mb-3 pl-4"
                            {...props}
                          />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="mb-1" {...props} />
                        ),
                        code: ({ node, inline, ...props }) =>
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
