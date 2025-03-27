import React from 'react'
import { FaLeaf, FaRupeeSign, FaTruck, FaUsers } from 'react-icons/fa'
import { motion } from 'framer-motion'

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.6 }
    }),
};

const WhyChooseUs = () => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-green-50 py-16 px-4 max-w-7xl mx-auto rounded-2xl shadow-md my-10"
        >
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-extrabold text-green-700 mb-10 text-center"
            >
                🌱 Why Choose Kishan2Kitchen?
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

                {[{
                    icon: <FaLeaf className="text-green-600 text-3xl" />,
                    title: 'Organic & Natural',
                    desc: '100% organic products directly from trusted farmers.'
                }, {
                    icon: <FaRupeeSign className="text-green-600 text-3xl" />,
                    title: 'Affordable Pricing',
                    desc: 'Get premium quality at the best prices.'
                }, {
                    icon: <FaTruck className="text-green-600 text-3xl" />,
                    title: 'Pan India Delivery',
                    desc: 'Serving farmers and customers all across India.'
                }, {
                    icon: <FaUsers className="text-green-600 text-3xl" />,
                    title: 'Trusted by Thousands',
                    desc: 'Join 10,000+ satisfied farmers and gardeners.'
                }].map((item, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-white p-6 rounded-xl shadow hover:scale-105 transition-transform duration-300 text-center"
                    >
                        <div className="flex justify-center mb-3">{item.icon}</div>
                        <h3 className="font-semibold text-lg text-green-700 mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                    </motion.div>
                ))}

            </div>
        </motion.section>
    )
}

export default WhyChooseUs
