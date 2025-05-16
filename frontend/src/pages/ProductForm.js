// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import SummaryApi from '../common';

// const ProductForm = ({ productId, onSuccess }) => {
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({
//     productName: '',
//     productDescription: '',
//     sellerPhoneNumber: '',
//     category: 'Seeds',
//     imageBase64: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null);

//   const categories = ["Seeds", "Fertilizers", "Machinery", "Tools", "Pesticides", "Others"];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file size (max 2MB)
//       if (file.size > 2 * 1024 * 1024) {
//         toast.error('Image size should be less than 2MB');
//         return;
//       }
      
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result.split(',')[1];
//         setProduct(prev => ({
//           ...prev,
//           imageBase64: base64String
//         }));
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     try {
//       const formData = new FormData();
//       Object.keys(product).forEach(key => {
//         formData.append(key, product[key]);
//       });

//       const config = {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       };

//       const response = productId 
//         ? await axios.post(`${SummaryApi.updateProductUser.url}?id=${productId}`, formData, config)
//         : await axios.post(SummaryApi.uploadProductUser.url, formData, config);

//       toast.success(response.data.message || 'Product operation successful!');
//       if (onSuccess) onSuccess();
//       navigate('/seller/products');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Operation failed');
//       console.error('Error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">
//         {productId ? 'Edit Product' : 'Add New Product'}
//       </h2>
      
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Product Name */}
//           <div>
//             <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
//               Product Name *
//             </label>
//             <input
//               type="text"
//               id="productName"
//               name="productName"
//               value={product.productName}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               placeholder="Enter product name"
//             />
//           </div>

//           {/* Category */}
//           <div>
//             <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
//               Category *
//             </label>
//             <select
//               id="category"
//               name="category"
//               value={product.category}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//             >
//               {categories.map(cat => (
//                 <option key={cat} value={cat}>{cat}</option>
//               ))}
//             </select>
//           </div>

//           {/* Phone Number */}
//           <div>
//             <label htmlFor="sellerPhoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
//               Your Phone Number *
//             </label>
//             <input
//               type="tel"
//               id="sellerPhoneNumber"
//               name="sellerPhoneNumber"
//               value={product.sellerPhoneNumber}
//               onChange={handleChange}
//               required
//               pattern="[0-9]{10,15}"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               placeholder="e.g., 1234567890"
//             />
//           </div>

//           {/* Image Upload */}
//           <div className="md:col-span-2">
//             <label htmlFor="imageBase64" className="block text-sm font-medium text-gray-700 mb-1">
//               Product Image *
//             </label>
//             <div className="flex items-center space-x-4">
//               <div className="flex-1">
//                 <input
//                   type="file"
//                   id="imageBase64"
//                   name="imageBase64"
//                   onChange={handleImageUpload}
//                   accept="image/*"
//                   required={!productId}
//                   className="block w-full text-sm text-gray-500
//                     file:mr-4 file:py-2 file:px-4
//                     file:rounded-md file:border-0
//                     file:text-sm file:font-semibold
//                     file:bg-green-50 file:text-green-700
//                     hover:file:bg-green-100"
//                 />
//                 <p className="mt-1 text-xs text-gray-500">
//                   Upload a clear image of your product (JPEG, PNG, max 2MB)
//                 </p>
//               </div>
//               {imagePreview && (
//                 <div className="w-20 h-20 border rounded-md overflow-hidden">
//                   <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Description */}
//           <div className="md:col-span-2">
//             <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-1">
//               Product Description *
//             </label>
//             <textarea
//               id="productDescription"
//               name="productDescription"
//               value={product.productDescription}
//               onChange={handleChange}
//               required
//               rows={4}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               placeholder="Describe your product in detail..."
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-end space-x-4">
//           <button
//             type="button"
//             onClick={() => navigate('/list-product')}
//             className="px-6 py-2 rounded-md text-gray-700 font-medium bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`px-6 py-2 rounded-md text-white font-medium ${isLoading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
//           >
//             {isLoading ? 'Processing...' : (productId ? 'Update Product' : 'Add Product')}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProductForm;




import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import SummaryApi from '../common'; // base URLs

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: '',
    productDescription: '',
    sellerName: '',
    sellerAddress: '',
    sellerPhoneNumber: '',
    price: '',
    category: 'Seeds',
    imageBase64: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const categories = ["Seeds", "Fertilizers", "Machinery", "Tools", "Pesticides", "Others"];

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(SummaryApi.sellerGetAllProducts.url);
          if (response.data.success) {
            const foundProduct = response.data.data.find(item => item._id === id);
            if (foundProduct) {
              setProduct(foundProduct);
              if (foundProduct.imageBase64) {
                setImagePreview(`data:image/jpeg;base64,${foundProduct.imageBase64}`);
              }
            } else {
              toast.error('Product not found');
              navigate('/list-product');
            }
          }
        } catch (error) {
          toast.error('Failed to fetch product details');
          console.error('Error:', error);
        }
      };
      fetchProduct();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        setProduct(prev => ({
          ...prev,
          imageBase64: base64String
        }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' }
      };
      let response;
      if (id) {
        response = await axios.put(`${SummaryApi.sellerUpdateProduct(id).url}`, product, config);
      } else {
        response = await axios.post(SummaryApi.sellerAddProduct.url, product, config);
      }
      toast.success(response.data.message || 'Product operation successful!');
      navigate('/list-product');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {id ? 'Edit Product' : 'Add New Product'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Product Name */}
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              placeholder="Enter product name"
            />
          </div>

          {/* Seller Name */}
          <div>
            <label htmlFor="sellerName" className="block text-sm font-medium text-gray-700 mb-1">
              Seller Name *
            </label>
            <input
              type="text"
              id="sellerName"
              name="sellerName"
              value={product.sellerName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Seller Address */}
          <div>
            <label htmlFor="sellerAddress" className="block text-sm font-medium text-gray-700 mb-1">
              Seller Address *
            </label>
            <input
              type="text"
              id="sellerAddress"
              name="sellerAddress"
              value={product.sellerAddress}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              placeholder="Enter your address"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="sellerPhoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Your Phone Number *
            </label>
            <input
              type="tel"
              id="sellerPhoneNumber"
              name="sellerPhoneNumber"
              value={product.sellerPhoneNumber}
              onChange={handleChange}
              required
              pattern="[0-9]{10,15}"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 1234567890"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price (₹) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              placeholder="Enter price"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label htmlFor="imageBase64" className="block text-sm font-medium text-gray-700 mb-1">
              Product Image *
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="file"
                  id="imageBase64"
                  name="imageBase64"
                  onChange={handleImageUpload}
                  accept="image/*"
                  required={!id}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-green-50 file:text-green-700
                    hover:file:bg-green-100"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Upload a clear image of your product (JPEG, PNG, max 2MB)
                </p>
              </div>
              {imagePreview && (
                <div className="w-20 h-20 border rounded-md overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Product Description *
            </label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={product.productDescription}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              placeholder="Describe your product in detail..."
            />
          </div>

        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/list-product')}
            className="px-6 py-2 rounded-md text-gray-700 font-medium bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 rounded-md text-white font-medium ${isLoading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
            {isLoading ? 'Processing...' : (id ? 'Update Product' : 'Add Product')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

