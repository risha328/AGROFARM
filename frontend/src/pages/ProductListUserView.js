import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SummaryApi from '../common';
import { FiDollarSign, FiSearch, FiArrowRight } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import displayINRCurrency from '../helpers/displayCurrency';
import { toast } from 'react-toastify';

const ProductListUserView = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: SummaryApi.sellerGetAllProducts.url,
        method: SummaryApi.sellerGetAllProducts.method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        withCredentials: true
      });

      const productsData = response.data?.data || response.data || [];
      
      if (Array.isArray(productsData)) {
        setProducts(productsData);
        const uniqueCategories = [...new Set(productsData.map(p => p.category))];
        setCategories(uniqueCategories);
      } else {
        throw new Error('Invalid products data format');
      }
    } catch (error) {
      console.error('Fetch products error:', error);
      toast.error(error.response?.data?.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleBuyNow = (productId, e) => {
    e.stopPropagation();
    navigate(`/checkoutseller/${productId}`);
  };

  const handleCardClick = (productId) => {
    navigate(`/sellerproduct/${productId}`);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const getImageSrc = (product) => {
    if (product.imageBase64) return `data:image/jpeg;base64,${product.imageBase64}`;
    if (product.productImage?.[0]) return product.productImage[0];
    if (product.images?.[0]) return product.images[0];
    return 'https://via.placeholder.com/300x200.png?text=No+Image';
  };

  const calculateAveragePrice = () => {
    const activeProducts = products.filter(p => p.status === 'active');
    if (activeProducts.length === 0) return 0;
    return activeProducts.reduce((sum, p) => sum + (p.sellingPrice || p.price || 0), 0) / activeProducts.length;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Our Products</h1>
          <p className="text-gray-600 mt-1">Find what you're looking for</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Available Products</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {products.filter(p => p.status === 'active').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Categories</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{categories.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Avg. Price</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {displayINRCurrency(calculateAveragePrice())}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
              <Skeleton height={180} />
              <div className="p-4">
                <Skeleton count={3} />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow border border-gray-200 p-8 text-center">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-2 text-gray-500">
            {searchTerm || selectedCategory !== 'all' ? 
              'No products match your search criteria' : 
              'No products available at this time'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProducts.map(product => (
              <div 
                key={product._id} 
                className="bg-white rounded-lg shadow overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col cursor-pointer"
                onClick={() => handleCardClick(product._id)}
              >
                <div 
                  className="relative h-48 overflow-hidden bg-gray-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(product._id);
                  }}
                >
                  <img
                    src={getImageSrc(product)}
                    alt={product.productName}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200.png?text=No+Image';
                    }}
                  />
                  {product.category && (
                    <span className="absolute top-2 right-2 bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                      {product.category}
                    </span>
                  )}
                </div>
                
                <div className="p-4 flex flex-col flex-grow">
                  <h3 
                    className="text-lg font-semibold text-gray-900 mb-1 hover:text-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(product._id);
                    }}
                  >
                    {product.productName}
                  </h3>
                  
                  <div className="flex items-center text-gray-700 mb-2">
                    <FiDollarSign className="text-gray-500 mr-1" size={14} />
                    <span className="font-medium">
                      {displayINRCurrency(product.sellingPrice || product.price)}
                    </span>
                  </div>
                  
                  {product.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  
                  <div className="mt-auto">
                    <button
                      onClick={(e) => handleBuyNow(product._id, e)}
                      className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
                    >
                      Buy Now <FiArrowRight className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="inline-flex rounded-md shadow -space-x-px">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 border-t border-b border-gray-300 text-sm font-medium ${
                      currentPage === page ? 
                        'bg-blue-50 border-blue-500 text-blue-600' : 
                        'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductListUserView;