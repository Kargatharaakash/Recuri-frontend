"use client";

import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
          <div className="w-3 h-3 border border-slate-400 rounded-sm animate-pulse" />
        </div>
        <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex items-center space-x-1">
            <span className="text-sm text-slate-500 font-light mr-2">Researching</span>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-slate-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
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