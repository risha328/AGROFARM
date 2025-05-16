import React from 'react'
import { motion } from 'framer-motion'
import { FaShoppingCart } from 'react-icons/fa'
//import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const fruitsData = [
  {
    id: 1,
    name: 'Fresh Mangoes',
    price: '₹120 / kg',
    image: '/assets/logos/mango.jpg',
    description: 'Sweet and juicy mangoes directly from organic farms.',
  },
  {
    id: 2,
    name: 'Organic Bananas',
    price: '₹50 / dozen',
    image: '/assets/logos/banana.jpg',
    description: 'Ripe and healthy bananas full of nutrients.',
  },
  {
    id: 3,
    name: 'Farm Apples',
    price: '₹150 / kg',
    image: '/assets/logos/apple.jpg',
    description: 'Crisp red apples harvested from hilly orchards.',
  },
  {
    id: 4,
    name: 'Papayas',
    price: '₹60 / kg',
    image: '/assets/logos/papaya.jpg',
    description: 'Rich in fiber and good for digestion.',
  },
  // Add more fruits as needed
]

const FruitsPage = () => {
  return (
    <div className="bg-green-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-60 bg-cover bg-center" style={{ backgroundImage: "url('/assets/logos/fruit-banner.jpg')" }}>
        <div className="bg-black/40 absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold tracking-wide">Fresh Farm Fruits</h1>
        </div>
      </div>

      {/* Grid of Fruits */}
      <div className="max-w-6xl mx-auto py-10 px-4">
        <motion.h2
          className="text-3xl font-semibold text-green-800 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Pick from Our Fresh Harvest
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {fruitsData.map((fruit, index) => (
            <motion.div
              key={fruit.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <img
                src={fruit.image}
                alt={fruit.name}
                className="w-full h-40 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-green-700">{fruit.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{fruit.description}</p>
                <p className="text-lg font-bold text-green-800 mt-3">{fruit.price}</p>
                <button className="mt-4 w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">
                  <FaShoppingCart />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <VerticalCardProduct category={"fruits"} heading={"Top Selling Fruits"}/>
    </div>
  )
}

export default FruitsPage
