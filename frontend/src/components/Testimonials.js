import React from "react";
import { FaStar, FaStarHalfAlt, FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ravi Kumar",
    location: "Punjab",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "AGROFARM is my go-to for quality agricultural products. Their seeds and fertilizers have transformed my farm’s yield! Highly recommended.",
    rating: 5,
  },
  {
    name: "Sunita Devi",
    location: "Bihar",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    review:
      "Super fast delivery and top-notch quality! My plants have never looked greener. Thank you for the amazing service!",
    rating: 4.5,
  },
  {
    name: "Mahesh Patel",
    location: "Gujarat",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    review:
      "Affordable and reliable! I’ve been purchasing my farm essentials from here and I’m always impressed with the quality.",
    rating: 5,
  },
];

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (i - 0.5 === rating) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
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
      className="bg-gradient-to-br from-green-50 to-white py-16 px-6 max-w-7xl mx-auto rounded-3xl shadow-lg my-12"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-green-700 mb-12 text-center"
      >
        💬 Hear from Our <span className="text-green-800">Happy Farmers</span>
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
            className="relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2 border border-green-200"
          >
            <FaQuoteLeft className="absolute top-4 left-4 text-green-200 text-2xl" />
            <div className="flex items-center gap-4 mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-14 h-14 rounded-full border-2 border-green-500 shadow-md"
              />
              <div>
                <h4 className="font-semibold text-lg text-green-800">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              "{testimonial.review}"
            </p>
            <StarRating rating={testimonial.rating} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Testimonials;



