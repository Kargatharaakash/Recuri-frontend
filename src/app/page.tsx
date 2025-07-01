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
      text: "Hello! I'm your AI web assistant. I can search the internet, analyze information, and provide you with comprehensive answers to any question you have. What would you like to know today?",
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
          text: data.result || "I apologize, but I couldn't find a comprehensive answer to your question. Please try rephrasing or asking something else." 
        },
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { 
          role: "agent", 
          text: "I'm experiencing some technical difficulties at the moment. Please try again in a few moments, or rephrase your question." 
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] 
                    [background-size:24px_24px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-4xl mx-auto"
        >
          {/* Chat Container */}
          <div className="glass-effect rounded-3xl shadow-large p-8 h-[85vh] flex flex-col">
            <ChatHeader />
            
            {/* Messages Area */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto chat-scroll px-2 -mx-2"
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
            <div className="mt-6 pt-6 border-t border-gray-200/60">
              <ChatInput onSendMessage={sendMessage} loading={loading} />
            </div>
          </div>
          
          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-6"
          >
            <p className="text-sm text-gray-500">
              Built with Next.js, Tailwind CSS, and Framer Motion • 
              <span className="text-primary-600 font-medium"> Powered by Advanced AI</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}