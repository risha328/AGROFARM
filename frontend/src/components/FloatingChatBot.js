// import { useState } from "react";
// import { motion } from "framer-motion";
// import { FaCommentDots, FaTimes } from "react-icons/fa";
// import axios from "axios";
// import SummaryApi from "../common"; // ✅ Make sure path is correct

// const FloatingChatbot = () => {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { from: "bot", text: "Hi! How can I help you with farming today?" },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessages = [...messages, { from: "user", text: input }];
//     setMessages(newMessages);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await axios({
//         method: SummaryApi.chatbot.method,
//         url: SummaryApi.chatbot.url,
//         data: { message: input }
//       });

//       const reply = res.data.reply;
//       setMessages([...newMessages, { from: "bot", text: reply }]);
//     } catch (err) {
//       console.error("Chatbot error:", err.message);
//       setMessages([...newMessages, {
//         from: "bot",
//         text: "Sorry, something went wrong."
//       }]);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50">
//       {!open ? (
//         <button
//           onClick={() => setOpen(true)}
//           className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:scale-105 transition"
//         >
//           <FaCommentDots size={24} />
//         </button>
//       ) : (
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           className="w-80 bg-white rounded-2xl shadow-2xl flex flex-col"
//         >
//           <div className="flex items-center justify-between bg-green-600 text-white p-3 rounded-t-2xl">
//             <h2 className="text-lg font-semibold">AgriBot </h2>
//             <button onClick={() => setOpen(false)}>
//               <FaTimes />
//             </button>
//           </div>

//           <div className="flex-1 p-3 space-y-2 h-80 overflow-y-auto">
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`p-2 rounded-lg max-w-xs ${
//                   msg.from === "bot"
//                     ? "bg-green-100 self-start"
//                     : "bg-green-500 text-white self-end ml-auto"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//             {loading && (
//               <div className="text-sm text-gray-400">Bot is typing...</div>
//             )}
//           </div>

//           <div className="p-2 border-t flex">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               placeholder="Ask something..."
//               className="flex-1 p-2 border rounded-l-lg focus:outline-none"
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-green-600 text-white px-4 rounded-r-lg"
//             >
//               Send
//             </button>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default FloatingChatbot;


import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaCommentDots, FaTimes, FaArrowUp, FaArrowDown } from "react-icons/fa";
import axios from "axios";
import SummaryApi from "../common";

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you with farming today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const containerRef = useRef(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      setShowScrollToBottom(scrollTop + clientHeight < scrollHeight - 50);
      setShowScrollToTop(scrollTop > 50);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, open]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios({
        method: SummaryApi.chatbot.method,
        url: SummaryApi.chatbot.url,
        data: { message: input },
      });

      const reply = res.data.reply;
      const botMessage = { from: "bot", text: reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chatbot error:", err.message);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, something went wrong. Please try again later." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <FaCommentDots size={24} />
        </motion.button>
      ) : (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="w-80 h-[32rem] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Entire Chatbot is scrollable */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex-1 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-green-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-green-600 text-white p-3 sticky top-0 z-10">
              <h2 className="text-lg font-semibold">AgriBot Assistant</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-green-700 rounded-full transition"
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="flex flex-col p-3 space-y-2">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`p-3 rounded-lg max-w-[80%] ${
                    msg.from === "bot"
                      ? "bg-green-100 text-gray-800 self-start"
                      : "bg-green-600 text-white self-end"
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-1 p-2 text-gray-500 text-sm"
                >
                  <div
                    className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                  <span className="ml-1">AgriBot is typing...</span>
                </motion.div>
              )}
            </div>

            {/* Scroll buttons */}
            {showScrollToBottom && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                onClick={scrollToBottom}
                className="fixed right-10 bottom-32 bg-green-600 text-white p-2 rounded-full shadow-md"
              >
                <FaArrowDown />
              </motion.button>
            )}

            {showScrollToTop && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                onClick={scrollToTop}
                className="fixed right-10 bottom-40 bg-green-600 text-white p-2 rounded-full shadow-md"
              >
                <FaArrowUp />
              </motion.button>
            )}
          </div>

          {/* Input */}
          <div className="p-2 border-t bg-gray-50">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about farming..."
                className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className={`px-4 py-2 rounded-r-lg ${
                  !input.trim() || loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                } transition-colors`}
              >
                Send
              </motion.button>
            </div>
            <p className="text-xs text-gray-500 mt-1 px-1">
              Ask about crops, weather, prices, or farming techniques
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FloatingChatbot;
