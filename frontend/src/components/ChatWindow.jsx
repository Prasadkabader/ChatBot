import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chatWithProject } from "../services/api";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ projectId, promptId, projectName }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const newMsg = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await chatWithProject(projectId, {
        messages: [...messages, newMsg],
        prompt_id: promptId,
      });

      setMessages((prev) => [...prev, { role: "assistant", content: res.data.response }]);
    } catch (error) {
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: "Sorry, I encountered an error. Please try again." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
      {/* Header */}
      <div className="p-4 border-b border-white/20">
        <h3 className="text-white font-semibold text-lg">
          💬 {projectName || "Chat"}
        </h3>
        <p className="text-white/60 text-sm">
          {messages.length} messages
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div className="text-4xl mb-4">👋</div>
              <p className="text-white/80">Start a conversation!</p>
              <p className="text-white/60 text-sm mt-2">Type a message below to begin chatting.</p>
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <MessageBubble key={index} message={message} index={index} />
            ))
          )}
        </AnimatePresence>
        
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-2 text-white/60"
          >
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm">AI is thinking...</span>
          </motion.div>
        )}
        
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/20">
        <div className="flex space-x-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition-all duration-200"
            rows="1"
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "..." : "Send"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}