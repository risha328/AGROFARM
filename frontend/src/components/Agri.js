import React from 'react';
import { Link } from 'react-router-dom';


const AgriculturePromo = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 rounded-xl min-h-[500px] overflow-hidden mb-10">
      {/* Background container with relative positioning */}
      <div className="relative w-full h-full rounded-xl">
        <div 
          className="absolute inset-0 rounded-xl"
          style={{
            backgroundImage: "url('https://plus.unsplash.com/premium_photo-1661962685099-c6a685e6c61d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWdyaWN1bHR1cmFsfGVufDB8fDB8fHww')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            
          }}
        ></div>
      {/* Content container with glass morphism effect */}
      <div className="relative z-10 bg-white/20 backdrop-blur-sm p-8 rounded-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-4">
          Buy & Sell Farm Produce Directly
        </h1>
        
        <p className="text-lg text-green-700 text-center max-w-3xl mx-auto mb-8">
          Connect directly with farmers and buyers for the best prices
        </p>

        {/* Transparent link cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          <TransparentCard 
            title="For Farmers"
            description="Sell your produce at competitive prices"
            linkText="Start Selling"
            to="/add-product"
            icon="🌱"
          />
          <TransparentCard 
            title="For Buyers"
            description="Get fresh produce directly from farms"
            linkText="Browse Products"
            to="/product-category"
            icon="🛒"
          />
        </div>


         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <TransparentCard 
            title="For Machine Renters"
            description="Rent Your Own machines"
            linkText="Rent Machine"
            to="/product-category?category=machinaries"
            icon="🌱"
          />
          <TransparentCard 
            title="Labour Apply"
            description="Application of labour"
            linkText="Apply to labour role"
            to="/labour"
            icon="🛒"
          />
        </div>
      </div>
    </div>
    </div>
    
  );
};

const TransparentCard = ({ title, description, linkText, to, icon }) => (
  <Link 
    to={to} 
    className="group h-full transition-all duration-300 hover:scale-[1.02]"
  >
    <div className="h-full p-6 bg-white/30 backdrop-blur-md border-2 border-white/40 rounded-xl shadow-lg hover:shadow-xl hover:bg-white/40 transition-all">
      <div className="flex items-start gap-4">
        <span className="text-4xl p-3 bg-white/30 rounded-full">{icon}</span>
        <div>
          <h3 className="text-xl font-bold text-green-800 mb-2">{title}</h3>
          <p className="text-green-700 mb-4">{description}</p>
          <button className="px-4 py-2 bg-green-600/90 hover:bg-green-700 text-white rounded-lg transition-colors">
            {linkText} →
          </button>
        </div>
      </div>
    </div>
    
  </Link>
);

export default AgriculturePromo;