"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

const SUGGESTED_FAQS = [
  "What is AetherFlow ERP?",
  "Tell me about VisionGuard QA",
  "How does TalentScout work?",
  "What are your services?",
  "How can I contact you?",
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFaqs, setShowFaqs] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  // Initialize welcome message
  useEffect(() => {
    setMessages([
      {
        id: "m0",
        sender: "bot",
        text: "Hello! I'm the AI-Solutions Virtual Assistant powered by advanced AI. I can help you with:\n\n• Product information (AetherFlow ERP, VisionGuard QA, TalentScout)\n• Service details and pricing\n• Deployment schedules\n• General inquiries\n\nHow can I assist you today?",
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const callGroqAPI = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      return data.response || "I apologize, but I'm having trouble processing your request. Please try again.";
    } catch (error) {
      console.error("GROQ API error:", error);
      return "I'm experiencing a technical issue. Please try again or contact our support team.";
    }
  };

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMsg: Message = {
      id: `m-${Date.now()}-u`,
      sender: "user",
      text: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setShowFaqs(false);
    setIsLoading(true);

    try {
      const botResponse = await callGroqAPI(messageText);

      const botMsg: Message = {
        id: `m-${Date.now()}-b`,
        sender: "bot",
        text: botResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: `m-${Date.now()}-err`,
        sender: "bot",
        text: "I apologize for the inconvenience. Please try again or contact our team directly.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Trigger Button - Fixed visibility */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white flex items-center justify-center shadow-2xl shadow-violet-600/40 hover:shadow-violet-600/60 hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-white"
          aria-label="Open AI Customer Assistant"
          aria-haspopup="dialog"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {/* Notification dot */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
            <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
          </span>
        </button>
      )}

      {/* Chat Panel - Fixed visibility and styling */}
      {isOpen && (
        <div
          className="w-[380px] h-[560px] bg-white rounded-3xl shadow-2xl shadow-black/20 border border-zinc-200 flex flex-col overflow-hidden animate-fade-in-up"
          role="dialog"
          aria-label="AI Customer Assistant Chatbox"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold leading-none">AI-Solutions Assistant</h3>
                <span className="text-xs text-white/80 flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Online &middot; Powered by AI
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white rounded-lg p-1.5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
              aria-label="Close Assistant"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Body */}
          <div
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 bg-zinc-50 scroll-smooth"
            aria-live="polite"
          >
            {messages.map((msg) => {
              const isBot = msg.sender === "bot";
              return (
                <div key={msg.id} className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      isBot
                        ? "bg-white border border-zinc-200 text-zinc-800 rounded-tl-md"
                        : "bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-tr-md"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  </div>
                </div>
              );
            })}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-zinc-200 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                    <span className="text-xs text-zinc-500 ml-1">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            {/* FAQ Suggestions */}
            {showFaqs && messages.length <= 1 && (
              <div className="space-y-2 pt-2">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-1">Suggested Questions</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_FAQS.map((faq, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSend(faq)}
                      className="px-3 py-2 text-xs font-medium text-violet-700 bg-violet-50 border border-violet-200 rounded-xl hover:bg-violet-100 hover:border-violet-300 transition-colors text-left"
                    >
                      {faq}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-zinc-200 bg-white">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                aria-label="Type message to assistant"
                disabled={isLoading}
                className="flex-1 bg-zinc-100 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-zinc-900 placeholder:text-zinc-400 disabled:opacity-50 transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-4 py-3 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-600/20"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
