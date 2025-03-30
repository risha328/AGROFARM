import React from 'react';
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye, FaTimes, FaStar } from 'react-icons/fa';
import { MdCompareArrows } from 'react-icons/md';

const WishlistPage = () => {
  // Sample wishlist data - replace with actual data from your API/state
  const wishlistItems = [
    {
      id: 1,
      name: 'Organic Tomato Seeds Pack',
      price: '$12.99',
      originalPrice: '$15.99',
      image: 'https://via.placeholder.com/300',
      inStock: true,
      rating: 4.5,
      reviews: 24,
      addedDate: '3 days ago'
    },
    {
      id: 2,
      name: 'Premium Fertilizer 5kg',
      price: '$39.99',
      originalPrice: '$45.99',
      image: 'https://via.placeholder.com/300',
      inStock: false,
      rating: 4.2,
      reviews: 18,
      addedDate: '1 week ago'
    },
    {
      id: 3,
      name: 'Garden Tool Set (6-Piece)',
      price: '$49.99',
      image: 'https://via.placeholder.com/300',
      inStock: true,
      rating: 4.8,
      reviews: 36,
      addedDate: '2 weeks ago'
    },
    {
      id: 4,
      name: 'Automatic Watering System',
      price: '$89.99',
      originalPrice: '$99.99',
      image: 'https://via.placeholder.com/300',
      inStock: true,
      rating: 4.3,
      reviews: 15,
      addedDate: '1 day ago'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaHeart className="text-red-500" />
          My Wishlist
        </h1>
        <div className="text-sm text-gray-600">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <FaRegHeart className="mx-auto text-gray-400 text-5xl mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">Your Wishlist is Empty</h3>
          <p className="text-gray-500 mb-4">Save your favorite items here for later.</p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition-all">
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all">
              {/* Product Image */}
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-48 object-cover"
                />
                {!item.inStock && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Out of Stock
                  </div>
                )}
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md text-red-500 hover:bg-red-50 transition-all">
                  <FaTimes />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <FaStar className="fill-current" />
                    <span className="text-gray-600 text-sm">{item.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-green-600">{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">{item.originalPrice}</span>
                  )}
                </div>

                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <span>{item.reviews} reviews</span>
                  <span className="mx-2">•</span>
                  <span>{item.addedDate}</span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm transition-all ${
                      item.inStock 
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!item.inStock}
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-all">
                    <MdCompareArrows />
                    Compare
                  </button>
                </div>

                <div className="mt-3">
                  <button className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-gray-300 hover:border-green-400 rounded-lg text-sm transition-all">
                    <FaEye />
                    Quick View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recommendations Section */}
      {wishlistItems.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-all">
                <img 
                  src="https://via.placeholder.com/200" 
                  alt="Recommended product" 
                  className="w-full h-32 object-cover mb-3 rounded"
                />
                <h3 className="text-sm font-medium text-gray-800 mb-1">Related Product {item}</h3>
                <div className="text-green-600 font-bold text-sm">$29.99</div>
                <button className="w-full mt-2 text-xs bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded transition-all">
                  Add to Wishlist
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;