// import React, { useEffect, useState } from 'react'
// import UploadProduct from '../../components/UploadProduct'
// import SummaryApi from '../../common'
// import AdminProductCard from '../../components/admin/layout/AdminProductCard'

// const AllProducts = () => {
//   const [openUploadProduct,setOpenUploadProduct] = useState(false)
//   const [allProduct,setAllProduct] = useState([])

//   const fetchAllProduct = async() =>{
//     const response = await fetch(SummaryApi.allProduct.url)
//     const dataResponse = await response.json()

//     console.log("product data",dataResponse)

//     setAllProduct(dataResponse?.data || [])
//   }

//   useEffect(()=>{
//     fetchAllProduct()
//   },[])
  
//   return (
//     <div>
//         <div className='bg-white py-2 px-4 flex justify-between items-center'>
//             <h2 className='font-bold text-lg'>All Product</h2>
//             <button  className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
//         </div>

//         {/**all product */}
//         <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
//           {
//             allProduct.map((product,index)=>{
//               return(
//                 <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
                
//               )
//             })
//           }
//         </div>





//         {/**upload prouct component */}
//         {
//           openUploadProduct && (
//             <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
//           )
//         }
      

//     </div>
//   )
// }

// export default AllProducts


import React, { useEffect, useState } from 'react';
import UploadProduct from '../../components/UploadProduct';
import SummaryApi from '../../common';
import { FiUpload, FiSearch, FiRefreshCw, FiEdit, FiTrash2, FiEye, FiSave, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    productName: '',
    price: 0,
    stock: 0,
    category: '',
    description: ''
  });

  const fetchAllProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.allProduct.url, {
        method: SummaryApi.allProduct.method || 'GET',
        credentials: 'include' // if your API requires authentication
      });
      
      const dataResponse = await response.json();
      
      if (dataResponse.success) {
        setAllProduct(dataResponse.data || []);
      } else {
        toast.error(dataResponse.message || "Failed to load products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const handleDeleteProduct = async (productId) => {
  if (window.confirm("Are you sure you want to delete this product?")) {
    try {
      // MANUAL DELETE (No API call)
      setAllProduct(prevProducts => 
        prevProducts.filter(product => product._id !== productId)
      );
      
      toast.success("Product deleted (frontend-only)"); // Notify user
      console.log("Manually deleted product ID:", productId); // For debugging
    } catch (error) {
      console.error("Manual delete error:", error);
      toast.error("Error in manual deletion");
    }
  }
};
  const handleEditClick = (product) => {
    setEditingId(product._id);
    setEditFormData({
      productName: product.productName,
      price: product.price,
      stock: product.stock,
      category: product.category,
      description: product.description
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    });
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleSaveClick = async (productId) => {
    // Basic validation
    if (!editFormData.productName.trim()) {
      toast.error("Product name is required");
      return;
    }
    if (editFormData.price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }
    if (editFormData.stock < 0) {
      toast.error("Stock cannot be negative");
      return;
    }

    try {
      const response = await fetch(SummaryApi.updateProduct.url, {
        method: SummaryApi.updateProduct.method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // if your API requires authentication
        body: JSON.stringify({
          productId,
          ...editFormData
        })
      });
      
      const dataResponse = await response.json();
      
      if (dataResponse.success) {
        toast.success("Product updated successfully");
        setEditingId(null);
        // Update state directly instead of refetching
        setAllProduct(prevProducts => 
          prevProducts.map(product => 
            product._id === productId 
              ? { ...product, ...editFormData } 
              : product
          )
        );
      } else {
        toast.error(dataResponse.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product");
    }
  };

  // Filter products
  const filteredProducts = allProduct.filter(product => {
    const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['all', ...new Set(allProduct.map(product => product.category))];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Product Inventory</h1>
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {allProduct.length} products
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
            <div className="relative flex-grow">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
          <button
            onClick={fetchAllProduct}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
            disabled={loading}
          >
            <FiRefreshCw className={`${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          
          <button
            onClick={() => setOpenUploadProduct(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiUpload />
            Add New Product
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-8 text-center">
              <h3 className="text-lg font-medium text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? 'Try a different search term' : 'No products available'}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img 
                              className="h-10 w-10 rounded-md object-cover" 
                              src={product.productImage?.[0] || '/default-product.png'} 
                              alt={product.productName} 
                              onError={(e) => {
                                e.target.src = '/default-product.png';
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            {editingId === product._id ? (
                              <input
                                type="text"
                                name="productName"
                                value={editFormData.productName}
                                onChange={handleEditFormChange}
                                className="border rounded px-2 py-1 w-full mb-2"
                              />
                            ) : (
                              <div className="text-sm font-medium text-gray-900">{product.productName}</div>
                            )}
                            {editingId === product._id ? (
                              <textarea
                                name="description"
                                value={editFormData.description}
                                onChange={handleEditFormChange}
                                className="border rounded px-2 py-1 w-full text-sm"
                                rows="2"
                              />
                            ) : (
                              <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === product._id ? (
                          <input
                            type="text"
                            name="category"
                            value={editFormData.category}
                            onChange={handleEditFormChange}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {product.category}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === product._id ? (
                          <input
                            type="number"
                            name="price"
                            value={editFormData.price}
                            onChange={handleEditFormChange}
                            className="border rounded px-2 py-1 w-full"
                            step="0.01"
                            min="0.01"
                          />
                        ) : (
                          <span className="text-sm text-gray-900">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === product._id ? (
                          <input
                            type="number"
                            name="stock"
                            value={editFormData.stock}
                            onChange={handleEditFormChange}
                            className="border rounded px-2 py-1 w-full"
                            min="0"
                          />
                        ) : (
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  product.stock > 10 ? 'bg-green-500' : 'bg-yellow-500'
                                }`} 
                                style={{ width: `${Math.min(100, (product.stock / 50) * 100)}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-700">{product.stock}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          {editingId === product._id ? (
                            <>
                              <button 
                                onClick={() => handleSaveClick(product._id)}
                                className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50"
                                title="Save"
                              >
                                <FiSave size={18} />
                              </button>
                              <button 
                                onClick={handleCancelClick}
                                className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-50"
                                title="Cancel"
                              >
                                <FiX size={18} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button 
                                className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                                title="View"
                              >
                                <FiEye size={18} />
                              </button>
                              <button 
                                onClick={() => handleEditClick(product)}
                                className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50"
                                title="Edit"
                              >
                                <FiEdit size={18} />
                              </button>
                              <button 
                                onClick={() => handleDeleteProduct(product._id)}
                                className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                                title="Delete"
                              >
                                <FiTrash2 size={18} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Upload Product Modal */}
        {openUploadProduct && (
          <UploadProduct 
            onClose={() => setOpenUploadProduct(false)} 
            fetchData={fetchAllProduct}
          />
        )}
      </div>
    </div>
  );
};

export default AllProducts;