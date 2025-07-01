"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatHeader from "../components/ChatHeader";
import MessageBubble from "../components/MessageBubble";
import TypingIndicator from "../components/TypingIndicator";
import ChatInput from "../components/ChatInput";

type Message = {
  role: "user" | "agent";
  text: string;
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      text: "I'm Recuri, your intelligent web research assistant. I search, analyze, and remember information to provide you with precise, contextual answers. What would you like to research today?",
    },
  ]);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] 
                    bg-[size:24px_24px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-3xl mx-auto"
        >
          {/* Chat Container */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 h-[82vh] flex flex-col">
            <ChatHeader />
            
            {/* Messages Area */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto scrollbar-hide px-1 -mx-1"
            >
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
            
            {/* Input Area */}
            <div className="mt-6 pt-6 border-t border-slate-200/60">
              <ChatInput onSendMessage={sendMessage} loading={loading} />
            </div>
          </div>
          
          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-6"
          >
            <p className="text-xs text-slate-500 font-light">
              Ripplica Interview Task • 
              <span className="text-slate-700"> Advanced Web Intelligence</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}