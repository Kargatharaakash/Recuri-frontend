"use client";

import { motion } from "framer-motion";
import { User, Search } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy } from "lucide-react";
import { useState } from "react";

type MessageBubbleProps = {
  role: "user" | "agent";
  text: string;
  index: number;
};

export default function MessageBubble({ role, text, index }: MessageBubbleProps) {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-8`}
    >
      <div className={`flex items-start space-x-4 max-w-[85%] ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser 
              ? "bg-slate-900 text-white" 
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {isUser ? <User size={16} /> : <Search size={16} />}
        </div>
        
        <div className={`${isUser ? "text-right" : ""}`}>
          {isUser ? (
            <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl rounded-tr-md">
              <p className="text-sm font-light leading-relaxed">{text}</p>
            </div>
          ) : (
            <div className="relative group">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-md px-4 py-3 prose prose-slate max-w-none text-slate-800 text-sm font-light leading-relaxed whitespace-pre-wrap">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
              </div>
              <button
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition bg-slate-200 hover:bg-slate-300 rounded p-1"
                onClick={handleCopy}
                title="Copy"
              >
                {copied ? (
                  <span className="text-xs text-emerald-600 font-medium">Copied!</span>
                ) : (
                  <Copy size={14} className="text-slate-500" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
