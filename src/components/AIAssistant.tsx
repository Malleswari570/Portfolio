import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Bot, X, Send, Sparkles, User, RefreshCw, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ChatMessage {
  role: "user" | "model";
  content: string;
}

const PRESET_PROMPTS = [
  { label: "Overview", text: "Tell me about Bandaru Malleswari's background and expertise." },
  { label: "ML Projects", text: "What machine learning projects has she developed?" },
  { label: "FMML Internship", text: "What did she do during her remote Machine Learning Internship at IIIT Hyderabad?" },
  { label: "Contact Details", text: "How can I contact her?" }
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      content: "Hello! I am Malleswari's AI Portfolio Assistant, trained on her professional profile, projects, and certifications. Feel free to ask me anything about her AI / Machine Learning qualifications!"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    
    setErrorStatus(null);
    const userMsg: ChatMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    
    setMessages(updatedMessages);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Setup payload including the chat history (excluding the very first assistant greeting)
      const formattedHistory = updatedMessages
        .slice(1, -1) // skip initial greeting and current prompt
        .map(m => ({
          role: m.role,
          content: m.content
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          chatHistory: formattedHistory
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to call portfolio AI service");
      }

      setMessages(prev => [...prev, { role: "model", content: data.text }]);
    } catch (err: any) {
      console.error("AI Assistant client error:", err);
      setErrorStatus(err.message || "Something went wrong. Please check your network connection.");
      // Add error placeholder message from model
      setMessages(prev => [...prev, { 
        role: "model", 
        content: `I'm having some trouble connecting to Gemini server right now: "${err.message || "Server offline"}". If her API is missing, make sure to set the GEMINI_API_KEY inside Settings > Secrets!` 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: "model",
        content: "Chat reset! What else would you like to know about Malleswari's background?"
      }
    ]);
    setErrorStatus(null);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Action Button */}
      <motion.button
        id="toggle-ai-chat"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#111827] border border-[#1F2937] text-amber-500 hover:bg-slate-900 hover:text-amber-400 shadow-lg cursor-pointer transition-colors focus:outline-none"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 animate-pulse-slow" />}
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-chat-window"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="absolute bottom-16 right-0 w-[92vw] sm:w-[420px] h-[550px] rounded-2xl bg-slate-950 border border-[#1F2937] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#0A0A0A] px-4 py-3.5 border-b border-[#1F2937] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-500">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100 flex items-center gap-1.5 text-sm">
                    Malleswari's Assistant
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 animate-pulse">
                      Active
                    </span>
                  </h4>
                  <p className="text-[11px] text-gray-400">DeepMind Gemini Dynamic Agent</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button 
                  onClick={handleResetChat} 
                  title="Clear history"
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Flow */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0A0A0A] bg-dot-pattern">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role !== "user" && (
                    <div className="w-7 h-7 rounded-full bg-[#111827] border border-[#1F2937] flex items-center justify-center text-amber-500 shrink-0 font-bold">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-amber-500 text-slate-950 rounded-br-none font-bold" 
                      : "bg-[#111827] text-slate-100 border border-[#1F2937] rounded-bl-none whitespace-pre-wrap"
                  }`}>
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-full bg-[#111827] border border-[#1F2937] flex items-center justify-center text-amber-500 shrink-0">
                    <Bot className="w-4 h-4 text-amber-500 animate-pulse" />
                  </div>
                  <div className="bg-[#111827] text-slate-300 border border-[#1F2937] p-3 rounded-xl rounded-bl-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {errorStatus && (
                <div className="p-3 rounded-lg bg-red-950/20 border border-red-900/40 text-red-400 flex items-start gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">AI Assistant Error:</span>
                    <p className="mt-0.5 font-mono">{errorStatus}</p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Presets Menu */}
            {messages.length < 3 && (
              <div className="px-4 py-2 border-t border-[#1F2937]/80 bg-[#0A0A0A]/30">
                <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase block mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> Quick Topics
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_PROMPTS.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(p.text)}
                      className="text-[11px] bg-[#111827] hover:bg-slate-900 text-gray-300 hover:text-white hover:border-amber-500/40 px-2.5 py-1 rounded-full border border-[#1F2937] transition-all text-left cursor-pointer truncate max-w-full font-semibold"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputMessage);
              }}
              className="p-3 border-t border-[#1F2937] bg-[#0A0A0A] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about her skills, GPA, projects..."
                className="flex-1 bg-[#111827] text-[#E5E7EB] text-xs px-3 py-2.5 rounded-xl border border-[#1F2937] focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all font-sans"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer disabled:bg-[#111827] disabled:text-[#1F2937] disabled:cursor-not-allowed transition-colors"
                title="Send message"
              >
                <Send className="w-4 h-4 font-bold" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
