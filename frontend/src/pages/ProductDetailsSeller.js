import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SummaryApi from '../common';
import { 
  FiDollarSign, 
  FiEdit, 
  FiTrash2, 
  FiChevronLeft, 
  FiPackage, 
  FiTag, 
  FiClock, 
  FiLayers, 
  FiUser, 
  FiPhone, 
  FiMapPin,
  FiEye,
  FiShoppingBag,
  FiInfo,
  FiGrid
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import displayINRCurrency from '../helpers/displayCurrency';

const ProductDetailsSeller = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios({
          url: `${SummaryApi.sellerGetProductById.url}/${id}`,
          method: SummaryApi.sellerGetProductById.method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
          },
          withCredentials: true
        });

        const productData = response.data.data || response.data;
        setProduct(productData);
        
        // Fetch related products if category exists
        if (productData?.category) {
          const relatedResponse = await axios({
            url: `${SummaryApi.sellerGetAllProducts.url}?category=${productData.category}&limit=4`,
            method: SummaryApi.sellerGetAllProducts.method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            },
            withCredentials: true
          });
          
          const relatedProductsData = relatedResponse.data.data || relatedResponse.data;
          setRelatedProducts(
            relatedProductsData
              .filter(p => p._id !== id)
              .slice(0, 4)
          );
        }
      } catch (error) {
        console.error('Fetch product error:', error);
        toast.error(error.response?.data?.message || 'Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleDeleteProduct = async () => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        setDeleting(true);
        const response = await axios({
          url: `${SummaryApi.sellerDeleteProduct.url}/${id}`,
          method: SummaryApi.sellerDeleteProduct.method,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
          },
          withCredentials: true
        });

        if (response.data.success) {
          toast.success(response.data.message);
          navigate('/seller/products');
        } else {
          throw new Error(response.data.message || 'Failed to delete product');
        }
      } catch (error) {
        console.error('Delete error:', error);
        toast.error(error.response?.data?.message || 'Failed to delete product');
      } finally {
        setDeleting(false);
      }
    }
  };

  const handleBuyNow = () => {
    navigate(`/checkoutseller/${id}`, )
  };

  const getImageSrc = (img) => {
    if (!img) return 'https://via.placeholder.com/500x500.png?text=No+Image';
    if (typeof img === 'string') return img;
    if (img?.imageBase64) return `data:image/jpeg;base64,${img.imageBase64}`;
    return 'https://via.placeholder.com/500x500.png?text=No+Image';
  };

  const renderProductImages = () => {
    if (!product) return [];
    
    const images = [];
    
    if (product?.imageBase64) {
      images.push({ src: `data:image/jpeg;base64,${product.imageBase64}`, alt: product.productName });
    } else if (product?.productImage?.length) {
      images.push(...product.productImage.map(img => ({ 
        src: getImageSrc(img), 
        alt: product.productName 
      })));
    } else if (product?.images?.length) {
      images.push(...product.images.map(img => ({ 
        src: getImageSrc(img), 
        alt: product.productName 
      })));
    } else {
      images.push({ 
        src: 'https://via.placeholder.com/500x500.png?text=No+Image', 
        alt: 'No image available' 
      });
    }

    return images;
  };

  if (loading) {
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
          onClick={() => navigate('/seller/products')}
          className="px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 flex items-center mx-auto transition-colors duration-200"
        >
          <FiChevronLeft className="mr-2" />
          Return to Product List
        </button>
      </div>
    );
  }

  const images = renderProductImages();
  const seller = {
    name: product.sellerName,
    phoneNumber: product.sellerPhoneNumber,
    address: product.sellerAddress
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Breadcrumb Navigation */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <button 
              onClick={() => navigate('/seller/dashboard')}
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
                onClick={() => navigate('/seller/products')}
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

      {/* Product Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {product.productName || 'Unnamed Product'}
          </h1>
          <div className="flex items-center mt-2 space-x-2">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Active
            </span>
            <span className="text-sm text-gray-500">
              Product ID: {id.substring(0, 8)}...
            </span>
          </div>
        </div>
        
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button
            onClick={handleBuyNow}
            className="px-5 py-3 rounded-lg text-white bg-green-600 hover:bg-green-700 flex items-center transition-colors duration-200"
          >
            <FiShoppingBag className="mr-2" />
            Buy Now
          </button>
          
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Image */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex justify-center items-center">
            {images[0]?.src ? (
              <img
                src={images[selectedImage]?.src || images[0]?.src}
                alt={images[selectedImage]?.alt || images[0]?.alt}
                className="w-full max-w-md h-auto object-contain rounded-lg shadow-sm"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x500.png?text=No+Image';
                }}
              />
            ) : (
              <div className="w-full h-64 flex flex-col items-center justify-center bg-gray-100 rounded-lg">
                <FiPackage className="text-gray-400 text-4xl mb-3" />
                <span className="text-gray-500">No product image</span>
              </div>
            )}
          </div>
          
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-20 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/500x500.png?text=No+Image';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
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

          {/* Tab Content */}
          {activeTab === 'details' && (
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
                  title="Pricing Information"
                  items={[
                    { label: 'Price', value: displayINRCurrency(product.price) },
                    { label: 'Created At', value: new Date(product.createdAt).toLocaleDateString() },
                    { label: 'Updated At', value: new Date(product.updatedAt).toLocaleDateString() }
                  ]}
                />
              </div>
            </div>
          )}

          {activeTab === 'seller' && (
            <DetailCard 
              icon={<FiUser className="text-purple-500" />}
              title="Seller Details"
              items={[
                { label: 'Seller Name', value: seller.name || 'Not available', icon: <FiUser className="text-gray-400 mr-2" /> },
                { label: 'Contact Number', value: seller.phoneNumber || 'Not available', icon: <FiPhone className="text-gray-400 mr-2" /> },
                { label: 'Address', value: seller.address || 'Not available', icon: <FiMapPin className="text-gray-400 mr-2" /> }
              ]}
              fullWidth
            />
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FiGrid className="mr-2" />
            Other Products in {product.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <div 
                key={relatedProduct._id} 
                className="bg-white rounded-lg shadow overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate(`/seller/product/${relatedProduct._id}`)}
              >
                <div className="relative h-48 overflow-hidden bg-gray-50">
                  <img
                    src={getImageSrc(relatedProduct)}
                    alt={relatedProduct.productName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200.png?text=No+Image';
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                    {relatedProduct.productName}
                  </h3>
                  <div className="flex items-center text-gray-700">
                    <FiDollarSign className="text-gray-500 mr-1" size={14} />
                    <span className="font-medium">
                      {displayINRCurrency(relatedProduct.price)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-10 pt-6 border-t">
        <button
          onClick={() => navigate('/seller/products')}
          className="px-6 py-3 rounded-lg text-white bg-gray-600 hover:bg-gray-700 flex items-center transition-colors duration-200 mb-4 md:mb-0"
        >
          <FiChevronLeft className="mr-2" />
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

// Reusable Detail Card Component
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

export default ProductDetailsSeller;