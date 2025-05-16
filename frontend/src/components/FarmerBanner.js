import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiDollarSign, FiTrendingUp, FiUsers, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

const FarmerAdvertisementBanner = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative bg-gradient-to-br from-green-700 via-green-600 to-green-500 rounded-xl overflow-hidden shadow-2xl my-12 border-2 border-amber-300/20"
    >
      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-amber-300/20"
            initial={{ 
              x: Math.random() * 100,
              y: Math.random() * 100,
              rotate: Math.random() * 360
            }}
            animate={{
              y: [0, Math.random() * 50 - 25],
              x: [0, Math.random() * 40 - 20],
              rotate: [0, Math.random() * 90 - 45],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
            style={{
              fontSize: `${20 + Math.random() * 30}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            {i % 2 === 0 ? '🌾' : '💰'}
          </motion.div>
        ))}
      </div>

      {/* Glowing spotlight effect */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full bg-amber-400/10 filter blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full bg-amber-300/10 filter blur-3xl"></div>

      <div className="relative z-10 px-6 py-8 md:px-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="text-center md:text-left max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-amber-100">
                Grow Your Farm Business With Us
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-amber-100/90 mb-8 text-lg md:text-xl"
            >
              Connect directly with customers and maximize your profits.
              <br className="hidden md:block" /> Keep up to 90% of your sales with our low-commission marketplace!
            </motion.p>

            {/* Farmer benefits */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              <div className="flex items-start text-sm text-amber-100 bg-amber-800/30 px-3 py-2 rounded-lg">
                <FiDollarSign className="mt-0.5 mr-2 flex-shrink-0" />
                <span>Higher profits than wholesale markets</span>
              </div>
              <div className="flex items-start text-sm text-amber-100 bg-amber-800/30 px-3 py-2 rounded-lg">
                <FiTrendingUp className="mt-0.5 mr-2 flex-shrink-0" />
                <span>Grow your customer base</span>
              </div>
              <div className="flex items-start text-sm text-amber-100 bg-amber-800/30 px-3 py-2 rounded-lg">
                <FiUsers className="mt-0.5 mr-2 flex-shrink-0" />
                <span>Direct relationships with buyers</span>
              </div>
              <div className="flex items-start text-sm text-amber-100 bg-amber-800/30 px-3 py-2 rounded-lg">
                <FiClock className="mt-0.5 mr-2 flex-shrink-0" />
                <span>Weekly payments</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link 
                to="/productlistuserviewpage" 
                className="inline-flex items-center px-8 py-4 bg-white text-amber-700 font-semibold rounded-xl hover:bg-amber-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <span>Browse Our Framers Products</span>
                <FiArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
            </motion.div>
          </div>
          
          {/* Farmer success showcase */}
          <div className="hidden lg:flex relative w-72 h-72">
            <motion.div 
              className="absolute top-0 left-0 w-48 h-48 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-300/20 overflow-hidden"
              initial={{ x: -20, y: -20, rotate: -5 }}
              animate={{ y: [-10, 10, -10], rotate: [-5, 0, -5] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <img 
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                alt="Farmer harvesting"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div 
              className="absolute top-1/2 right-0 w-48 h-48 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-300/20 p-4 flex flex-col justify-center items-center"
              initial={{ x: 20, y: 20, rotate: 5 }}
              animate={{ y: [10, -10, 10], rotate: [5, 0, 5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="text-3xl font-bold text-white">+75%</div>
              <div className="text-sm text-center text-amber-100 mt-2">Average income increase</div>
            </motion.div>
            <motion.div 
              className="absolute bottom-0 left-1/4 w-48 h-48 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-300/20 overflow-hidden"
              initial={{ x: 0, y: 0, rotate: 0 }}
              animate={{ y: [0, 15, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1605007493699-af65834f8a00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                alt="Farmers market"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating dollar icon */}
      <motion.div
        className="absolute bottom-8 right-8 text-white/30"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <FiDollarSign size={48} />
      </motion.div>
    </motion.div>
  );
};

export default FarmerAdvertisementBanner;