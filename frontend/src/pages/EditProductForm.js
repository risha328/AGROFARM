import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const EditProductForm = () => {
  const { productId } = useParams();  // Get the product ID from the URL
  const [product, setProduct] = useState({
    productName: '',
    description: '',
    price: '',
    address: '',
    category: '',
    imageBase64: '',
    sellerPhoneNumber: ''
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch the product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios({
          url: `${SummaryApi.sellerGetAllProducts.url}/${productId}`,
          method: 'GET',
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.data?.success) {
          setProduct(response.data.data); // Set product data to state
        } else {
          toast.error('Product not found!');
          navigate('/product-list');
        }
      } catch (error) {
        toast.error('Failed to load product data');
        navigate('/product-list');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios({
        url: `${SummaryApi.sellerUpdateProduct(productId).url}`,
        method: SummaryApi.sellerUpdateProduct(productId).method,
        data: product,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data?.success) {
        toast.success('Product updated successfully!');
        navigate('/product-list');
      } else {
        toast.error('Failed to update product');
      }
    } catch (error) {
      toast.error('An error occurred while updating the product');
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Product</h2>

          {/* Product Name */}
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              id="productName"
              value={product.productName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={product.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={product.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={product.address}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              value={product.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Seller Phone Number */}
          <div>
            <label htmlFor="sellerPhoneNumber" className="block text-sm font-medium text-gray-700">
              Seller Phone Number
            </label>
            <input
              type="tel"
              name="sellerPhoneNumber"
              id="sellerPhoneNumber"
              value={product.sellerPhoneNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md"
            >
              Update Product
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProductForm;
