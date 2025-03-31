import React from 'react';
import { motion } from 'framer-motion';

// Import images
import seedImage from '../assest/offerseed.jpg';
import fertilizerImage from '../assest/fruit.jpg';
import toolsImage from '../assest/tools.jpg';

const offers = [
  {
    image: seedImage,
    title: "Premium Seeds Collection",
    discount: "30% OFF",
    description: "Enhance your yield with our certified, high-germination seeds. Selected for optimal growth in various climates.",
    cta: "Shop Seeds",
    tag: "Best Seller"
  },
  {
    image: fertilizerImage,
    title: "Organic Fruit Harvest",
    discount: "25% OFF",
    description: "Farm-fresh, pesticide-free fruits packed with flavor and nutrition. Seasonal selections available.",
    cta: "Explore Fruits",
    tag: "Limited Stock"
  },
  {
    image: toolsImage,
    title: "Professional Farming Tools",
    discount: "From ₹99",
    description: "Ergonomic designs that reduce fatigue and increase efficiency. Durable construction for long-term use.",
    cta: "View Tools",
    tag: "New Arrivals"
  }
];

const OfferSection = () => {
  return (
    <section className="bg-yellow-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full mb-4">
            Special Promotions
          </span>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Exclusive Offers for Farmers
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Quality products at unbeatable prices to support your agricultural success
          </p>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -10 }}
              className="relative bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg"
            >
              {/* Tag */}
              {offer.tag && (
                <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                  {offer.tag}
                </div>
              )}

              {/* Image */}
              <div className="h-60 overflow-hidden">
                <img 
                  src={offer.image} 
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{offer.title}</h3>
                  <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {offer.discount}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{offer.description}</p>
                
                <button className="w-full mt-4 px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center justify-center">
                  {offer.cta}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="px-6 py-3 border border-green-600 text-green-600 font-medium rounded-md hover:bg-green-50 transition-colors duration-300">
            View All Offers
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default OfferSection;