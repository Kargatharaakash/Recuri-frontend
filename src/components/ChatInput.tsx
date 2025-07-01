"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  loading: boolean;
};

export default function ChatInput({ onSendMessage, loading }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      onSubmit={handleSubmit}
      className="relative"
    >
      <div className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          disabled={loading}
          className="w-full pl-6 pr-14 py-4 bg-white border border-gray-200/60 rounded-2xl 
                   focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400
                   disabled:opacity-50 disabled:cursor-not-allowed
                   text-gray-800 placeholder-gray-400
                   shadow-soft hover:shadow-medium transition-all duration-200
                   text-base leading-relaxed"
          autoFocus
        />
        
        <motion.button
          type="submit"
          disabled={loading || !input.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-2 p-2.5 bg-gradient-to-br from-primary-500 to-primary-600 
                   text-white rounded-xl shadow-medium hover:shadow-large
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                   transition-all duration-200 group"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Send size={18} className="group-hover:translate-x-0.5 transition-transform" />
          )}
        </motion.button>
      </div>
      
      <div className="flex items-center justify-between mt-3 px-1">
        <p className="text-xs text-gray-400">
          Powered by advanced AI • Real-time web search
        </p>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-subtle"></div>
          <span className="text-xs text-gray-400">Online</span>
        </div>
      </div>
    </motion.form>
  );
}