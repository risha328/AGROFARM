// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import SummaryApi from '../common';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await axios({
//         url: SummaryApi.sellerGetAllProducts.url,
//         method: SummaryApi.sellerGetAllProducts.method,
//         withCredentials: true,
//         headers: { 'Content-Type': 'application/json' }
//       });

//       const productsData = Array.isArray(response.data) ? response.data : 
//                            (response.data?.success ? response.data.data : []);

//       setProducts(productsData);
//     } catch (error) {
//       console.error('Fetch products error:', error);
//       toast.error('Failed to load products. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleDelete = async (productId) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         const response = await axios({
//           url: `${SummaryApi.deleteProduct.url}/${productId}`,
//           method: SummaryApi.deleteProduct.method,
//           withCredentials: true
//         });

//         if (response.data?.success) {
//           toast.success(response.data.message);
//           setProducts(prev => prev.filter(product => product._id !== productId));
//         } else {
//           throw new Error(response.data?.message || 'Failed to delete product');
//         }
//       } catch (error) {
//         console.error('Delete error:', error);
//         toast.error(error.response?.data?.message || 'Failed to delete product');
//       }
//     }
//   };

//   const getImageSrc = (product) => {
//     if (product.imageBase64) {
//       return `data:image/jpeg;base64,${product.imageBase64}`;
//     }
//     return 'https://via.placeholder.com/100'; // Fallback image
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Your Products</h2>
//         <button
//           onClick={() => navigate('/add-product')}
//           className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
//         >
//           Add New Product
//         </button>
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading products...</p>
//       ) : products.length === 0 ? (
//         <p className="text-center text-gray-500">No products found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-green-50">
//               <tr>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Image</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Category</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Phone</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {products.map(product => (
//                 <tr key={product._id}>
//                   <td className="px-4 py-2">
//                     <img
//                       src={getImageSrc(product)}
//                       alt={product.productName}
//                       className="w-16 h-16 object-cover rounded-md border"
//                     />
//                   </td>
//                   <td className="px-4 py-2 text-sm font-medium text-gray-900">{product.productName}</td>
//                   <td className="px-4 py-2 text-sm text-gray-700">{product.category}</td>
//                   <td className="px-4 py-2 text-sm text-gray-700">{product.sellerPhoneNumber}</td>
//                   <td className="px-4 py-2 flex space-x-2">
//                     <button
//                       onClick={() => navigate(`/edit-product/${product._id}`)}
//                       className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(product._id)}
//                       className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import SummaryApi from '../common';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiDollarSign, FiPhone, FiTag } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: SummaryApi.sellerGetAllProducts.url,
        method: SummaryApi.sellerGetAllProducts.method,
        withCredentials: true,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const productsData = Array.isArray(response.data) ? response.data : 
                         (response.data?.success ? response.data.data : []);

      setProducts(productsData);
    } catch (error) {
      console.error('Fetch products error:', error);
      toast.error(error.response?.data?.message || 'Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to permanently delete this product?')) {
      try {
        const response = await axios({
          url: `${SummaryApi.deleteProduct.url}/${productId}`,
          method: SummaryApi.deleteProduct.method,
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data?.success) {
          toast.success(response.data.message);
          setProducts(prev => prev.filter(product => product._id !== productId));
        } else {
          throw new Error(response.data?.message || 'Failed to delete product');
        }
      } catch (error) {
        console.error('Delete error:', error);
        toast.error(error.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const getImageSrc = (product) => {
    if (product.imageBase64) {
      return `data:image/jpeg;base64,${product.imageBase64}`;
    }
    return 'https://via.placeholder.com/300x200.png?text=No+Image';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Sell Your Products</h1>
          <p className="text-gray-600 mt-1">Manage your product listings</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/add-product')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm flex items-center justify-center transition-colors duration-200"
          >
            <FiPlus className="mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{products.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Active Listings</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {products.filter(p => p.status === 'active').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Categories</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {[...new Set(products.map(p => p.category))].length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Avg. Price</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {products.length > 0 ? 
              formatPrice(products.reduce((sum, p) => sum + p.price, 0) / products.length) : 
              '₹0'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Skeleton height={180} />
              <div className="p-4">
                <Skeleton count={3} />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-2 text-gray-500">
            {searchTerm ? 
              'No products match your search criteria.' : 
              'You currently have no products listed.'}
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/add-product')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm text-sm font-medium inline-flex items-center"
            >
              <FiPlus className="mr-2" />
              Add Your First Product
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProducts.map(product => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden bg-gray-50">
                  <img
                    src={getImageSrc(product)}
                    alt={product.productName}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200.png?text=No+Image';
                    }}
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'active' ? 
                        'bg-green-100 text-green-800' : 
                        'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.status || 'inactive'}
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{product.productName}</h3>
                  
                  <div className="flex items-center text-gray-700 mb-2">
                    <FiDollarSign className="text-gray-500 mr-1" size={14} />
                    <span>{formatPrice(product.price)}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700 mb-3">
                    <FiTag className="text-gray-500 mr-1" size={14} />
                    <span className="truncate">ID: {product._id.substring(0, 8)}...</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/product-details/${product._id}`)}
                      className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-sm font-medium flex items-center justify-center transition-colors duration-200"
                      title="View details"
                    >
                      <FiEye className="mr-1" size={14} />
                    </button>
                    {/* <button
                      onClick={() => navigate(`/edit-product/${product._id}`)}
                      className="flex-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md text-sm font-medium flex items-center justify-center transition-colors duration-200"
                      title="Edit"
                    >
                      <FiEdit2 className="mr-1" size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-md text-sm font-medium flex items-center justify-center transition-colors duration-200"
                      title="Delete"
                    >
                      <FiTrash2 className="mr-1" size={14} />
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 border-t border-b border-gray-300 text-sm font-medium ${
                      currentPage === page ? 
                        'bg-blue-50 border-blue-500 text-blue-600 z-10' : 
                        'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default ProductList;
