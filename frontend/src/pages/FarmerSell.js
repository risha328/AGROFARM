import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { 
  Camera, 
  Leaf, 
  RefreshCw, 
  CreditCard, 
  Calendar, 
  Tag, 
  Truck, 
  Shield, 
  IndianRupee,
  Info,
  CheckCircle2,
  XCircle
} from "lucide-react";
import axios from 'axios';

// API configuration
const API_BASE_URL = 'https://your-api-endpoint.com/api';

export default function SellProductForm() {
  const [product, setProduct] = useState({
    title: "",
    //category: "",
    description: "",
    price: "",
    quantity: "1",
    unit: "kg",
    harvestDate: "",
    expiryDate: "",
    images: [],
    paymentMode: "UPI",
    organic: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error'
  const [productsList, setProductsList] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoadingProducts(true);
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProductsList(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle error (show toast notification, etc.)
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      // Create FormData to handle file uploads
      const formData = new FormData();
      formData.append('title', product.title);
      //formData.append('category', product.category);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('quantity', product.quantity);
      formData.append('unit', product.unit);
      formData.append('harvestDate', product.harvestDate);
      formData.append('expiryDate', product.expiryDate);
      formData.append('paymentMode', product.paymentMode);
      formData.append('organic', product.organic);
      
      // Append each image file
      if (product.images && product.images.length > 0) {
        Array.from(product.images).forEach((file) => {
          formData.append('images', file);
        });
      }

      const response = await axios.post(`${API_BASE_URL}/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setSubmissionStatus('success');
      // Reset form after successful submission
      setProduct({
        title: "",
        category: "",
        description: "",
        price: "",
        quantity: "1",
        unit: "kg",
        harvestDate: "",
        expiryDate: "",
        images: [],
        paymentMode: "UPI",
        organic: false,
      });
      
      // Refresh products list
      fetchProducts();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 5) {
      alert('You can upload a maximum of 5 images');
      return;
    }
    setProduct({ ...product, images: e.target.files });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Listing Section */}
        <div className="lg:col-span-1">
          <Card className="border shadow-sm">
            <div className="border-b p-6 bg-green-200">
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Listed Products</h2>
                <p className="text-gray-600 text-sm">
                  {productsList.length} products listed
                </p>
              </div>
            </div>
            <CardContent className="p-6">
              {isLoadingProducts ? (
                <div className="flex justify-center py-8">
                  <RefreshCw className="h-6 w-6 animate-spin text-green-600" />
                </div>
              ) : productsList.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No products listed yet
                </div>
              ) : (
                <div className="space-y-4">
                  {productsList.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-medium text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.category} • {item.quantity} {item.unit}
                      </p>
                      <p className="text-green-600 font-medium mt-2">
                        ₹{item.price}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Form Section */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border shadow-sm overflow-hidden from-green-100 via-green-400 to-green-800">
              <div className="border-b p-6 bg-green-200">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 p-3 rounded-full mb-4">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <h1 className="text-2xl font-semibold text-gray-800 mb-2">List Your Agricultural Product</h1>
                  <p className="text-gray-600 max-w-md text-sm">
                    Complete this form to create a professional listing for your farm products.
                  </p>
                </div>
              </div>
              
              <CardContent className="p-6 md:p-8">
                {/* Submission Status Feedback */}
                {submissionStatus === 'success' && (
                  <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-green-800">Product listed successfully!</h3>
                      <p className="text-sm text-green-700 mt-1">
                        Your product is now visible to buyers. You can view it in your listings.
                      </p>
                    </div>
                  </div>
                )}
                
                {submissionStatus === 'error' && (
                  <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-red-800">Error submitting product</h3>
                      <p className="text-sm text-red-700 mt-1">
                        There was an issue submitting your product. Please try again.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Section 1: Product Information */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                      <Tag className="h-5 w-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-800">Product Details</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Product Name */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                            Product Name
                          </Label>
                          <span className="text-xs text-red-500">Required</span>
                        </div>
                        <Input
                          id="title"
                          placeholder="e.g., Organic Alphonso Mangoes"
                          value={product.title}
                          onChange={(e) => setProduct({ ...product, title: e.target.value })}
                          className="w-full focus:ring-green-500 focus:border-green-500"
                          required
                        />
                      </div>

                      {/* Category 
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                            Product Category
                          </Label>
                          <span className="text-xs text-red-500">Required</span>
                        </div>
                        <Select
                          id="category"
                          value={product.category}
                          onValueChange={(value) => setProduct({ ...product, category: value })}
                          className="w-full focus:ring-green-500 focus:border-green-500"
                          required
                        >
                          <SelectItem value="">Select a category</SelectItem>
                          <SelectItem value="fruits">Fruits</SelectItem>
                          <SelectItem value="vegetables">Vegetables</SelectItem>
                          <SelectItem value="grains">Grains & Cereals</SelectItem>
                          <SelectItem value="dairy">Dairy Products</SelectItem>
                          <SelectItem value="spices">Spices & Herbs</SelectItem>
                          <SelectItem value="nuts">Nuts & Seeds</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </Select>
                      </div>*/}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                          Product Description
                        </Label>
                        <span className="text-xs text-red-500">Required</span>
                      </div>
                      <Textarea
                        id="description"
                        placeholder="Describe your product including quality, cultivation method, special features, etc."
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        className="w-full min-h-32 focus:ring-green-500 focus:border-green-500"
                        required
                        minLength={50}
                      />
                      <p className="text-xs text-gray-500">Minimum 50 characters required</p>
                    </div>
                    
                    {/* Organic Certification */}
                    <div className="flex items-center space-x-3 pt-2">
                      <input
                        type="checkbox"
                        id="organic"
                        checked={product.organic}
                        onChange={(e) => setProduct({ ...product, organic: e.target.checked })}
                        className="h-4 w-4 rounded text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <Label htmlFor="organic" className="text-sm font-medium text-gray-700">
                        Certified Organic Product
                      </Label>
                      <div className="text-gray-400 hover:text-gray-500 cursor-pointer" title="Check if your product has organic certification">
                        <Info className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Pricing & Quantity */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                      <IndianRupee className="h-5 w-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-800">Pricing & Inventory</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Price */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                            Price Per Unit
                          </Label>
                          <span className="text-xs text-red-500">Required</span>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">₹</span>
                          </div>
                          <Input
                            id="price"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            value={product.price}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                            className="w-full pl-8 focus:ring-green-500 focus:border-green-500"
                            required
                          />
                        </div>
                      </div>
                      
                      {/* Quantity */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                            Available Quantity
                          </Label>
                          <span className="text-xs text-red-500">Required</span>
                        </div>
                        <div className="flex gap-2">
                          <Input
                            id="quantity"
                            type="number"
                            min="1"
                            placeholder="1"
                            value={product.quantity}
                            onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                            className="flex-1 focus:ring-green-500 focus:border-green-500"
                            required
                          />
                          <Select 
                            value={product.unit}
                            onValueChange={(value) => setProduct({ ...product, unit: value })}
                            className="w-24 focus:ring-green-500 focus:border-green-500"
                          >
                            <SelectItem value="kg">kg</SelectItem>
                            <SelectItem value="g">g</SelectItem>
                            <SelectItem value="units">units</SelectItem>
                            <SelectItem value="tons">tons</SelectItem>
                            <SelectItem value="liters">liters</SelectItem>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Harvest & Expiry */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                      <Calendar className="h-5 w-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-800">Harvest & Shelf Life</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Harvest Date */}
                      <div className="space-y-2">
                        <Label htmlFor="harvestDate" className="text-sm font-medium text-gray-700">
                          Harvest Date
                        </Label>
                        <Input
                          id="harvestDate"
                          type="date"
                          value={product.harvestDate}
                          onChange={(e) => setProduct({ ...product, harvestDate: e.target.value })}
                          className="w-full focus:ring-green-500 focus:border-green-500"
                        />
                        <p className="text-xs text-gray-500">When was this product harvested?</p>
                      </div>
                      
                      {/* Expiry Date */}
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate" className="text-sm font-medium text-gray-700">
                          Best Before Date
                        </Label>
                        <Input
                          id="expiryDate"
                          type="date"
                          value={product.expiryDate}
                          onChange={(e) => setProduct({ ...product, expiryDate: e.target.value })}
                          className="w-full focus:ring-green-500 focus:border-green-500"
                        />
                        <p className="text-xs text-gray-500">When does this product expire?</p>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Product Images */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                      <Camera className="h-5 w-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-800">Product Images</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-center">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <Camera className="h-10 w-10 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              <label htmlFor="images" className="relative cursor-pointer rounded-md font-medium text-green-600 hover:text-green-500">
                                Click to upload
                              </label>
                              <span className="pl-1">or drag and drop</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">High-quality images (JPEG, PNG) up to 5MB each (max 5 images)</p>
                          </div>
                        </div>
                        <Input
                          id="images"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                          className="sr-only"
                        />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        {product.images && product.images.length > 0 ? (
                          Array.from(product.images).map((file, index) => (
                            <div key={index} className="h-24 bg-gray-100 rounded-md overflow-hidden relative">
                              <img 
                                src={URL.createObjectURL(file)} 
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newImages = Array.from(product.images);
                                  newImages.splice(index, 1);
                                  setProduct({ ...product, images: newImages });
                                }}
                                className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70"
                              >
                                <XCircle className="h-4 w-4 text-white" />
                              </button>
                            </div>
                          ))
                        ) : (
                          <div className="h-24 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-sm">
                            No images selected
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 5: Payment Options */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                      <CreditCard className="h-5 w-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-800">Payment Methods</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          product.paymentMode === "UPI" 
                            ? "border-green-500 bg-green-50 ring-1 ring-green-500" 
                            : "border-gray-300 hover:border-green-400"
                        }`}
                        onClick={() => setProduct({ ...product, paymentMode: "UPI" })}
                      >
                        <label className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMode"
                            value="UPI"
                            checked={product.paymentMode === "UPI"}
                            onChange={() => setProduct({ ...product, paymentMode: "UPI" })}
                            className="mt-0.5 h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                          />
                          <div className="flex-1">
                            <span className="block text-sm font-medium text-gray-700">UPI Payment</span>
                            <span className="block text-xs text-gray-500 mt-1">
                              Instant payments via UPI apps (PhonePe, Google Pay, etc.)
                            </span>
                          </div>
                        </label>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          product.paymentMode === "Bank" 
                            ? "border-green-500 bg-green-50 ring-1 ring-green-500" 
                            : "border-gray-300 hover:border-green-400"
                        }`}
                        onClick={() => setProduct({ ...product, paymentMode: "Bank" })}
                      >
                        <label className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMode"
                            value="Bank"
                            checked={product.paymentMode === "Bank"}
                            onChange={() => setProduct({ ...product, paymentMode: "Bank" })}
                            className="mt-0.5 h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                          />
                          <div className="flex-1">
                            <span className="block text-sm font-medium text-gray-700">Bank Transfer</span>
                            <span className="block text-xs text-gray-500 mt-1">
                              Direct bank account transfer (NEFT/IMPS/RTGS)
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Form Submission */}
                  <div className="pt-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t pt-6">
                      <div className="flex items-center text-sm text-gray-500">
                        <Shield className="h-4 w-4 mr-2 text-green-600" />
                        <span>Your information is protected and secure</span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <Button 
                          type="button"
                          variant="outline"
                          className="w-full md:w-auto border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          Save as Draft
                        </Button>
                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-medium shadow-sm"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <RefreshCw className="h-4 w-4 animate-spin" />
                              Processing...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Truck className="h-4 w-4" />
                              Publish Listing
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-6 text-center">
                      By submitting this form, you agree to our{' '}
                      <a href="#" className="text-green-600 hover:underline font-medium">Terms of Service</a> and{' '}
                      <a href="#" className="text-green-600 hover:underline font-medium">Privacy Policy</a>.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
