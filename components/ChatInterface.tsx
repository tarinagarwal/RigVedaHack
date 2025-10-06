"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RigvedaVerse, ChatMessage } from "@/types/rigveda";

interface Props {
  verses: RigvedaVerse[];
}

export default function ChatInterface({ verses }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Namaste! 🙏 I am your Rigveda AI assistant. Ask me anything about the Rigveda, its verses, meanings, or historical context.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          verses: verses.slice(0, 10),
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, I encountered an error: ${error.message}. Please try again.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200/50 overflow-hidden">
        <ScrollArea className="h-[500px] p-6" ref={scrollRef}>
          <div className="space-y-6">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                } animate-in fade-in slide-in-from-bottom-4 duration-500`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-5 shadow-lg ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-orange-500 to-amber-600 text-white"
                      : "bg-white border border-orange-100"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">🕉️</span>
                      <span className="text-xs font-semibold text-orange-600">
                        Rigveda AI
                      </span>
                    </div>
                  )}
                  <p
                    className={`whitespace-pre-wrap leading-relaxed ${
                      msg.role === "user" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-white border border-orange-100 rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🕉️</span>
                    <span className="text-xs font-semibold text-orange-600">
                      Rigveda AI
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 border-t border-orange-200/50">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about the Rigveda..."
              disabled={loading}
              className="flex-1 h-12 px-4 rounded-xl border-2 border-orange-200 focus:border-orange-400 bg-white/80 backdrop-blur-sm"
            />
            <Button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="h-12 px-6 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl btn-hover shadow-lg disabled:opacity-50"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </Button>
          </div>
          <p className="text-xs text-orange-600/60 mt-3 text-center">
            Powered by OpenAI GPT-4 • Ask anything about the Rigveda
          </p>
        </div>
      </div>
    </div>
  );
}
