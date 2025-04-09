import { useState } from "react";
import { motion } from "framer-motion";
import { FaCommentDots, FaTimes } from "react-icons/fa";
import axios from "axios";
import SummaryApi from "../common"; // ✅ Make sure path is correct

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you with farming today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios({
        method: SummaryApi.chatbot.method,
        url: SummaryApi.chatbot.url,
        data: { message: input }
      });

      const reply = res.data.reply;
      setMessages([...newMessages, { from: "bot", text: reply }]);
    } catch (err) {
      console.error("Chatbot error:", err.message);
      setMessages([...newMessages, {
        from: "bot",
        text: "Sorry, something went wrong."
      }]);
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:scale-105 transition"
        >
          <FaCommentDots size={24} />
        </button>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-80 bg-white rounded-2xl shadow-2xl flex flex-col"
        >
          <div className="flex items-center justify-between bg-green-600 text-white p-3 rounded-t-2xl">
            <h2 className="text-lg font-semibold">AgriBot </h2>
            <button onClick={() => setOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="flex-1 p-3 space-y-2 h-80 overflow-y-auto">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-xs ${
                  msg.from === "bot"
                    ? "bg-green-100 self-start"
                    : "bg-green-500 text-white self-end ml-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="text-sm text-gray-400">Bot is typing...</div>
            )}
          </div>

          <div className="p-2 border-t flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask something..."
              className="flex-1 p-2 border rounded-l-lg focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-green-600 text-white px-4 rounded-r-lg"
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FloatingChatbot;

