import { motion } from "framer-motion";
import { FaCalendarAlt, FaUser, FaTags, FaArrowRight, FaSearch, FaShareAlt } from "react-icons/fa";
import blogBanner from "../assest/blog-banner.jpg";
import post1 from "../assest/blog-post1.jpg";
import post2 from "../assest/blog-post2.jpg";
import post3 from "../assest/blog-post3.jpg";
import post4 from "../assest/blog-post4.jpg";

const Blog = () => {
  const featuredPosts = [
    {
      id: 1,
      title: "Revolutionizing Agriculture with Smart Farming Techniques",
      excerpt: "Discover how modern technology is transforming traditional farming methods for higher yields and sustainability.",
      image: post1,
      date: "May 15, 2023",
      author: "Dr. Priya Sharma",
      category: "Technology",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "The Future of Organic Farming in India",
      excerpt: "Exploring the growing demand for organic produce and how small farmers can benefit from this trend.",
      image: post2,
      date: "April 28, 2023",
      author: "Rajesh Patel",
      category: "Organic Farming",
      readTime: "4 min read"
    }
  ];

  const recentPosts = [
    {
      id: 3,
      title: "How AgroFarm is Empowering Women in Agriculture",
      excerpt: "Meet the women farmers breaking barriers and leading agricultural innovation in rural communities.",
      image: post3,
      date: "April 10, 2023",
      author: "Ayesha Khan",
      category: "Community",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Sustainable Water Management for Small Farms",
      excerpt: "Practical water conservation techniques that can help farmers combat drought conditions.",
      image: post4,
      date: "March 22, 2023",
      author: "Dr. Arun Desai",
      category: "Sustainability",
      readTime: "7 min read"
    }
  ];

  const categories = [
    "Technology",
    "Organic Farming",
    "Sustainability",
    "Farmer Stories",
    "Market Trends",
    "AgroFarm Updates"
  ];

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Hero Banner */}
      <div className="relative overflow-hidden h-96">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src={blogBanner}
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
              AgroFarm <span className="text-green-300">Insights</span>
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Expert knowledge, farmer stories, and agricultural innovations
            </p>
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-6 py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <FaSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-green-200" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Blog Posts */}
          <div className="lg:col-span-2">
            {/* Featured Posts */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-green-800 mb-8 pb-2 border-b border-green-200">Featured Articles</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover hover:scale-105 transition duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span className="flex items-center mr-4">
                          <FaCalendarAlt className="mr-1 text-green-600" />
                          {post.date}
                        </span>
                        <span className="flex items-center">
                          <FaUser className="mr-1 text-green-600" />
                          {post.author}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {post.category}
                        </span>
                        <a href="#" className="text-green-600 hover:text-green-800 font-medium flex items-center">
                          Read more <FaArrowRight className="ml-2" />
                        </a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>

            {/* Recent Posts */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-green-800 mb-8 pb-2 border-b border-green-200">Recent Articles</h2>
              <div className="space-y-8">
                {recentPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    whileHover={{ y: -3 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all flex flex-col md:flex-row"
                  >
                    <div className="md:w-1/3 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition duration-700 min-h-48"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span className="flex items-center mr-4">
                          <FaCalendarAlt className="mr-1 text-green-600" />
                          {post.date}
                        </span>
                        <span className="flex items-center">
                          <FaUser className="mr-1 text-green-600" />
                          {post.author}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            {post.category}
                          </span>
                          <span className="text-xs text-gray-500">{post.readTime}</span>
                        </div>
                        <div className="flex space-x-3">
                          <button className="text-gray-400 hover:text-green-600">
                            <FaShareAlt />
                          </button>
                          <a href="#" className="text-green-600 hover:text-green-800 font-medium flex items-center">
                            Read <FaArrowRight className="ml-1 text-sm" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* About Widget */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">About AgroFarm Blog</h3>
                <p className="text-gray-600 mb-4">
                  Our blog shares knowledge, innovations, and stories from the agricultural community to empower farmers and educate consumers.
                </p>
                <button className="text-green-600 hover:text-green-800 font-medium flex items-center">
                  Learn more about us <FaArrowRight className="ml-2" />
                </button>
              </div>

              {/* Categories Widget */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <a href="#" className="flex items-center justify-between py-2 text-gray-600 hover:text-green-600 transition">
                        <span className="flex items-center">
                          <FaTags className="mr-2 text-green-600 text-sm" />
                          {category}
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                          24
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter Widget */}
              <div className="bg-green-800 text-white p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">Subscribe to Our Newsletter</h3>
                <p className="text-green-100 mb-4">
                  Get the latest agricultural insights and AgroFarm updates directly to your inbox.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                  <button
                    type="submit"
                    className="w-full bg-white text-green-800 hover:bg-gray-100 font-semibold py-3 px-4 rounded-lg transition-all"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="text-xs text-green-200 mt-3">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    {/* Premium CTA Section - Fixed Footer Overlap */}
<section className="relative py-20 bg-gradient-to-r from-green-800 to-green-700 text-white mb-16"> {/* Added margin-bottom */}
  {/* Decorative elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/5 to-transparent"></div>
    <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-600 rounded-full filter blur-3xl opacity-20"></div>
  </div>

  <div className="relative max-w-5xl mx-auto px-6">
    <div className="text-center">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <span className="inline-block px-4 py-1.5 text-sm font-medium tracking-wider bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
          SHARE YOUR STORY
        </span>
      </motion.div>
      
      <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
        Join Our <span className="text-green-300">Agricultural Community</span>
      </h2>
      
      <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
        We celebrate authentic stories from farmers, agronomists, and food producers. Share your experience and inspire others.
      </p>
      
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
        <motion.button
          whileHover={{ 
            y: -3,
            backgroundColor: "#f0fdf4",
            boxShadow: "0 10px 25px -5px rgba(255,255,255,0.3)"
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="bg-white text-green-800 hover:text-green-900 font-semibold px-8 py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Contribute Article
        </motion.button>
        
        <motion.button
          whileHover={{ 
            y: -3,
            backgroundColor: "rgba(255,255,255,0.15)",
            boxShadow: "0 10px 25px -5px rgba(255,255,255,0.1)"
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="bg-white/5 backdrop-blur-sm border border-white/20 hover:border-white/30 font-semibold px-8 py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          Contact Editors
        </motion.button>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default Blog;