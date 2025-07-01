"use client";

import { motion } from "framer-motion";
import { User, Bot } from "lucide-react";

type MessageBubbleProps = {
  role: "user" | "agent";
  text: string;
  index: number;
};

export default function MessageBubble({ role, text, index }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div className={`flex items-end space-x-2 max-w-[85%] ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser 
              ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-medium" 
              : "bg-white border-2 border-gray-200 text-primary-600 shadow-soft"
          }`}
        >
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`message-bubble ${isUser ? "user-message" : "agent-message"}`}
          style={{
            borderBottomLeftRadius: isUser ? "16px" : "4px",
            borderBottomRightRadius: isUser ? "4px" : "16px",
          }}
        >
          <p className={`text-sm leading-relaxed ${isUser ? "text-white" : "text-gray-800"}`}>
            {text}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}