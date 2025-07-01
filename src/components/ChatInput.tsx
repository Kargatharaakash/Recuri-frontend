"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Loader2 } from "lucide-react";

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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit}
      className="relative"
    >
      <div className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me to research anything..."
          disabled={loading}
          className="w-full pl-5 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl 
                   focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400
                   disabled:opacity-50 disabled:cursor-not-allowed
                   text-slate-800 placeholder-slate-500
                   transition-all duration-200 text-sm font-light"
          autoFocus
        />
        
        <motion.button
          type="submit"
          disabled={loading || !input.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="absolute right-2 p-2 bg-slate-900 text-white rounded-lg 
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                   transition-all duration-200"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <ArrowUp size={16} />
          )}
        </motion.button>
      </div>
      
      <div className="flex items-center justify-between mt-3 px-1">
        <p className="text-xs text-slate-400 font-light">
          Intelligent • Contextual • Memorable
        </p>
        <div className="flex items-center space-x-1.5">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
          <span className="text-xs text-slate-400 font-light">Live</span>
        </div>
      </div>
    </motion.form>
  );
}