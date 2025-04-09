

// Import local images
/*import tractorImg from '../assest/images/tractor1.jpg';
import harvesterImg from '../assest/images/harvestor1.jpg';
import plowImg from '../assest/images/plow1.jpg';
import cultivatorImg from '../assest/images/cultivator1.jpg';
import irrigationImg from '../assest/images/irrigation1.jpg';*/

import React, { useState } from 'react';
import { FaPhone, FaMapMarkerAlt, FaCheck, FaArrowRight, FaStar, FaRegStar, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import PropTypes from 'prop-types';

// Import local images
import tractorImg from '../assest/images/tractor1.jpg';
import harvesterImg from '../assest/images/harvestor1.jpg';
import plowImg from '../assest/images/plow1.jpg';
import cultivatorImg from '../assest/images/cultivator1.jpg';
import irrigationImg from '../assest/images/irrigation1.jpg';

const MachineAdBanner = ({
  title = "Premium Agricultural Equipment",
  price = 0,
  location = "Available Nationwide",
  contact = "Call for Availability",
  features = [],
  imageUrl = tractorImg, // Default to local tractor image
  rating = 4.8,
  reviews = 24,
  adType = "premium", // 'standard', 'featured', 'premium'
  verified = true,
  lastUpdated = "Updated Today",
  onContact = () => console.log("Contact clicked"),
  onDetails = () => console.log("Details clicked"),
  onFavorite = () => console.log("Favorite clicked")
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const getMachineImage = () => {
    const equipmentImages = [
      tractorImg,
      harvesterImg,
      plowImg,
      cultivatorImg,
      irrigationImg
    ];
    return equipmentImages[Math.floor(Math.random() * equipmentImages.length)];
  };

  return (
    <div className={`w-full bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${
      adType === 'featured' ? 'border-emerald-500' : 
      adType === 'premium' ? 'border-teal-600' : 'border-gray-300'
    } transition-all duration-300 hover:shadow-xl`}>
      
      {/* Premium Ribbon */}
      {adType === 'premium' && (
        <div className="absolute top-0 right-0 bg-teal-700 text-white px-4 py-1 text-xs font-bold uppercase tracking-wide transform translate-x-2 -translate-y-2 rotate-3 shadow-md z-10">
          Premium Listing
        </div>
      )}

      <div className="flex flex-col lg:flex-row">
        {/* Image Section - Full width on mobile, 40% on desktop */}
        <div className="w-full lg:w-2/5 relative group h-64 lg:h-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent z-0"></div>
          <img 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={imageUrl || getMachineImage()} 
            alt={title}
            loading="lazy"
            onError={(e) => {
              console.error("Failed to load image:", e.target.src);
              e.target.src = getMachineImage();
            }}
          />
          
          {/* Favorite Button */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
              onFavorite();
            }}
            className={`absolute top-4 left-4 p-2 rounded-full ${isFavorite ? 'bg-white text-teal-600' : 'bg-white/90 text-gray-600'} shadow-md transition-all duration-200 z-10`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? <FaBookmark size={16} /> : <FaRegBookmark size={16} />}
          </button>
          
          {/* Price Badge */}
          <div className="absolute bottom-4 left-4 bg-white/95 px-4 py-2 rounded-lg shadow-md">
            <div className="text-teal-800 font-bold text-xl">₹{price.toLocaleString('en-IN')}</div>
            <div className="text-xs text-gray-600 font-medium">per day</div>
          </div>
        </div>

        {/* Content Section - Full width on mobile, 60% on desktop */}
        <div className="w-full lg:w-3/5 p-6 flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
            <div className="flex-1">
              <div className="flex items-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h2>
                {verified && (
                  <span className="ml-2 bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                    <FaCheck className="mr-1" size={10} />
                    Verified
                  </span>
                )}
              </div>
              <div className="flex items-center mt-2">
                <div className="flex text-amber-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    i < Math.floor(rating) ? 
                    <FaStar key={i} size={14} /> : 
                    i < rating ? <FaStar key={i} size={14} className="text-amber-400 opacity-70" /> : 
                    <FaRegStar key={i} size={14} className="text-gray-300" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{rating.toFixed(1)} ({reviews} reviews)</span>
              </div>
            </div>
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
              Available Now
            </span>
          </div>

          {/* Location & Contact */}
          <div className="flex flex-wrap gap-3 my-3">
            <div className="flex items-center text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full">
              <FaMapMarkerAlt className="text-emerald-600 mr-2" size={14} />
              <span className="text-sm">{location}</span>
            </div>
            <a 
              href={`tel:${contact}`}
              className="flex items-center text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FaPhone className="text-emerald-600 mr-2" size={14} />
              <span className="text-sm">{contact}</span>
            </a>
          </div>

          {/* Features */}
          <div className="mb-5 flex-grow">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Equipment Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(showAllFeatures ? features : features.slice(0, 4)).map((feature, i) => (
                <li key={i} className="flex items-center">
                  <FaCheck className="text-emerald-500 mr-2 text-xs" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            {features.length > 4 && (
              <button 
                onClick={() => setShowAllFeatures(!showAllFeatures)}
                className="mt-2 text-emerald-600 hover:text-emerald-800 text-sm font-medium flex items-center"
              >
                {showAllFeatures ? 'Show less features' : `Show all ${features.length} features`}
                <FaArrowRight className={`ml-1 text-xs transition-transform ${showAllFeatures ? 'transform rotate-90' : ''}`} />
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
            <a
              href={`tel:${contact}`}
              className="flex-1 flex items-center justify-center px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              <FaPhone className="mr-2" />
              Call Now
            </a>
            <button
              onClick={onDetails}
              className="flex-1 flex items-center justify-center px-5 py-3 border border-emerald-600 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors duration-200 font-medium"
            >
              View Full Details
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

MachineAdBanner.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  location: PropTypes.string,
  contact: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.string),
  imageUrl: PropTypes.string,
  rating: PropTypes.number,
  reviews: PropTypes.number,
  adType: PropTypes.oneOf(['standard', 'featured', 'premium']),
  verified: PropTypes.bool,
  lastUpdated: PropTypes.string,
  onContact: PropTypes.func,
  onDetails: PropTypes.func,
  onFavorite: PropTypes.func
};

MachineAdBanner.defaultProps = {
  adType: 'standard',
  verified: false,
  lastUpdated: "Recently updated"
};

export default MachineAdBanner;