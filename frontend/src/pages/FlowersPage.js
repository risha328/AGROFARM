// import React from 'react'
// import { motion } from 'framer-motion'
// import { FaShoppingCart } from 'react-icons/fa'
// import VerticalCardProduct from '../components/VerticalCardProduct'

// const flowersData = [
//   {
//     id: 1,
//     name: 'Red Roses Bouquet',
//     price: '₹899',
//     image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
//     description: '12 fresh red roses with baby breath fillers, perfect for romantic occasions.',
//   },
//   {
//     id: 2,
//     name: 'Sunflower Arrangement',
//     price: '₹649',
//     image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
//     description: 'Bright and cheerful sunflowers that bring warmth to any space.',
//   },
//   {
//     id: 3,
//     name: 'White Lilies',
//     price: '₹799',
//     image: 'https://images.unsplash.com/photo-1560713781-d8e3e7a6f2c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
//     description: 'Elegant white lilies symbolizing purity and refined beauty.',
//   },
//   {
//     id: 4,
//     name: 'Mixed Seasonal Flowers',
//     price: '₹549',
//     image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
//     description: 'Vibrant seasonal flowers arranged by our expert florists.',
//   },
//   {
//     id: 5,
//     name: 'Orchid Plant',
//     price: '₹1299',
//     image: 'https://images.unsplash.com/photo-1533603208986-24c19029a893?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
//     description: 'Exotic purple orchid plant in decorative pot - long lasting beauty.',
//   },
//   {
//     id: 6,
//     name: 'Tulip Bouquet',
//     price: '₹749',
//     image: 'https://images.unsplash.com/photo-1526397751294-331021109fbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
//     description: 'Fresh pink tulips that symbolize perfect love and cheerfulness.',
//   },
//   {
//     id: 7,
//     name: 'Lavender Bundle',
//     price: '₹399',
//     image: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
//     description: 'Fragrant lavender stems - perfect for home decor or gifts.',
//   },
//   {
//     id: 8,
//     name: 'Peony Arrangement',
//     price: '₹999',
//     image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
//     description: 'Lush pink peonies that represent prosperity and good fortune.',
//   },
// ]

// const FlowersPage = () => {
//   return (
//     <div className="bg-pink-50 min-h-screen">
//       {/* Hero Section */}
//       <div className="relative w-full h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')" }}>
//         <div className="bg-black/30 absolute inset-0 flex items-center justify-center">
//           <motion.h1 
//             className="text-white text-4xl md:text-5xl font-bold tracking-wide text-center px-4"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             Beautiful Fresh Flowers
//           </motion.h1>
//         </div>
//       </div>

//       {/* Grid of Flowers */}
//       <div className="max-w-6xl mx-auto py-12 px-4">
//         <motion.h2
//           className="text-3xl font-semibold text-pink-800 mb-8 text-center"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           Handcrafted Floral Arrangements
//         </motion.h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {flowersData.map((flower, index) => (
//             <motion.div
//               key={flower.id}
//               className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1, duration: 0.5 }}
//               whileHover={{ y: -5 }}
//             >
//               <div className="h-48 overflow-hidden">
//                 <img
//                   src={flower.image}
//                   alt={flower.name}
//                   className="w-full h-full object-cover transition duration-500 hover:scale-105"
//                 />
//               </div>
//               <div className="p-5">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-1">{flower.name}</h3>
//                 <p className="text-sm text-gray-600 mb-3">{flower.description}</p>
//                 <div className="flex items-center justify-between mt-4">
//                   <span className="text-lg font-bold text-pink-700">{flower.price}</span>
//                   <button className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition">
//                     <FaShoppingCart className="text-sm" />
//                     <span className="text-sm">Add</span>
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Featured Products Section */}
//       <div className="bg-white py-12">
//         <div className="max-w-6xl mx-auto px-4">
//           <VerticalCardProduct category={"flowers"} heading={"Seasonal Special Flowers"} />
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="bg-pink-100 py-16">
//         <div className="max-w-4xl mx-auto text-center px-4">
//           <h3 className="text-2xl font-bold text-pink-800 mb-4">Need Custom Flower Arrangements?</h3>
//           <p className="text-gray-600 mb-6">Our expert florists can create beautiful custom bouquets for any occasion.</p>
//           <button className="bg-pink-600 text-white px-8 py-3 rounded-full font-medium hover:bg-pink-700 transition shadow-md">
//             Contact Our Florists
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FlowersPage


import React from 'react'
import { motion } from 'framer-motion'
import { FaShoppingCart, FaSeedling } from 'react-icons/fa'
import VerticalCardProduct from '../components/VerticalCardProduct'

const agriFlowersData = [
//   {
//     id: 1,
//     name: 'Marigold Seedlings (100 plants)',
//     price: '₹249',
//     image: 'https://images.unsplash.com/photo-1599598177991-ec67b5c37318?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
//     description: 'High-yield marigold seedlings for commercial flower farming. Ready for transplantation.',
//     type: 'seedlings',
//     yield: '3-4 months',
//   },
//   {
//     id: 2,
//     name: 'Jasmine Cuttings (50 pieces)',
//     price: '₹399',
//     image: 'https://images.unsplash.com/photo-1597826368522-9f4cb5a6ba48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
//     description: 'Premium quality jasmine cuttings for perfume industry and garland making.',
//     type: 'cuttings',
//     yield: '6-8 months',
//   },
  {
    id: 3,
    name: 'Rose Grafted Plants (10 plants)',
    price: '₹599',
    image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Hybrid tea rose plants suitable for cut flower business. Disease resistant variety.',
    type: 'grafted plants',
    yield: '1 year',
  },
  {
    id: 4,
    name: 'Chrysanthemum Roots (25 roots)',
    price: '₹349',
    image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Premium chrysanthemum roots for seasonal flower cultivation. High market demand.',
    type: 'roots',
    yield: '3-4 months',
  },
  {
    id: 5,
    name: 'Tuberose Bulbs (100 bulbs)',
    price: '₹499',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Fragrant tuberose bulbs for commercial flower cultivation. High flower yield.',
    type: 'bulbs',
    yield: '6-7 months',
  },
//   {
//     id: 6,
//     name: 'Crossandra Seeds (500g)',
//     price: '₹299',
//     image: 'https://images.unsplash.com/photo-1605007493699-af65834f8aa3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
//     description: 'High germination crossandra seeds for garland flowers. Drought resistant.',
//     type: 'seeds',
//     yield: '4-5 months',
//   },
  {
    id: 7,
    name: 'Gerbera Tissue Culture Plants (20 plants)',
    price: '₹899',
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Disease-free gerbera plants for greenhouse cultivation. Long stem varieties.',
    type: 'tissue culture',
    yield: '8-10 months',
  },
//   {
//     id: 8,
//     name: 'Orchid Seedlings (5 plants)',
//     price: '₹1299',
//     image: 'https://images.unsplash.com/photo-1533603208986-24c19029a893?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
//     description: 'Premium orchid seedlings for floriculture business. High-value export quality.',
//     type: 'seedlings',
//     yield: '1.5-2 years',
//   },
]

const AgriFlowersPage = () => {
  return (
    <div className="bg-green-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')" }}>
        <div className="bg-black/40 absolute inset-0 flex items-center justify-center">
          <motion.h1 
            className="text-white text-3xl md:text-5xl font-bold tracking-wide text-center px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Commercial Flower Cultivation Supplies
          </motion.h1>
        </div>
      </div>

      {/* Grid of Agricultural Flowers */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <motion.h2
          className="text-3xl font-semibold text-green-800 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          High-Yield Flowering Plants for Farmers
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {agriFlowersData.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden border border-green-100"
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
                    <p className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full inline-block mb-2">
                      {product.type}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-green-700 whitespace-nowrap">{product.price}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <FaSeedling className="mr-1 text-green-500" />
                    <span>Yield: {product.yield}</span>
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
            <h3 className="text-2xl font-bold text-green-800 mb-4">Flower Farming Tips</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-green-700 mb-2">Soil Preparation</h4>
                <p className="text-sm text-gray-600">Ensure well-drained soil with pH 6.0-7.0. Add organic manure 15 days before planting.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-green-700 mb-2">Irrigation</h4>
                <p className="text-sm text-gray-600">Drip irrigation recommended. Water early morning to prevent fungal diseases.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-green-700 mb-2">Pest Control</h4>
                <p className="text-sm text-gray-600">Use neem oil spray weekly as preventive measure against common pests.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="bg-green-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
         <VerticalCardProduct category={"flowers"} heading={"Seasonal Special Flowers"} />
       </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-100 py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-2xl font-bold text-green-800 mb-4">Need Bulk Orders or Farming Consultancy?</h3>
          <p className="text-gray-600 mb-6">Our agricultural experts can help you plan your flower cultivation for maximum yield and profit.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition shadow-md">
              Request Bulk Quote
            </button>
            <button className="bg-white text-green-600 border border-green-600 px-6 py-2 rounded-full font-medium hover:bg-green-50 transition">
              Talk to Expert
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgriFlowersPage