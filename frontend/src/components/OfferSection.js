import React from 'react';
import { motion } from 'framer-motion';

import seedImage from '../assest/offerseed.jpg';
import fertilizerImage from '../assest/fruit.jpg';
import toolsImage from '../assest/tools.jpg';

const offers = [
    {
        image: seedImage,
        title: "Up to 30% off on Seeds",
        description: "Get premium quality seeds at unbeatable prices to boost your crop yield. Our hand-picked seeds ensure high germination rates, better resistance to diseases, and improved overall crop productivity. Whether you are growing vegetables, grains, or fruits, these seeds will give you a head start for a bountiful harvest."
    },
    {
        image: fertilizerImage,
        title: "Fruits Mega Sale",
        description: "Stock up on farm-fresh, high-quality fruits at discounted prices. Enjoy the natural sweetness of handpicked, organic produce that is packed with nutrients and perfect for a healthy lifestyle. Don't miss out on these limited-time offers to bring the freshest harvest straight to your kitchen!"
    },
    {
        image: toolsImage,
        title: "Tools Starting from ₹99",
        description: "Upgrade your farming experience with our high-quality, ergonomic tools designed for efficiency and durability. Whether you're plowing, harvesting, or maintaining your farm, our affordable yet professional-grade tools will make every task easier and more productive. Shop now and take advantage of unbeatable prices!"
    }
];

const OfferSection = () => {
    return (
        <section className="bg-gradient-to-br from-green-100 to-white py-16 px-6 rounded-2xl shadow-xl max-w-7xl mx-auto my-10">
            <motion.h2 
                className="text-4xl font-extrabold text-green-700 mb-12 text-center"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                🔥 Today's Special Offers
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {offers.map((offer, index) => (
                    <motion.div 
                        key={index} 
                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-green-200 overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2, duration: 0.4 }}
                        whileHover={{ scale: 1.08 }}
                    >
                        <img src={offer.image} alt={offer.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h3 className="font-semibold text-xl text-green-700 mb-2">{offer.title}</h3>
                            <p className="text-base text-gray-700 leading-relaxed">{offer.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default OfferSection;
