import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaClock, FaLeaf, FaTractor, FaFire } from "react-icons/fa";
import { motion } from "framer-motion";

const DealCard = ({ deal }) => {
  const [timeLeft, setTimeLeft] = useState(deal.timeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let [hours, minutes, seconds] = prev.split(':').map(Number);
        
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              clearInterval(timer);
              return "00:00:00";
            }
          }
        }
        
        return [
          hours.toString().padStart(2, '0'),
          minutes.toString().padStart(2, '0'),
          seconds.toString().padStart(2, '0')
        ].join(':');
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isUrgent = parseInt(timeLeft.split(':')[0]) < 6;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 relative"
    >
      {/* Urgency Ribbon */}
      {isUrgent && (
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-3 py-1 z-10 rounded-br-lg flex items-center"
        >
          <FaFire className="mr-1" /> HURRY!
        </motion.div>
      )}

      <div className="relative">
        <img 
          src={deal.image} 
          alt={deal.title}
          className="w-full h-48 object-cover"
        />
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
        >
          {deal.discount}
        </motion.div>
        {deal.tag && (
          <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {deal.tag}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {deal.icon}
          <h3 className="text-lg font-semibold text-gray-800">{deal.title}</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">{deal.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-gray-400 line-through text-sm">{deal.originalPrice}</span>
            <span className="text-green-600 font-bold text-xl ml-2">{deal.discountedPrice}</span>
          </div>
        </div>

        <motion.div 
          animate={isUrgent ? { 
            backgroundColor: ['#FEF3C7', '#FDE68A', '#FEF3C7'],
            borderColor: ['#F59E0B', '#FBBF24', '#F59E0B']
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className={`rounded-lg p-3 mb-4 ${isUrgent ? 'border border-amber-300' : 'bg-amber-50'}`}
        >
          <div className="flex items-center gap-2 text-amber-700">
            <FaClock className={isUrgent ? "animate-pulse" : ""} />
            <span className="text-sm font-medium">Offer ends in:</span>
          </div>
          <div className="flex gap-2 mt-1">
            {timeLeft.split(':').map((time, index) => (
              <motion.div 
                key={index}
                animate={isUrgent && index === 2 ? { 
                  scale: [1, 1.1, 1],
                  backgroundColor: ['#FFFFFF', '#FECACA', '#FFFFFF']
                } : {}}
                transition={{ duration: 1, repeat: Infinity }}
                className="bg-white rounded px-2 py-1 text-xs font-bold"
              >
                {time}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <FaShoppingCart /> Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

const ExcitingDeals = () => {
  const [deals, setDeals] = useState([
    {
      id: 1,
      title: "Monsoon Special - Seeds Pack",
      description: "High-yield hybrid seeds for paddy, wheat, and pulses. Perfect for the upcoming season.",
      originalPrice: "₹2,499",
      discountedPrice: "₹1,799",
      discount: "28% OFF",
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      timeLeft: "12:45:30",
      tag: "Best Seller",
      icon: <FaLeaf className="text-green-500" />
    },
    {
      id: 2,
      title: "Organic Fertilizers Combo",
      description: "Complete organic nutrition pack for 1 acre. Improves soil health naturally.",
      originalPrice: "₹3,200",
      discountedPrice: "₹2,399",
      discount: "25% OFF",
      image: "https://plus.unsplash.com/premium_photo-1678509112838-3412ba938a52?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b3JnYW5pYyUyMGZlcnRpbGl6ZXJ8ZW58MHx8MHx8fDA%3D",
      timeLeft: "05:22:15",
      tag: "Limited Stock",
      icon: <FaTractor className="text-amber-500" />
    },
    {
      id: 3,
      title: "Farm Tools Mega Kit",
      description: "Essential tools set including spade, sickle, pruner, and protective gear.",
      originalPrice: "₹1,850",
      discountedPrice: "₹1,299",
      discount: "30% OFF",
      image: "https://plus.unsplash.com/premium_photo-1726704147924-c94e965da0c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8RmFybSUyMFRvb2xzJTIwTWVnYSUyMEtpdHxlbnwwfHwwfHx8MA%3D%3D",
      timeLeft: "18:10:45",
      tag: "New Arrival",
      icon: <FaShoppingCart className="text-blue-500" />
    }
  ]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Exciting <span className="text-green-600">Deals & Offers</span> for Farmers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Special discounts on premium agricultural products. Limited time offers to boost your farming productivity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg shadow-md transition-colors duration-300 inline-flex items-center gap-2">
            View All Offers <span className="text-xl">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExcitingDeals;