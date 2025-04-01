import React from 'react';
import { QRCodeSVG } from 'qrcode.react'; // Import QRCodeSVG from qrcode.react

const AgriculturalHiringAd = () => {
  const googleFormUrl = "https://docs.google.com/forms/d/1mXExUZkIg5D_AJQaMdpsQhaSN2dRnZXchyds40ueeFc/preview";

  return (
    <div className="max-w-4xl mx-auto my-8 overflow-hidden rounded-xl shadow-2xl bg-gradient-to-r from-green-600 to-amber-500">
      {/* Banner Header */}
      <div className="relative h-48 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white text-center px-4">
            <span className="text-amber-300">FARM LABOURERS NEEDED!</span> JOIN OUR AGRICULTURAL TEAM
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 bg-white">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Positions */}
          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-4">🌱 Positions Available</h2>
            <ul className="space-y-2">
              {['Field Workers/Harvesters', 'Tractor Operators', 'Irrigation Technicians', 
                'Livestock Handlers', 'Orchard Workers'].map((position, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-2">✔</span>
                  <span className="text-gray-800 font-medium">{position}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Benefits */}
          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-4">💼 Farm Benefits</h2>
            <ul className="space-y-2">
              {[
                'Daily/Weekly Competitive Pay',
                'Housing Available (Seasonal)',
                'Fresh Farm Produce Included',
                'Flexible Seasonal Work',
                'Skill Development Training'
              ].map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-500 font-bold mr-2">✅</span>
                  <span className="text-gray-800">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Application Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {/* Online Application */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-bold text-green-700 mb-3">🌐 Online Application</h3>
            <p className="mb-4">Complete our simple 5-minute application form:</p>
            <a 
              href={googleFormUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors"
            >
              Apply Now Online
            </a>
            <p className="text-sm text-gray-600 mt-2">You'll need: ID, work history, contact info</p>
          </div>

          {/* QR Code Application */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
            <h3 className="text-xl font-bold text-amber-700 mb-3">📱 Mobile Application</h3>
            <p className="mb-4">Scan this QR code with your phone camera:</p>
            <div className="flex justify-center p-2 bg-white rounded">
              <QRCodeSVG
                value={googleFormUrl}
                size={128}
                level="H"
                includeMargin={true}
                fgColor="#1f2937"
              />
            </div>
            <p className="text-sm text-center text-gray-600 mt-2">
              or visit: <span className="font-mono">{googleFormUrl}</span>
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4 text-center">
          <div className="bg-amber-100 p-4 rounded-lg">
            <p className="font-bold text-amber-700">📞 Call for Help</p>
            <p className="text-lg font-mono">+1 (555) 123-4567</p>
            <p className="text-sm">9AM-5PM, Mon-Fri</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="font-bold text-green-700">📧 Email Us</p>
            <p className="text-lg">jobs@greenvalleyfarms.com</p>
          </div>
          <div className="bg-lime-100 p-4 rounded-lg">
            <p className="font-bold text-lime-700">🏢 Visit Office</p>
            <p className="text-lg">123 Farm Road, Agricity</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 py-4 bg-gradient-to-r from-amber-400 to-green-500 rounded-lg">
          <p className="text-white text-xl font-bold text-center animate-pulse">
            🌻 IMMEDIATE HIRING - START NEXT WEEK! 🌻
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgriculturalHiringAd;