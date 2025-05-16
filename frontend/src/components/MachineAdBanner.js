import React, { useState } from 'react';
import { 
  FaPhone, FaMapMarkerAlt, FaCheck, FaArrowRight, 
  FaStar, FaRegStar, FaRegBookmark, FaBookmark,
  FaUserTie, FaCalendarAlt, FaTractor
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CombinedAdBar = () => {
  const [activeTab, setActiveTab] = useState('machines');
  const [favorites, setFavorites] = useState({
    machine: false,
    labour: false
  });

  const toggleFavorite = (type) => {
    setFavorites(prev => ({...prev, [type]: !prev[type]}));
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('machines')}
          className={`flex-1 py-4 px-6 font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors
            ${activeTab === 'machines' 
              ? 'text-teal-700 border-b-2 border-teal-600 bg-teal-50' 
              : 'text-gray-500 hover:text-teal-600 hover:bg-teal-50'}`}
        >
          <FaTractor className="text-lg" />
          Farm Equipment
        </button>
        <button 
          onClick={() => setActiveTab('labour')}
          className={`flex-1 py-4 px-6 font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors
            ${activeTab === 'labour' 
              ? 'text-amber-700 border-b-2 border-amber-600 bg-amber-50' 
              : 'text-gray-500 hover:text-amber-600 hover:bg-amber-50'}`}
        >
          <FaUserTie className="text-lg" />
          Farm Labour
        </button>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {activeTab === 'machines' ? (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Image Section - Wider on larger screens */}
            <div className="relative w-full lg:w-2/5 xl:w-1/3">
              <img 
                src="https://media.istockphoto.com/id/652550482/photo/portrait-of-buffalo-shepherd.jpg?s=2048x2048&w=is&k=20&c=kzSh6R9l0PWBOtfAJOzAj2GHZ1wyK_WBPjELw4Y6zsU=" 
                alt="Farm Equipment" 
                className="w-full h-64 lg:h-72 object-cover rounded-lg shadow-sm"
              />
              <button 
                onClick={() => toggleFavorite('machine')}
                className={`absolute top-3 left-3 p-2 rounded-full transition-colors
                  ${favorites.machine ? 'bg-teal-100 text-teal-600' : 'bg-white text-gray-400'} 
                  shadow-md hover:bg-teal-100 hover:text-teal-600`}
              >
                {favorites.machine ? <FaBookmark size={16} /> : <FaRegBookmark size={16} />}
              </button>
              <div className="absolute bottom-3 left-3 bg-white/95 px-3 py-1.5 rounded-md shadow-sm border border-gray-100">
                <div className="text-teal-800 font-bold text-lg">₹2,500</div>
                <div className="text-xs text-gray-500">per day</div>
              </div>
            </div>
            
            {/* Details Section */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">Tructor</h3>
                <span className="inline-flex items-center bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium">
                  <FaCheck className="mr-1" size={10} />
                  Verified Supplier
                </span>
              </div>
              
              <div className="flex items-center text-sm mb-4">
                <div className="flex text-amber-400 mr-2">
                  <FaStar size={14} /><FaStar size={14} /><FaStar size={14} /><FaStar size={14} /><FaRegStar size={14} />
                </div>
                <span className="text-gray-600">4.7 (32 reviews)</span>
              </div>
              
              <div className="mb-5">
                <p className="text-gray-600 text-sm md:text-base mb-4">
                  Premium quality tractor with 50HP engine, suitable for all farming operations. Includes cultivator attachment. Well-maintained with service records.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="flex items-center text-sm bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                    <FaMapMarkerAlt className="text-teal-600 mr-2" size={12} />
                    <span className="text-gray-700">Hooghly, WB</span>
                  </div>
                  <a href="tel:+919876543210" className="flex items-center text-sm bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-teal-50">
                    <FaPhone className="text-teal-600 mr-2" size={12} />
                    <span className="text-gray-700">+91 98765 43210</span>
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:+919876543210" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-lg text-center font-medium transition-colors flex items-center justify-center gap-2">
                  <FaPhone size={14} />
                  Call Now
                </a>
                <Link to="/browse-machine" className="flex-1 border border-teal-600 text-teal-700 hover:bg-teal-50 py-2.5 rounded-lg text-center font-medium transition-colors flex items-center justify-center gap-2">
                  View Details
                  <FaArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Image Section - Wider on larger screens */}
            <div className="relative w-full lg:w-2/5 xl:w-1/3">
              <img 
                src="https://media.istockphoto.com/id/641940492/photo/rural-women-cutting-silage-for-domestic-cattle.jpg?s=612x612&w=0&k=20&c=MSTEAtpcbIxfiN-BsEMVAGqvMC7IgoaLrZzRsN4Fjyg=" 
                alt="Farm Labour" 
                className="w-full h-64 lg:h-72 object-cover rounded-lg shadow-sm"
              />
              <button 
                onClick={() => toggleFavorite('labour')}
                className={`absolute top-3 left-3 p-2 rounded-full transition-colors
                  ${favorites.labour ? 'bg-amber-100 text-amber-600' : 'bg-white text-gray-400'} 
                  shadow-md hover:bg-amber-100 hover:text-amber-600`}
              >
                {favorites.labour ? <FaBookmark size={16} /> : <FaRegBookmark size={16} />}
              </button>
              <div className="absolute bottom-3 left-3 bg-white/95 px-3 py-1.5 rounded-md shadow-sm border border-gray-100">
                <div className="text-amber-700 font-bold text-lg">₹600</div>
                <div className="text-xs text-gray-500">per worker/day</div>
              </div>
            </div>
            
            {/* Details Section */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">Skilled Agricultural Labor Team</h3>
                <span className="inline-flex items-center bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium">
                  <FaCheck className="mr-1" size={10} />
                  Verified Provider
                </span>
              </div>
              
              <div className="flex flex-wrap items-center text-sm mb-4 gap-4">
                <div className="flex items-center text-gray-600">
                  <FaUserTie className="text-amber-500 mr-2" size={14} />
                  <span>5+ Years Experience</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="text-amber-500 mr-2" size={14} />
                  <span>Immediate Availability</span>
                </div>
              </div>
              
              <div className="mb-5">
                <p className="text-gray-600 text-sm md:text-base mb-4">
                  Experienced team of 10 farm workers specializing in harvesting, planting, and crop maintenance. Fully equipped with necessary tools. Bilingual (Hindi/Punjabi).
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="flex items-center text-sm bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                    <FaMapMarkerAlt className="text-amber-600 mr-2" size={12} />
                    <span className="text-gray-700">WB, India</span>
                  </div>
                  <a href="tel:+919876543211" className="flex items-center text-sm bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-amber-50">
                    <FaPhone className="text-amber-600 mr-2" size={12} />
                    <span className="text-gray-700">+91 98765 43211</span>
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:+919876543211" className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2.5 rounded-lg text-center font-medium transition-colors flex items-center justify-center gap-2">
                  <FaPhone size={14} />
                  Hire Now
                </a>
                <Link to="/gform" className="flex-1 border border-amber-600 text-amber-700 hover:bg-amber-50 py-2.5 rounded-lg text-center font-medium transition-colors flex items-center justify-center gap-2">
                  View Team
                  <FaArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CombinedAdBar;