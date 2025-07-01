"use client";

import { motion } from "framer-motion";
import { User, Search, ExternalLink, Clock } from "lucide-react";

type MessageBubbleProps = {
  role: "user" | "agent";
  text: string;
  index: number;
};

function parseResponse(text: string) {
  if (text.includes("📋 Found similar query:")) {
    const parts = text.split("📋 Found similar query:");
    if (parts.length > 1) {
      const queryMatch = parts[1].match(/'([^']+)'/);
      const similarQuery = queryMatch ? queryMatch[1] : "";

      const results = parts[1]
        .split("•")
        .slice(1)
        .map(item => item.trim())
        .filter(item => item.length > 0)
        .map(item => {
          const lines = item.split("\n").filter(line => line.trim());
          const title = lines[0] || "";
          const description = lines.slice(1).join(" ").trim();
          return { title, description };
        });

      return {
        type: "similar" as const,
        similarQuery,
        results,
      };
    }
  }

  return {
    type: "regular" as const,
    text,
  };
}

export default function MessageBubble({ role, text, index }: MessageBubbleProps) {
  const isUser = role === "user";
  const parsedResponse = !isUser ? parseResponse(text) : null;

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
            <div className="space-y-3">
              {parsedResponse?.type === "similar" ? (
                <>
                  <div className="flex items-center space-x-2 text-xs text-slate-500 mb-3">
                    <Clock size={12} />
                    <span>Found similar query: "{parsedResponse.similarQuery}"</span>
                  </div>
                  <div className="space-y-4">
                    {(parsedResponse.results ?? []).map((result, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-slate-900 text-sm mb-2 leading-snug">
                              {result.title}
                            </h3>
                            {result.description && (
                              <p className="text-xs text-slate-600 font-light leading-relaxed">
                                {result.description}
                              </p>
                            )}
                          </div>
                          <ExternalLink size={12} className="text-slate-400 ml-3 flex-shrink-0 mt-1" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-md px-4 py-3">
                  <p className="text-sm font-light leading-relaxed text-slate-800 whitespace-pre-wrap">
                    {parsedResponse?.text || text}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
