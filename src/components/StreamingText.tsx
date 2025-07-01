"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface StreamingTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export default function StreamingText({
  text,
  speed = 30,
  onComplete,
}: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText("");
    setCurrentIndex(0);
  }, [text]);

  return (
    <div className="prose prose-slate max-w-none text-slate-800 text-sm font-light leading-relaxed">
      <ReactMarkdown>{displayedText}</ReactMarkdown>
      {currentIndex < text.length && (
        <span className="inline-block w-2 h-4 bg-slate-400 ml-1 animate-pulse" />
      )}
    </div>
  );
}
