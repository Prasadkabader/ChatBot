import { useState, useRef, useEffect } from "react";
import { chatWithProject } from "../services/api";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ projectId, promptId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input) return;
    const newMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    const res = await chatWithProject(projectId, {
      messages: [...messages, newMsg],
      prompt_id: promptId,
    });

    setMessages((prev) => [...prev, { role: "assistant", content: res.response }]);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white p-4 rounded shadow-md">
      <div className="flex-1 overflow-y-auto mb-2 flex flex-col">
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m} />
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          className="flex-1 border rounded-l px-4 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-r transition-transform transform hover:scale-105"
        >
          Send
        </button>
      </div>
    </div>
  );
}
