import React from 'react'
import { motion } from 'framer-motion'
import { FaShoppingCart, FaLeaf } from 'react-icons/fa'
import VerticalCardProduct from '../components/VerticalCardProduct'

const agriVegetablesData = [
  
  {
    id: 2,
    name: 'Bell Pepper Seedlings (50 plants)',
    price: '₹499',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Premium quality bell pepper seedlings for greenhouse cultivation.',
    type: 'seedlings',
    yield: '90-120 days',
    variety: 'California Wonder'
  },
  {
    id: 3,
    name: 'Onion Sets (1kg)',
    price: '₹299',
    image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'High-quality onion sets for uniform bulb development. Long storage variety.',
    type: 'sets',
    yield: '120-150 days',
    variety: 'Red Creole'
  },
  {
    id: 4,
    name: 'Cabbage Transplants (25 plants)',
    price: '₹249',
    image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Early maturing cabbage transplants with tight head formation.',
    type: 'transplants',
    yield: '70-85 days',
    variety: 'Golden Acre'
  },
  {
    id: 5,
    name: 'Carrot Seeds (250g)',
    price: '₹199',
    image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Nantes type carrot seeds with uniform root shape and sweet flavor.',
    type: 'seeds',
    yield: '65-75 days',
    variety: 'Nantes'
  },
 
//   {
//     id: 8,
//     name: 'Brinjal Grafted Plants (10 plants)',
//     price: '₹599',
//     image: 'https://images.unsplash.com/photo-1594282406344-e9203b5cda40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
//     description: 'Disease-resistant grafted brinjal plants for higher productivity.',
//     type: 'grafted plants',
//     yield: '90-110 days',
//     variety: 'Black Beauty'
//   },
]

const AgriVegetablesPage = () => {
  return (
    <div className="bg-blue-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://media.istockphoto.com/id/139496979/photo/assortment-of-fruits-and-vegetables-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=11gy8NdvIgwHzvMzymBdc2X2jHOq9e0lrFjfo9KKydY=')" }}>
        <div className="bg-black/40 absolute inset-0 flex items-center justify-center">
          <motion.h1 
            className="text-white text-3xl md:text-5xl font-bold tracking-wide text-center px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Commercial Vegetable Farming Supplies
          </motion.h1>
        </div>
      </div>

      {/* Grid of Agricultural Vegetables */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <motion.h2
          className="text-3xl font-semibold text-blue-800 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          High-Yield Vegetable Cultivation Materials
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {agriVegetablesData.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden border border-blue-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="h-48 overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        {product.type}
                      </span>
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        {product.variety}
                      </span>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-blue-700 whitespace-nowrap">{product.price}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <FaLeaf className="mr-1 text-green-500" />
                    <span>Harvest: {product.yield}</span>
                  </div>
                  <button className="flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition text-sm">
                    <FaShoppingCart className="text-xs" />
                    <span>Order</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Farming Tips Section */}
      <div className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-green-50 rounded-xl p-6 md:p-8 border border-green-100">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Vegetable Farming Best Practices</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-blue-700 mb-2">Crop Rotation</h4>
                <p className="text-sm text-gray-600">Rotate vegetable families annually to prevent soil-borne diseases and nutrient depletion.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-blue-700 mb-2">Irrigation Management</h4>
                <p className="text-sm text-gray-600">Use drip irrigation for water efficiency. Avoid overhead watering to prevent foliar diseases.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-blue-700 mb-2">IPM Strategies</h4>
                <p className="text-sm text-gray-600">Implement Integrated Pest Management with biological controls and selective pesticides.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="bg-blue-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <VerticalCardProduct category={"vegetables"} heading={"Top Performing Vegetable Varieties"} />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-100 py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-2xl font-bold text-green-800 mb-4">Need Farming Advice or Bulk Supplies?</h3>
          <p className="text-gray-600 mb-6">Our agricultural specialists can help you optimize your vegetable production for better yields and profits.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-md">
              Get Farming Plan
            </button>
            <button className="bg-white text-green-600 border border-green-600 px-6 py-2 rounded-full font-medium hover:bg-blue-50 transition">
              Request Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgriVegetablesPage