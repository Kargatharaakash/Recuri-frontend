"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MessageBubble from "../components/MessageBubble";
import TypingIndicator from "../components/TypingIndicator";
import ChatInput from "../components/ChatInput";
import { Search, Sparkles } from "lucide-react";

type Message = {
  role: "user" | "agent";
  text: string;
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
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
      const res = await fetch("https://recuri-backend.onrender.com/api/query", {
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
          text: data.result || "I couldn't find comprehensive information for your query. Please try rephrasing or asking something more specific." 
        },
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { 
          role: "agent", 
          text: "I'm experiencing connectivity issues. Please try again in a moment." 
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-900 to-slate-700 
                            rounded-lg flex items-center justify-center">
                <Search size={16} className="text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full 
                         flex items-center justify-center">
                <Sparkles size={6} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-medium text-slate-900">Recuri</h1>
              <p className="text-xs text-slate-500 font-light">Intelligent Web Research</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <div 
          ref={chatContainerRef}
          className="h-full overflow-y-auto"
        >
          <div className="max-w-4xl mx-auto px-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center max-w-md"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-900 to-slate-700 
                                rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Search size={28} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-light text-slate-900 mb-3">
                    How can I help you research today?
                  </h2>
                  <p className="text-slate-600 text-sm font-light leading-relaxed">
                    I can search the web, analyze information, and remember context to provide you with precise, intelligent answers.
                  </p>
                </motion.div>
              </div>
            ) : (
              <div className="py-8">
                <AnimatePresence mode="popLayout">
                  {messages.map((msg, i) => (
                    <MessageBubble
                      key={i}
                      role={msg.role}
                      text={msg.text}
                      index={i}
                    />
                  ))}
                  {loading && <TypingIndicator />}
                </AnimatePresence>
                <div ref={chatEndRef} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <ChatInput onSendMessage={sendMessage} loading={loading} />
        </div>
      </div>
    </div>
  );
}