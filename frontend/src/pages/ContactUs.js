import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import contactBanner from "../assest/contact-banner.jpg";
import officeImage from "../assest/office.jpg";

const ContactUs = () => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Hero Banner */}
      <div className="relative overflow-hidden h-96">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src={contactBanner}
          alt="Farm landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Get in <span className="text-green-300">Touch</span> With Us
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              We're here to help and answer any questions you might have about AgroFarm.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Contact Form */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="p-8">
              <h2 className="text-3xl font-bold text-green-800 mb-2">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">We typically respond within 24 hours</p>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  >
                    <option>General Inquiry</option>
                    <option>Farmer Support</option>
                    <option>Customer Support</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition-all"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Office Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-2xl shadow-xl"
            >
              <img
                src={officeImage}
                alt="AgroFarm office"
                className="w-full h-64 object-cover hover:scale-105 transition duration-700"
              />
            </motion.div>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <div className="text-green-600 mb-4">
                  <FaMapMarkerAlt className="text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Office</h3>
                <p className="text-gray-600">123 Farm Lane<br />Agricultural District<br />New Delhi, 110001</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <div className="text-green-600 mb-4">
                  <FaPhone className="text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600">
                  <a href="tel:+911234567890" className="hover:text-green-600 transition">+91 12345 67890</a><br />
                  <a href="tel:+911234567891" className="hover:text-green-600 transition">+91 12345 67891</a>
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <div className="text-green-600 mb-4">
                  <FaEnvelope className="text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600">
                  <a href="mailto:info@agrofarm.com" className="hover:text-green-600 transition">info@agrofarm.com</a><br />
                  <a href="mailto:support@agrofarm.com" className="hover:text-green-600 transition">support@agrofarm.com</a>
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <div className="text-green-600 mb-4">
                  <FaClock className="text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Working Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9AM - 6PM<br />
                  Saturday: 10AM - 4PM<br />
                  Sunday: Closed
                </p>
              </motion.div>
            </div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-green-50 p-6 rounded-xl"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition">
                  <FaLinkedin className="text-xl" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition">
                  <FaInstagram className="text-xl" />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-green-800">Our Location</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mt-4" />
          </motion.div>

          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.566208449678!2d77.20986531508235!3d28.62873938242579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="filter grayscale hover:grayscale-0 transition duration-700"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;