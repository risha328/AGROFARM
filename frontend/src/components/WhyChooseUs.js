import React from 'react';
import { FaLeaf, FaRupeeSign, FaTruck, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" }
    }),
};

const WhyChooseUs = () => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-green-50 to-white py-16 px-6 max-w-7xl mx-auto rounded-3xl shadow-lg my-12"
        >
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-extrabold text-green-700 mb-12 text-center"
            >
                🌿 Why Choose <span className="text-green-800">AGROFARM?</span>
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    {
                        icon: <FaLeaf className="text-green-700 text-5xl" />,
                        title: '100% Organic & Natural',
                        desc: 'We source fresh, chemical-free produce directly from trusted farmers to ensure purity and sustainability.'
                    },
                    {
                        icon: <FaRupeeSign className="text-green-700 text-5xl" />,
                        title: 'Best Price Guarantee',
                        desc: 'Get farm-fresh products at unbeatable prices, ensuring affordability without compromising quality.'
                    },
                    {
                        icon: <FaTruck className="text-green-700 text-5xl" />,
                        title: 'Fast & Reliable Delivery',
                        desc: 'Our efficient logistics network ensures fresh produce reaches your doorstep anywhere in India, hassle-free.'
                    },
                    {
                        icon: <FaUsers className="text-green-700 text-5xl" />,
                        title: 'Trusted by Thousands',
                        desc: 'Join 10,000+ satisfied customers who trust us for their daily agricultural and organic needs.'
                    }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2 border border-green-200"
                    >
                        <div className="flex justify-center mb-4">{item.icon}</div>
                        <h3 className="font-semibold text-xl text-green-800 mb-3 text-center">{item.title}</h3>
                        <p className="text-base text-gray-700 text-center leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default WhyChooseUs;

