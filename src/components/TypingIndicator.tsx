"use client";

import { motion } from "framer-motion";
import { Search, Globe, Brain, FileText, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const loadingStages = [
  { text: "Analyzing your query...", icon: Brain, duration: 2000 },
  {
    text: "Searching the web for relevant information...",
    icon: Globe,
    duration: 3000,
  },
  { text: "Collecting data from top sources...", icon: Search, duration: 2500 },
  {
    text: "Processing and summarizing content...",
    icon: FileText,
    duration: 2000,
  },
  {
    text: "Finalizing your personalized response...",
    icon: Sparkles,
    duration: 1500,
  },
];

export default function TypingIndicator() {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    let totalTime = 0;

    loadingStages.forEach((stage, index) => {
      const timer = setTimeout(() => {
        setCurrentStage(index);
      }, totalTime);
      timers.push(timer);
      totalTime += stage.duration;
    });

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const CurrentIcon = loadingStages[currentStage]?.icon || Search;

  return (
    <div className="flex justify-start mb-8">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
          <motion.div
            key={currentStage}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentIcon size={16} />
          </motion.div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-md px-4 py-3">
          <div className="flex items-center space-x-2">
            <motion.span
              key={currentStage}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-slate-600 font-light"
            >
              {loadingStages[currentStage]?.text || "Researching..."}
            </motion.span>
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
