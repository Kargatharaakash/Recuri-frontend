"use client";

import { motion } from "framer-motion";
import { User, Search } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Copy } from "lucide-react";
import { useState } from "react";
import StreamingText from "./StreamingText";

type MessageBubbleProps = {
  role: "user" | "agent";
  text: string;
  index: number;
};

export default function MessageBubble({
  role,
  text,
  index,
}: MessageBubbleProps) {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
      <div
        className={`flex items-start space-x-3 sm:space-x-4 max-w-[90%] md:max-w-[70%] ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}
      >
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"
          }`}
        >
          {isUser ? <User size={16} /> : <Search size={16} />}
        </div>

        <div className={`${isUser ? "text-right" : ""}`}>
          {isUser ? (
            <div className="bg-slate-900 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-2xl rounded-tr-md break-words">
              <p className="text-sm font-light leading-relaxed">{text}</p>
            </div>
          ) : (
            <div className="relative group">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-md px-3 py-2 sm:px-4 sm:py-3 whitespace-pre-wrap break-words relative">
                <StreamingText text={text} speed={5} />
                <button
                  className="absolute top-2 right-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg p-2 shadow-sm hover:shadow-md transition-all duration-200
                    opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                  onClick={handleCopy}
                  title={copied ? "Copied!" : "Copy to clipboard"}
                >
                  {copied ? (
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                      <span className="text-xs text-emerald-600 font-medium">
                        Copied
                      </span>
                    </div>
                  ) : (
                    <Copy
                      size={14}
                      className="text-slate-600 hover:text-slate-800"
                    />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
