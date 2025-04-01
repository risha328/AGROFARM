import React from "react";
import { FaStar, FaStarHalfAlt, FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ravi Kumar",
    location: "Punjab",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "AGROFARM is my go-to for quality agricultural products. Their seeds and fertilizers have transformed my farm's yield! The consistent quality and expert advice have made all the difference in my harvests.",
    rating: 5,
  },
  {
    name: "Sunita Devi",
    location: "Bihar",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    review:
      "Super fast delivery and top-notch quality! My plants have never looked healthier. The customer service team went above and beyond to help me select the right products for my soil type.",
    rating: 4.5,
  },
  {
    name: "Mahesh Patel",
    location: "Gujarat",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    review:
      "AGROFARM has revolutionized my farming operations. Their products are consistently reliable and their technical support has helped me optimize my fertilizer usage, saving me money.",
    rating: 5,
  },
];

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="text-amber-500" />);
    } else if (i - 0.5 === rating) {
      stars.push(<FaStarHalfAlt key={i} className="text-amber-500" />);
    } else {
      stars.push(<FaStar key={i} className="text-gray-300" />);
    }
  }
  return <div className="flex gap-1">{stars}</div>;
};

const Testimonials = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-amber-50 to-white py-20 px-6 max-w-7xl mx-auto rounded-3xl shadow-sm my-16 border border-amber-100"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Trusted by Farmers Across India
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Join thousands of satisfied farmers who have transformed their yields with our premium agricultural solutions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
            className="relative bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-amber-500"
          >
            <div className="absolute -top-4 left-6 bg-amber-500 text-white p-2 rounded-full shadow-md">
              <FaQuoteLeft className="text-lg" />
            </div>
            <div className="flex items-center gap-4 mb-6">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full border-4 border-amber-100 shadow-sm object-cover"
              />
              <div>
                <h4 className="font-semibold text-lg text-gray-800">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6 italic">
              "{testimonial.review}"
            </p>
            <div className="flex justify-between items-center">
              <StarRating rating={testimonial.rating} />
              <span className="text-xs text-gray-400">
                Verified Customer
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center mt-12"
      >
        <button className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg shadow-md transition-colors duration-300">
          Read More Testimonials
        </button>
      </motion.div>
    </motion.section>
  );
};

export default Testimonials;