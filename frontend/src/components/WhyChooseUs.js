import React from 'react';
import { 
  FaLeaf, 
  FaMoneyBillWave, 
  FaShippingFast, 
  FaUserShield, 
  FaClipboardCheck, 
  FaCalendarAlt, 
  FaHandHoldingWater,
  FaSeedling
} from 'react-icons/fa';
import { GiFarmer, GiWheat } from 'react-icons/gi';
import { motion } from 'framer-motion';

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { 
            delay: i * 0.15, 
            duration: 0.6, 
            ease: "easeOut",
            when: "beforeChildren"
        }
    }),
    hover: {
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }
};

const WhyChooseUs = () => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-16 overflow-hidden"
        >
            {/* Decorative elements */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-green-100 rounded-full opacity-20 mix-blend-multiply filter blur-xl"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-100 rounded-full opacity-20 mix-blend-multiply filter blur-xl"></div>
            
            <div className="relative max-w-5xl mx-auto text-center mb-16">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center justify-center mb-6"
                >
                    <GiWheat className="text-4xl text-green-600 mr-3" />
                    <span className="text-sm font-semibold tracking-wider text-green-600 uppercase">
                        Our Differentiators
                    </span>
                </motion.div>
                
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight"
                >
                    <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                        Why 50,000+ Farmers
                    </span> <br />Choose AgroFarm Solutions
                </motion.h2>
                
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg text-gray-600 max-w-3xl mx-auto"
                >
                    We're redefining agricultural supply chains with technology, transparency, and farmer-centric values
                </motion.p>
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    {
                        icon: <GiFarmer className="text-3xl" />,
                        title: 'Farmer-Centric Model',
                        desc: 'Direct partnerships with 5,000+ smallholder farmers across 18 states',
                        bg: 'from-green-50 to-white',
                        stat: '₹12.8Cr+',
                        statText: 'Paid to farmers'
                    },
                    {
                        icon: <FaClipboardCheck className="text-3xl" />,
                        title: 'Quality Certified',
                        desc: 'ISO 9001 certified processes with 5-stage quality verification',
                        bg: 'from-blue-50 to-white',
                        stat: '99.2%',
                        statText: 'Quality score'
                    },
                    {
                        icon: <FaMoneyBillWave className="text-3xl" />,
                        title: 'Fair Pricing',
                        desc: 'Competitive wholesale pricing with volume-based discounts',
                        bg: 'from-amber-50 to-white',
                        stat: '15-30%',
                        statText: 'Cost savings'
                    },
                    {
                        icon: <FaShippingFast className="text-3xl" />,
                        title: 'Reliable Logistics',
                        desc: 'Cold-chain network covering 93% of Indian districts',
                        bg: 'from-purple-50 to-white',
                        stat: '24-48h',
                        statText: 'Delivery window'
                    },
                    {
                        icon: <FaUserShield className="text-3xl" />,
                        title: 'Expert Support',
                        desc: 'Dedicated agronomists with average 12 years experience',
                        bg: 'from-red-50 to-white',
                        stat: '24/7',
                        statText: 'Support'
                    },
                    {
                        icon: <FaCalendarAlt className="text-3xl" />,
                        title: 'Seasonal Planning',
                        desc: 'AI-powered crop advisory based on weather and soil data',
                        bg: 'from-emerald-50 to-white',
                        stat: '92%',
                        statText: 'Accuracy'
                    },
                    {
                        icon: <FaHandHoldingWater className="text-3xl" />,
                        title: 'Water Solutions',
                        desc: 'Drip irrigation systems and drought-resistant seeds',
                        bg: 'from-teal-50 to-white',
                        stat: '40%',
                        statText: 'Water saving'
                    },
                    {
                        icon: <FaSeedling className="text-3xl" />,
                        title: 'Sustainable Seeds',
                        desc: 'Non-GMO, climate-resilient seed varieties',
                        bg: 'from-cyan-50 to-white',
                        stat: '200+',
                        statText: 'Varieties'
                    }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: true }}
                        className={`bg-gradient-to-b ${item.bg} p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300`}
                    >
                        <div className="flex justify-center mb-5">
                            <div className="p-4 bg-white rounded-xl shadow-xs border border-gray-100">
                                {item.icon}
                            </div>
                        </div>
                        <h3 className="font-bold text-xl text-gray-800 mb-3 text-center">{item.title}</h3>
                        <p className="text-sm text-gray-600 text-center mb-4 leading-relaxed">{item.desc}</p>
                        <div className="text-center mt-auto">
                            <p className="text-2xl font-bold text-green-600">{item.stat}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">{item.statText}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative mt-20 bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-8 text-center text-white overflow-hidden"
            >
                {/* Decorative elements */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full opacity-10"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white rounded-full opacity-10"></div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">Ready to Transform Your Farming Operations?</h3>
                <p className="mb-6 max-w-2xl mx-auto relative z-10 opacity-90">
                    Join India's most trusted agricultural platform with a 98% satisfaction rate
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                    <button className="px-6 py-3 bg-white text-green-700 font-medium rounded-lg shadow-md hover:bg-gray-50 transition-colors">
                        Speak to Our Expert
                    </button>
                    <button className="px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
                        View Product Catalog
                    </button>
                </div>
            </motion.div>
        </motion.section>
    );
};

export default WhyChooseUs;