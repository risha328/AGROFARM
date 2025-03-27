import React from 'react'
import { FaSeedling, FaTractor, FaTools } from 'react-icons/fa'

const OfferSection = () => {
    return (
        <section className="bg-gradient-to-br from-green-50 to-white py-16 px-6 rounded-2xl shadow-lg max-w-7xl mx-auto my-10">
            <h2 className="text-3xl font-extrabold text-green-700 mb-8 text-center">🔥 Today's Special Offers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                <div className="bg-white p-6 rounded-2xl shadow hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <div className="flex items-center gap-3 mb-3">
                        <FaSeedling className="text-green-600 text-2xl" />
                        <h3 className="font-semibold text-xl text-green-600">Up to 30% off on Seeds</h3>
                    </div>
                    <p className="text-sm text-gray-600">Get premium quality seeds at unbeatable prices to boost your crop yield.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <div className="flex items-center gap-3 mb-3">
                        <FaTractor className="text-green-600 text-2xl" />
                        <h3 className="font-semibold text-xl text-green-600">Fertilizers Mega Sale</h3>
                    </div>
                    <p className="text-sm text-gray-600">Enhance your soil productivity with certified fertilizers at discounted rates.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <div className="flex items-center gap-3 mb-3">
                        <FaTools className="text-green-600 text-2xl" />
                        <h3 className="font-semibold text-xl text-green-600">Tools Starting from ₹99</h3>
                    </div>
                    <p className="text-sm text-gray-600">Affordable, durable & modern farming tools to make your work easier.</p>
                </div>

            </div>
        </section>
    )
}

export default OfferSection


