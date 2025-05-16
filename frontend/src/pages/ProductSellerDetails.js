import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import SummaryApi from '../common';
import { FiArrowLeft, FiEdit, FiTrash2, FiInfo, FiDollarSign, FiPackage, FiUser, FiPhone, FiMapPin } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductSellerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        if (!SummaryApi?.sellerGetProductById?.url) {
          throw new Error('API endpoint is not defined in SummaryApi');
        }

        const response = await axios.get(`${SummaryApi.sellerGetProductById.url}/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response?.data?.success && response?.data?.data) {
          setProduct(response.data.data);
        } else {
          toast.error('Product not found');
          navigate('/list-product');
        }

      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch product details');
        console.error('Fetch Product Error:', error);
        navigate('/list-product');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleDeleteProduct = async () => {
    if (window.confirm('Are you sure you want to permanently delete this product?')) {
      try {
        setIsDeleting(true);
        const response = await axios.delete(`${SummaryApi.sellerDeleteProduct.url}/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data.success) {
          toast.success('Product deleted successfully');
          navigate('/list-product');
        } else {
          throw new Error(response.data.message || 'Failed to delete product');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete product');
        console.error('Delete Product Error:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <Skeleton width={180} height={32} />
          <div className="flex space-x-3">
            <Skeleton width={90} height={40} />
            <Skeleton width={90} height={40} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex justify-center">
            <Skeleton width={320} height={320} />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <div className="flex space-x-4 border-b">
              <Skeleton width={100} height={40} />
              <Skeleton width={100} height={40} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i}>
                  <Skeleton width={120} height={24} />
                  <Skeleton width={180} height={20} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="bg-gray-100 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <FiInfo className="text-gray-400 text-3xl" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          The product you're looking for doesn't exist or may have been removed.
        </p>
        <button
          onClick={() => navigate('/list-product')}
          className="px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 flex items-center mx-auto transition-colors duration-200"
        >
          <FiArrowLeft className="mr-2" />
          Return to Product List
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header with breadcrumbs */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <button 
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </button>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
              <button 
                onClick={() => navigate('/list-product')}
                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
              >
                Products
              </button>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                {product.productName.substring(0, 20)}{product.productName.length > 20 ? '...' : ''}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Product header with actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {product.productName || 'Unnamed Product'}
          </h1>
          <div className="flex items-center mt-2 space-x-2">
            <span className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <span className="text-sm text-gray-500">
              Product ID: {id}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-3 mt-4 md:mt-0">
          {/* <button
            onClick={() => navigate(`/edit-product/${id}`)}
            className="px-5 py-2.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 flex items-center transition-colors duration-200"
          >
            <FiEdit className="mr-2" />
            Edit Product
          </button>
          <button
            onClick={handleDeleteProduct}
            disabled={isDeleting}
            className="px-5 py-2.5 rounded-lg text-white bg-red-600 hover:bg-red-700 flex items-center transition-colors duration-200 disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            <FiTrash2 className="mr-2" />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button> */}
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product image */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex justify-center items-center">
            {product.imageBase64 ? (
              <img
                src={`data:image/jpeg;base64,${product.imageBase64}`}
                alt={product.productName}
                className="w-full max-w-md h-auto object-contain rounded-lg shadow-sm"
              />
            ) : (
              <div className="w-full h-64 flex flex-col items-center justify-center bg-gray-100 rounded-lg">
                <FiPackage className="text-gray-400 text-4xl mb-3" />
                <span className="text-gray-500">No product image</span>
              </div>
            )}
          </div>
        </div>

        {/* Product details */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'details' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab('seller')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'seller' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Seller Information
              </button>
            </nav>
          </div>

          {/* Tab content */}
          {activeTab === 'details' ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailCard 
                  icon={<FiInfo className="text-blue-500" />}
                  title="Basic Information"
                  items={[
                    { label: 'Product Name', value: product.productName },
                    { label: 'Category', value: product.category },
                    { label: 'Description', value: product.productDescription || 'Not provided' }
                  ]}
                />
                <DetailCard 
                  icon={<FiDollarSign className="text-green-500" />}
                  title="Pricing & Inventory"
                  items={[
                    { label: 'Price', value: `₹${product.price?.toLocaleString() || '0'}` },
                    { label: 'Stock Quantity', value: product.stockQuantity || 'N/A' },
                    { label: 'Status', value: product.status || 'Active' }
                  ]}
                />
              </div>
            </div>
          ) : (
            <DetailCard 
              icon={<FiUser className="text-purple-500" />}
              title="Seller Details"
              items={[
                { label: 'Seller Name', value: product.sellerName, icon: <FiUser className="text-gray-400 mr-2" /> },
                { label: 'Contact Number', value: product.sellerPhoneNumber, icon: <FiPhone className="text-gray-400 mr-2" /> },
                { label: 'Address', value: product.sellerAddress, icon: <FiMapPin className="text-gray-400 mr-2" /> }
              ]}
              fullWidth
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-10 pt-6 border-t">
        <button
          onClick={() => navigate('/list-product')}
          className="px-6 py-3 rounded-lg text-white bg-gray-600 hover:bg-gray-700 flex items-center transition-colors duration-200 mb-4 md:mb-0"
        >
          <FiArrowLeft className="mr-2" />
          Back to All Products
        </button>
        
        <div className="text-sm text-gray-500 flex items-center">
          <span className="hidden sm:inline">Last updated:</span>
          <span className="ml-1 font-medium">
            {new Date(product.updatedAt).toLocaleString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

const DetailCard = ({ icon, title, items, fullWidth = false }) => (
  <div className={`bg-gray-50 rounded-xl border border-gray-200 p-6 ${fullWidth ? 'w-full' : ''}`}>
    <div className="flex items-center mb-4">
      <div className="bg-white p-2 rounded-lg shadow-xs mr-3">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex">
          <div className="w-1/3 flex items-center font-medium text-gray-600">
            {item.icon || null}
            {item.label}:
          </div>
          <div className="w-2/3 text-gray-800">
            {item.value || 'N/A'}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ProductSellerDetails;