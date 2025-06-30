"use client";

import React, { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "agent";
  text: string;
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      text: "👋 Hi! Ask me anything and I'll search the web, summarize, and answer you.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { role: "agent", text: data.result || "Sorry, I couldn't find an answer." },
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { role: "agent", text: "❌ Error: Could not reach backend API." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex flex-col items-center py-8">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 flex flex-col h-[80vh]">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Web Query Chatbot</h1>
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-1">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-line text-base ${
                  msg.role === "user"
                    ? "bg-blue-100 text-blue-900"
                    : "bg-gray-200 text-gray-800"
                }`}
                style={{
                  borderBottomLeftRadius: msg.role === "user" ? "1rem" : "0.25rem",
                  borderBottomRightRadius: msg.role === "user" ? "0.25rem" : "1rem",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            autoFocus
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading || !input.trim()}
          >
            {loading ? "..." : "Send"}
          </button>
        </form>
        <div className="text-xs text-gray-400 mt-2 text-center">
          Powered by Gemini, Pinecone, Playwright, Next.js
        </div>
      </div>
    </div>
  );
}
