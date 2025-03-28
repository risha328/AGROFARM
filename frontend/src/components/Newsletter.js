import React, { useState } from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (subscribed) return;
    setSubscribed(true);

    // Auto-hide success message after 3 seconds
    setTimeout(() => {
      setSubscribed(false);
    }, 3000);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-green-50 to-white py-16 px-6 rounded-3xl shadow-lg max-w-3xl mx-auto my-12 text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-extrabold text-green-800 mb-4"
      >
        Stay Updated with <span className="text-green-600">AGROFARM</span>
      </motion.h2>

      <p className="text-lg text-gray-600 mb-6">
        Get the latest offers, discounts, and farming tips directly to your inbox.  
      </p>

      {!subscribed ? (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-green-300 rounded-full px-5 py-3 w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubscribe}
            className="bg-green-600 text-white font-semibold rounded-full px-6 py-3 hover:bg-green-700 transition shadow-md"
          >
            Subscribe
          </motion.button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-green-100 text-green-700 font-semibold px-6 py-3 rounded-full mt-4 shadow-md"
        >
          🎉 You have successfully subscribed! Stay tuned for updates.
        </motion.div>
      )}
    </motion.section>
  );
};

export default Newsletter;


