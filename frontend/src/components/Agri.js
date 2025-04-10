import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AgriculturePromo = () => {
  const [showPopup, setShowPopup] = useState({
    machineRenter: false,
    labourApply: false
  });
  const [targetRoute, setTargetRoute] = useState('');
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    if (route === '/up') {
      setTargetRoute(route);
      setShowPopup({ ...showPopup, machineRenter: true });
    } else if (route === '/labour') {
      setTargetRoute(route);
      setShowPopup({ ...showPopup, labourApply: true });
    } else {
      navigate(route);
    }
  };

  const handleResponse = (isConfirmed, popupType) => {
    setShowPopup({ ...showPopup, [popupType]: false });
    if (isConfirmed) {
      navigate(targetRoute);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="w-full p-4 md:p-6 rounded-xl min-h-[500px] overflow-hidden mb-10">
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
        <div className="relative z-10 bg-white/20 backdrop-blur-sm p-6 md:p-8 lg:p-10 rounded-xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-green-800 mb-4">
            Buy & Sell Farm Produce Directly
          </h1>
          
          <p className="text-lg md:text-xl text-green-700 text-center max-w-3xl mx-auto mb-8">
            Connect directly with farmers and buyers for the best prices
          </p>

          {/* Grid layout for cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TransparentCard 
                title="For Farmers"
                description="Sell your produce at competitive prices"
                linkText="Start Selling"
                to="/add-product"
                icon="🌱"
                onClick={() => handleCardClick('/add-product')}
              />
              <TransparentCard 
                title="For Buyers"
                description="Get fresh produce directly from farms"
                linkText="Browse Products"
                to="/product-category"
                icon="🛒"
                onClick={() => handleCardClick('/product-category')}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TransparentCard 
                title="For Machine Renters"
                description="Rent Your Own machines"
                linkText="Rent Machine"
                to="/up"
                icon="🚜"
                onClick={() => handleCardClick('/up')}
              />
              <TransparentCard 
                title="Labour Apply"
                description="Application of labour"
                linkText="Apply to labour role"
                to="/labour"
                icon="👨‍🌾"
                onClick={() => handleCardClick('/labour')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Machine Renter Popup */}
      {showPopup.machineRenter && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-md border border-gray-200 transform transition-all duration-300 scale-95 hover:scale-100">
            <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 w-full"></div>
            
            <div className="p-6">
              <div className="flex justify-center mb-5">
                <div className="bg-green-100 p-4 rounded-full border-4 border-green-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl font-semibold text-center text-gray-800 mb-3">Machine Renter Verification</h3>
              <p className="text-gray-600 text-center mb-6">
                Are you looking to rent agricultural machinery? Please confirm to access our rental marketplace.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => handleResponse(true, 'machineRenter')}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Yes, I'm a Renter
                </button>
                <button
                  onClick={() => handleResponse(false, 'machineRenter')}
                  className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  No, I'm Not
                </button>
              </div>
              
              <p className="text-xs text-gray-400 text-center mt-6">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Labour Apply Popup */}
      {showPopup.labourApply && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-md border border-gray-200 transform transition-all duration-300 scale-95 hover:scale-100">
            <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 w-full"></div>
            
            <div className="p-6">
              <div className="flex justify-center mb-5">
                <div className="bg-blue-100 p-4 rounded-full border-4 border-blue-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl font-semibold text-center text-gray-800 mb-3">Labour Application</h3>
              <p className="text-gray-600 text-center mb-6">
                Are you applying for a labour position? Please confirm to proceed to the application form.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => handleResponse(true, 'labourApply')}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Yes, I'm Applying
                </button>
                <button
                  onClick={() => handleResponse(false, 'labourApply')}
                  className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  No, Cancel
                </button>
              </div>
              
              <p className="text-xs text-gray-400 text-center mt-6">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TransparentCard = ({ title, description, linkText, to, icon, onClick }) => (
  <div 
    onClick={onClick}
    className="group h-full transition-all duration-300 hover:scale-[1.02] cursor-pointer"
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
  </div>
);

export default AgriculturePromo;