import { motion } from "framer-motion";
import { useState } from "react";
import ban3 from "../assest/banner/ban3.jpeg"; // Ensure correct path
import founder1 from "../assest/founder1.jpg";
import founder2 from "../assest/founder2.jpg";
import founder3 from "../assest/founder3.jpg";
import story1 from "../assest/story1.jpg"; // Add these images to your assets
import story2 from "../assest/story2.jpg";
import story3 from "../assest/story3.jpg";

//import { motion } from "framer-motion";
import { FaLeaf, FaChartLine, FaHandshake, FaTractor, FaStore, FaUserTie, FaQuoteLeft, FaAward, FaGlobe } from "react-icons/fa";
import { GiFarmer } from "react-icons/gi";
import { RiPlantLine } from "react-icons/ri";

const AboutUs = () => {
  const founders = [
    {
      name: "Kuldeep Parewa",
      img: founder1,
      desc: "Helping farmers by equipping them with modern technology and fair trade.",
      role: "CEO & Tech Innovator"
    },
    {
      name: "Aayushi Khandelwal",
      img: founder2,
      desc: "Preserving traditional superfoods while connecting modern consumers.",
      role: "Head of Product"
    },
    {
      name: "Akhil Kansal",
      img: founder3,
      desc: "Using technology to assess food quality and empower farmers.",
      role: "CTO"
    },
  ];

  const stories = [
    {
      title: "Our Humble Beginnings",
      content:
        "AgroFarm started in a small village when our founders witnessed the struggles of local farmers. Despite producing high-quality crops, farmers were getting only a fraction of the market price due to middlemen. We envisioned a platform that would connect farmers directly with consumers, ensuring fair prices for both.",
      img: story1,
      icon: <RiPlantLine className="text-4xl text-green-600" />,
      year: "2019"
    },
    {
      title: "The Technology Revolution",
      content:
        "In 2022, we introduced our mobile app that revolutionized farm-to-table commerce. Our AI-powered platform helps farmers predict crop yields, optimize pricing, and connect with buyers. Consumers get fresh produce with full traceability from farm to their doorstep.",
      img: story2,
      reverse: true,
      icon: <FaGlobe className="text-4xl text-green-600" />,
      year: "2022"
    },
    {
      title: "Growing Together",
      content:
        "Today, AgroFarm supports over 10,000 farmers across 15 states. We've facilitated over $5M in direct farmer earnings while providing urban consumers with the freshest organic produce. Our community keeps growing as we innovate with blockchain for supply chain transparency.",
      img: story3,
      icon: <FaChartLine className="text-4xl text-green-600" />,
      year: "2024"
    },
  ];

  const achievements = [
    {
      title: "Sustainable Farming Award",
      description: "Recognized for promoting eco-friendly agricultural practices",
      icon: <FaAward className="text-3xl text-green-600" />
    },
    {
      title: "Top Agri-Tech Startup",
      description: "Awarded by Ministry of Agriculture for innovation",
      icon: <FaLeaf className="text-3xl text-green-600" />
    },
    {
      title: "10,000+ Farmers Empowered",
      description: "Directly impacting rural livelihoods",
      icon: <GiFarmer className="text-3xl text-green-600" />
    },
    {
      title: "95% Customer Satisfaction",
      description: "Based on verified buyer reviews",
      icon: <FaHandshake className="text-3xl text-green-600" />
    }
  ];

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Hero Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <motion.img
          src={ban3}
          alt="Farm landscape"
          className="w-full h-[70vh] object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Cultivating <span className="text-green-300">Connections</span>, <br />
              Harvesting <span className="text-green-300">Opportunities</span>
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Revolutionizing agriculture through direct farmer-consumer partnerships
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-all flex items-center gap-2">
                <FaTractor /> Explore Our Story
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white shadow-lg -mt-12 relative z-30 mx-6 rounded-xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "10,000+", label: "Farmers Empowered", icon: <GiFarmer className="text-3xl text-green-600" /> },
            { value: "15", label: "States Covered", icon: <FaGlobe className="text-3xl text-green-600" /> },
            { value: "$5M+", label: "Farmer Earnings", icon: <FaChartLine className="text-3xl text-green-600" /> },
            { value: "100%", label: "Traceability", icon: <FaLeaf className="text-3xl text-green-600" /> },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center p-4 bg-green-50 rounded-lg"
            >
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-green-900">{stat.value}</h3>
              <p className="text-gray-600 mt-1 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-green-600 font-semibold tracking-wider">OUR JOURNEY</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-3">From Seed to Success</h2>
          <div className="w-24 h-1 bg-green-500 mx-auto mt-4" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 h-full w-0.5 bg-green-200 transform -translate-x-1/2" />
          
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 mb-24 relative`}
            >
              {/* Timeline dot */}
              <div className="hidden md:block absolute left-1/2 w-6 h-6 rounded-full bg-green-600 border-4 border-white shadow-xl transform -translate-x-1/2 -translate-y-1/2 top-1/2" />
              
              <div className="md:w-5/12">
                <motion.div 
                  whileHover={{ scale: 1.02 }} 
                  className="overflow-hidden rounded-2xl shadow-xl relative"
                >
                  <img
                    src={story.img}
                    alt={story.title}
                    className="w-full h-64 md:h-80 object-cover transform hover:scale-105 transition duration-700"
                  />
                  <div className="absolute bottom-0 left-0 bg-green-600 text-white px-4 py-2 font-medium">
                    {story.year}
                  </div>
                </motion.div>
              </div>
              
              <div className="md:w-5/12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    {story.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">{story.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{story.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Achievements</h2>
            <p className="text-green-200 max-w-2xl mx-auto">
              Recognized for excellence in agricultural innovation and social impact
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-green-100 text-sm mt-1">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-green-600 font-semibold tracking-wider">MEET THE TEAM</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3">Our Leadership</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mt-4" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={founder.img}
                    alt={founder.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900">{founder.name}</h3>
                  <p className="text-green-600 font-medium mt-1">{founder.role}</p>
                  <p className="text-gray-600 mt-4">{founder.desc}</p>
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2">
                    <FaUserTie className="text-green-600" />
                    <span className="text-sm text-gray-500">Co-Founder</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-green-600 font-semibold tracking-wider">TESTIMONIALS</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3">What Our Community Says</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mt-4" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ravi Kumar",
                role: "Farmer, Punjab",
                feedback:
                  "AgroFarm has transformed my livelihood. I now earn 40% more by selling directly to consumers without middlemen taking cuts.",
                avatar: "RK",
              },
              {
                name: "Priya Sharma",
                role: "Customer, Delhi",
                feedback:
                  "The quality of produce is exceptional. Knowing exactly which farm my food comes from gives me peace of mind.",
                avatar: "PS",
              },
              {
                name: "Anand Singh",
                role: "Farmer, Uttar Pradesh",
                feedback:
                  "The technology tools provided help me optimize crop yields and get fair prices. This is the future of farming.",
                avatar: "AS",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <FaQuoteLeft className="text-green-600 text-2xl mb-4 opacity-30" />
                <p className="text-gray-700 leading-relaxed mb-6">"{testimonial.feedback}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center font-bold text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-green-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
<section className="relative py-24 bg-gradient-to-br from-green-800 to-green-900 text-white overflow-hidden mb-16"> {/* Added mb-16 for footer spacing */}
  {/* Decorative elements */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-0 w-40 h-40 bg-green-500 rounded-full filter blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-60 h-60 bg-green-400 rounded-full filter blur-3xl"></div>
  </div>
  
  <div className="relative max-w-5xl mx-auto px-6 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Section header */}
      <div className="mb-2">
        <span className="inline-block px-3 py-1 text-sm font-medium bg-white/10 rounded-full backdrop-blur-sm">
          GET STARTED
        </span>
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
        Transform Your <span className="text-green-300">Agricultural Experience</span>
      </h2>
      
      <p className="text-lg md:text-xl text-green-100 mb-10 max-w-3xl mx-auto leading-relaxed">
        Join thousands of farmers and consumers who are revolutionizing the agricultural supply chain through direct, transparent connections.
      </p>
      
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
        <motion.button
          whileHover={{ 
            y: -4,
            boxShadow: "0 12px 20px -5px rgba(255,255,255,0.2)",
            backgroundColor: "#f0fdf4"
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="flex-1 bg-white text-green-800 hover:text-green-900 font-semibold px-6 py-4 rounded-lg transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
        >
          <FaTractor className="text-xl" />
          <span>Farmer Registration</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>
        
        <motion.button
          whileHover={{ 
            y: -4,
            boxShadow: "0 12px 20px -5px rgba(255,255,255,0.1)",
            backgroundColor: "rgba(255,255,255,0.15)"
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="flex-1 bg-white/5 backdrop-blur-sm border border-white/20 hover:border-white/30 font-semibold px-6 py-4 rounded-lg transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
        >
          <FaStore className="text-xl" />
          <span>Consumer Portal</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </div>
      
      {/* Trust indicators - Removed or adjusted if causing overlap */}
      <div className="mt-12 pt-8 border-t border-white/10">
        <p className="text-sm text-green-200 mb-4">TRUSTED BY INDUSTRY LEADERS</p>
        <div className="flex flex-wrap justify-center items-center gap-6 opacity-80">
          {/* Replace these divs with actual logo components if available */}
          <div className="w-24 h-12 bg-white/10 rounded-lg flex items-center justify-center">
            <span className="text-xs">Partner 1</span>
          </div>
          <div className="w-24 h-12 bg-white/10 rounded-lg flex items-center justify-center">
            <span className="text-xs">Partner 2</span>
          </div>
          <div className="w-24 h-12 bg-white/10 rounded-lg flex items-center justify-center">
            <span className="text-xs">Partner 3</span>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>
    </div>
  );
};

export default AboutUs;