import React from 'react'

const Testimonials = () => {
    return (
        <section className="bg-green-50 py-16 px-4 rounded-2xl shadow-md max-w-7xl mx-auto my-10">
            <h2 className="text-3xl font-extrabold text-green-700 mb-8 text-center">💬 What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
                    <p className="text-sm text-gray-600 mb-3">"I bought seeds and fertilizers from Kishan2Kitchen and the results were amazing. Highly recommended!"</p>
                    <h4 className="text-green-600 font-semibold">- Ravi Kumar, Punjab</h4>
                </div>

                <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
                    <p className="text-sm text-gray-600 mb-3">"Fast delivery and excellent quality. My plants have never been healthier!"</p>
                    <h4 className="text-green-600 font-semibold">- Sunita Devi, Bihar</h4>
                </div>

                <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
                    <p className="text-sm text-gray-600 mb-3">"Reliable products at affordable prices. I am a regular customer now."</p>
                    <h4 className="text-green-600 font-semibold">- Mahesh Patel, Gujarat</h4>
                </div>

            </div>
        </section>
    )
}

export default Testimonials

