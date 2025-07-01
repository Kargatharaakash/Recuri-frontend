"use client";

import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="message-bubble agent-message">
        <div className="flex items-center space-x-1">
          <span className="text-sm text-gray-500 mr-2">AI is thinking</span>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}