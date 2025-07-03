"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MessageBubble from "../components/MessageBubble";
import TypingIndicator from "../components/TypingIndicator";
import ChatInput from "../components/ChatInput";
import HowItWorks, { HowItWorksButton } from "../components/HowItWorks";
import { Search, Sparkles, Github } from "lucide-react";

type Source = {
  title: string;
  url: string;
};

type Message = {
  role: "user" | "agent";
  text: string;
  sources?: Source[];
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (userInput: string) => {
    const userMsg: Message = { role: "user", text: userInput };
    setMessages((msgs) => [...msgs, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userInput }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        {
          role: "agent",
          text:
            data.result ||
            "I couldn't find comprehensive information for your query. Please try rephrasing or asking something more specific.",
          sources: Array.isArray(data.sources) ? data.sources : undefined,
        },
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        {
          role: "agent",
          text: "I'm experiencing connectivity issues. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <HowItWorks isOpen={howItWorksOpen} setIsOpen={setHowItWorksOpen} />
      {/* Header */}
      <div className="flex-shrink-0 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="w-full px-3 py-2 sm:px-6 sm:py-4 relative">
          {/* 
            Header row: always flex-row, align items center, 
            and space between for mobile and desktop.
            Recuri is always in the center of the screen, HowItWorks always left, GitHub always right.
          */}
          <div className="flex flex-row items-center justify-between gap-2 relative">
            {/* Left: How it works */}
            <div className="flex items-center z-10">
              <HowItWorksButton
                isOpen={howItWorksOpen}
                setIsOpen={setHowItWorksOpen}
              />
            </div>
            {/* Center: Recuri title absolutely centered on screen */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none">
              <h1
                className="text-2xl sm:text-3xl font-black text-slate-900 text-center"
                style={{
                  fontFamily: "'Playfair Display', 'Georgia', serif",
                  letterSpacing: "0.01em",
                }}
              >
                Recuri
              </h1>
            </div>
            {/* Right: GitHub links (always visible, stacked for desktop, row for mobile) */}
            <div className="flex items-center space-x-2 sm:space-x-4 z-10">
              <a
                href="https://github.com/Kargatharaakash/Recuri-frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col sm:flex-col items-center space-y-0 sm:space-y-1 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                aria-label="Frontend GitHub"
              >
                <Github
                  size={18}
                  className="text-slate-600 group-hover:text-slate-900"
                />
                <span className="hidden sm:block text-xs text-slate-500 group-hover:text-slate-700 font-medium">
                  Frontend
                </span>
              </a>
              <a
                href="https://github.com/Kargatharaakash/Recuri-backend"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col sm:flex-col items-center space-y-0 sm:space-y-1 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                aria-label="Backend GitHub"
              >
                <Github
                  size={18}
                  className="text-slate-600 group-hover:text-slate-900"
                />
                <span className="hidden sm:block text-xs text-slate-500 group-hover:text-slate-700 font-medium">
                  Backend
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <div ref={chatContainerRef} className="h-full overflow-y-auto">
          <div className="w-full px-3 sm:px-6">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full min-h-[300px] sm:min-h-[400px]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center max-w-md mx-auto"
                >
                  <div
                    className="w-20 h-20 bg-gradient-to-br from-slate-900 to-slate-700
                                rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl"
                  >
                    <Search size={32} className="text-white" />
                  </div>
                  <h2 className="text-3xl font-light text-slate-900 mb-4">
                    How can I help you research today?
                  </h2>
                  <p className="text-slate-600 text-base font-light leading-relaxed">
                    I can search the web, analyze information, and remember
                    context to provide you with precise, intelligent answers.
                  </p>
                </motion.div>
              </div>
            ) : (
              <div className="py-6 sm:py-8">
                <AnimatePresence mode="popLayout">
                  {messages.map((msg, i) => (
                    <MessageBubble
                      key={i}
                      role={msg.role}
                      text={msg.text}
                      index={i}
                      sources={msg.sources}
                    />
                  ))}
                  {loading && <TypingIndicator />}
                </AnimatePresence>

              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t border-gray-100 bg-white">
        <div className="w-full px-3 py-3 sm:px-6 sm:py-4">
          <ChatInput onSendMessage={sendMessage} loading={loading} />
        </div>
      </div>
    </div>
  );
}

