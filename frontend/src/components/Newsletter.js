import React from 'react'

const Newsletter = () => {
    return (
        <section className="bg-white py-16 px-6 rounded-2xl shadow-md max-w-4xl mx-auto my-10 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-green-700 mb-4">📬 Subscribe to Our Newsletter</h2>
            <p className="text-sm text-gray-600 mb-6">Get the latest offers, discounts, and farming tips directly to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <input type="email" placeholder="Enter your email" className="border border-green-300 rounded-xl px-4 py-2 w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-green-400 transition" />
                <button className="bg-green-600 text-white rounded-xl px-6 py-2 hover:bg-green-700 transition">Subscribe</button>
            </div>
        </section>
    )
}

export default Newsletter

