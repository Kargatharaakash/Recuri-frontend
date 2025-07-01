"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-8">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
          <Search size={16} />
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-md px-4 py-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-500 font-light">Researching</span>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-slate-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}