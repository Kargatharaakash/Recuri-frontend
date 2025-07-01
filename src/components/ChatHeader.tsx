"use client";

import { motion } from "framer-motion";
import { Sparkles, Globe } from "lucide-react";

export default function ChatHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="text-center mb-8"
    >
      <div className="flex items-center justify-center mb-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 via-primary-600 to-purple-600 
                        rounded-2xl shadow-large flex items-center justify-center">
            <Sparkles size={28} className="text-white" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full 
                     flex items-center justify-center shadow-medium"
          >
            <Globe size={12} className="text-white" />
          </motion.div>
        </motion.div>
      </div>
      
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-primary-700 to-purple-700 
                 bg-clip-text text-transparent mb-2"
      >
        AI Web Assistant
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 text-base leading-relaxed max-w-md mx-auto text-balance"
      >
        Ask me anything and I'll search the web in real-time to provide you with accurate, 
        up-to-date information and insights.
      </motion.p>
    </motion.div>
  );
}