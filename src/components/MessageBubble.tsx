"use client";

import { motion } from "framer-motion";
import { User, Search } from "lucide-react";

type MessageBubbleProps = {
  role: "user" | "agent";
  text: string;
  index: number;
};

export default function MessageBubble({ role, text, index }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}
    >
      <div className={`flex items-start space-x-3 max-w-[80%] ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
        <div
          className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${
            isUser 
              ? "bg-slate-900 text-white" 
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {isUser ? <User size={14} /> : <Search size={14} />}
        </div>
        
        <div
          className={`px-4 py-3 rounded-xl ${
            isUser 
              ? "bg-slate-900 text-white" 
              : "bg-slate-50 text-slate-800 border border-slate-200"
          }`}
        >
          <p className="text-sm leading-relaxed font-light">
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}