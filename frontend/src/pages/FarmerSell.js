import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectItem } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { Camera, Leaf, RefreshCw, CreditCard, Calendar, Tag, Truck, Shield } from "lucide-react";

export default function SellProductForm() {
  const [product, setProduct] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    quantity: "1",
    harvestDate: "",
    expiryDate: "",
    images: [],
    paymentMode: "UPI",
    organic: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-8 md:p-12 bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 shadow-xl rounded-2xl border border-green-200"
    >
      <div className="flex items-center justify-center gap-3 mb-10">
        <Leaf className="h-10 w-10 text-green-600" />
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">Sell Your Harvest</h2>
      </div>
      
      <Card className="border-0 shadow-xl overflow-hidden bg-white">
        <div className="h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600"></div>
        <CardContent className="p-8 md:p-12 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Product Details Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-green-100">
                <Tag className="h-5 w-5 text-green-600" />
                <h3 className="text-xl font-semibold text-green-800">Product Details</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-lg text-green-800 font-semibold flex items-center">
                    Product Name <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="E.g., Organic Red Apples, Premium Basmati Rice"
                    value={product.title}
                    onChange={(e) => setProduct({ ...product, title: e.target.value })}
                    className="w-full border-green-200 focus:ring-green-500 focus:border-green-500 rounded-lg shadow-sm"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-lg text-green-800 font-semibold flex items-center">
                    Category <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Select
                    id="category"
                    value={product.category}
                    onValueChange={(value) => setProduct({ ...product, category: value })}
                    className="w-full border-green-200 focus:ring-green-500 focus:border-green-500 rounded-lg shadow-sm"
                    required
                  >
                    <SelectItem value="">Select a category</SelectItem>
                    <SelectItem value="fruits">Fruits & Berries</SelectItem>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="grains">Grains & Cereals</SelectItem>
                    <SelectItem value="dairy">Dairy Products</SelectItem>
                    <SelectItem value="spices">Spices & Herbs</SelectItem>
                    <SelectItem value="nuts">Nuts & Seeds</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-lg text-green-800 font-semibold flex items-center">
                    Product Description <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your product quality, origin, cultivation method, etc."
                    value={product.description}
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    className="w-full min-h-32 border-green-200 focus:ring-green-500 focus:border-green-500 rounded-lg shadow-sm"
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-3 py-2">
                  <input
                    type="checkbox"
                    id="organic"
                    checked={product.organic}
                    onChange={(e) => setProduct({ ...product, organic: e.target.checked })}
                    className="h-5 w-5 rounded text-green-600 border-green-300 focus:ring-green-500"
                  />
                  <Label htmlFor="organic" className="font-medium text-green-800">
                    This product is certified organic
                  </Label>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-green-100">
                <CreditCard className="h-5 w-5 text-green-600" />
                <h3 className="text-xl font-semibold text-green-800">Pricing & Quantity</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-lg text-green-800 font-semibold flex items-center">
                    Price (₹) <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={product.price}
                      onChange={(e) => setProduct({ ...product, price: e.target.value })}
                      className="w-full pl-8 border-green-200 focus:ring-green-500 focus:border-green-500 rounded-lg shadow-sm"
                      required
                    />
                  </div>
                  <p className="text-sm text-green-700">Price per unit/kg</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-lg text-green-800 font-semibold flex items-center">
                    Available Quantity <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      placeholder="1"
                      value={product.quantity}
                      onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                      className="w-full border-green-200 focus:ring-green-500 focus:border-green-500 rounded-lg shadow-sm"
                      required
                    />
                    <Select 
                      defaultValue="kg"
                      className="w-32 border-green-200 focus:ring-green-500 focus:border-green-500 rounded-lg shadow-sm"
                    >
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="g">g</SelectItem>
                      <SelectItem value="units">units</SelectItem>
                      <SelectItem value="tons">tons</SelectItem>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="harvestDate" className="text-lg text-green-800 font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Harvest Date
                  </Label>
                  <Input
                    id="harvestDate"
                    type="date"
                    value={product.harvestDate}
                    onChange={(e) => setProduct({ ...product, harvestDate: e.target.value })}
                    className="w-full border-green-200 focus:ring-green-500 focus:border-green-500 rounded-lg shadow-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expiryDate" className="text-lg text-green-800 font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Best Before Date
                  </Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={product.expiryDate}
                    onChange={(e) => setProduct({ ...product, expiryDate: e.target.value })}
                    className="w-full border-green-200 focus:ring-green-500 focus:border-green-500 rounded-lg shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Upload Images */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-green-100">
                <Camera className="h-5 w-5 text-green-600" />
                <h3 className="text-xl font-semibold text-green-800">Product Images</h3>
              </div>
              
              <div className="border-2 border-dashed border-green-300 p-8 rounded-lg bg-green-50 hover:bg-green-100 transition-colors text-center">
                <Camera className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <p className="text-green-800 mb-3 font-medium">Drag & drop product images or click to browse</p>
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setProduct({ ...product, images: e.target.files })}
                  className="w-full cursor-pointer text-green-700"
                />
                <p className="text-sm text-green-600 mt-3">Upload high-quality images from multiple angles (max 5 images)</p>
              </div>
            </div>

            {/* Payment Mode */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-green-100">
                <CreditCard className="h-5 w-5 text-green-600" />
                <h3 className="text-xl font-semibold text-green-800">Payment Options</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    product.paymentMode === "UPI" 
                      ? "border-green-500 bg-green-50 shadow-md" 
                      : "border-gray-200 hover:border-green-300"
                  }`}
                  onClick={() => setProduct({ ...product, paymentMode: "UPI" })}
                >
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="UPI"
                      checked={product.paymentMode === "UPI"}
                      onChange={() => setProduct({ ...product, paymentMode: "UPI" })}
                      className="h-4 w-4 text-green-600 border-green-300 focus:ring-green-500"
                    />
                    <div>
                      <span className="text-green-800 font-semibold">UPI Payment</span>
                      <p className="text-sm text-green-700">Instant payments via UPI apps (PhonePe, Google Pay, etc.)</p>
                    </div>
                  </label>
                </div>
                
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    product.paymentMode === "Bank" 
                      ? "border-green-500 bg-green-50 shadow-md" 
                      : "border-gray-200 hover:border-green-300"
                  }`}
                  onClick={() => setProduct({ ...product, paymentMode: "Bank" })}
                >
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="Bank"
                      checked={product.paymentMode === "Bank"}
                      onChange={() => setProduct({ ...product, paymentMode: "Bank" })}
                      className="h-4 w-4 text-green-600 border-green-300 focus:ring-green-500"
                    />
                    <div>
                      <span className="text-green-800 font-semibold">Bank Transfer</span>
                      <p className="text-sm text-green-700">Direct bank account transfer (NEFT/IMPS/RTGS)</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg py-6 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <RefreshCw className="h-5 w-5 animate-spin" /> Processing...
                  </span>
                ) : (
                  <>
                    <Truck className="h-5 w-5" /> List Your Product
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-center gap-2 mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <Shield className="h-5 w-5 text-green-600" />
        <p className="text-sm text-green-700">
          By listing your product, you agree to our <span className="text-green-600 font-medium underline">terms of service</span> and <span className="text-green-600 font-medium underline">seller guidelines</span>.
        </p>
      </div>
    </motion.div>
  );
}


