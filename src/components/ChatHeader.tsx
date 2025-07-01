"use client";

import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";

export default function ChatHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="text-center mb-12"
    >
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-br from-slate-900 to-slate-700 
                        rounded-xl flex items-center justify-center shadow-2xl">
            <Search size={24} className="text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full 
                     flex items-center justify-center">
            <Sparkles size={10} className="text-white" />
          </div>
        </div>
      </div>
      
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-light tracking-tight text-slate-900 mb-3"
      >
        Recuri
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-600 text-sm font-light max-w-sm mx-auto leading-relaxed"
      >
        Intelligent web research that remembers, learns, and delivers precise answers instantly.
      </motion.p>
    </motion.div>
  );
}