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
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message Recuri..."
          disabled={loading}
          className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-xl 
                   focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300
                   disabled:opacity-50 disabled:cursor-not-allowed
                   text-slate-800 placeholder-slate-500
                   transition-all duration-200 text-sm shadow-sm"
          autoFocus
        />
        
        <motion.button
          type="submit"
          disabled={loading || !input.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-2 p-2 bg-slate-900 text-white rounded-lg 
                   disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100
                   transition-all duration-200 shadow-sm"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <ArrowUp size={16} />
          )}
        </motion.button>
      </div>
    </form>
  );
}