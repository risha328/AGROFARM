// Checkout.js
// Checkout.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DollarSign, MapPin, User, Mail, HardHat, Clock, Calendar, CheckCircle } from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [rentedSuccessfully, setRentedSuccessfully] = useState(false);
  const [rentalDuration, setRentalDuration] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Get item from location state passed from MachineryList page
  const item = location.state?.item;

  const handleRent = () => {
    setIsProcessing(true);
    // Simulate renting machinery with 2 second delay
    setTimeout(() => {
      setRentedSuccessfully(true);
      setIsProcessing(false);
    }, 2000);
  };

  const calculateTotal = () => {
    return item.rentPerDay * rentalDuration;
  };

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
          <HardHat className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Item Not Found</h2>
          <p className="text-gray-600 mb-6">The machinery item you're trying to rent could not be found.</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Browse Available Machinery
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <HardHat className="h-10 w-10 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-800">Rent Machinery</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Complete your rental process for <span className="font-medium text-gray-800">{item.name}</span>
        </p>
      </div>

      {rentedSuccessfully ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200 max-w-2xl mx-auto">
          <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">Rental Confirmed!</h3>
          <div className="mt-6 bg-gray-50 rounded-lg p-4 max-w-md mx-auto text-left">
            <div className="flex items-center gap-3 mb-3">
              <HardHat className="h-5 w-5 text-green-600" />
              <span className="font-medium">{item.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Rental Duration</p>
                <p className="font-medium">{rentalDuration} day{rentalDuration > 1 ? 's' : ''}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-medium">₹{calculateTotal()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">
                  {paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}
                </p>
              </div>
              {deliveryDate && (
                <div>
                  <p className="text-sm text-gray-500">Delivery Date</p>
                  <p className="font-medium">{new Date(deliveryDate).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>
          <p className="mt-6 text-gray-500 max-w-md mx-auto">
            Your rental for {item.name} has been confirmed. The owner will contact you shortly to arrange delivery.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Back to Home
            </button>
            <button
              onClick={() => navigate("/my-rentals")}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
            >
              View My Rentals
            </button>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Rental Summary */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              Rental Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <HardHat className="h-5 w-5 text-green-600" />
                  Machinery Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{item.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-medium">{item.category || "Construction Equipment"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{item.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <User className="h-5 w-5 text-green-600" />
                  Owner Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Owner Name</p>
                    <p className="font-medium">{item.ownerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact Email</p>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{item.contactEmail}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Owner Rating</p>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`h-4 w-4 ${star <= (item.ownerRating || 4) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-xs text-gray-500 ml-1">({item.totalRatings || 12} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rental Period */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-600" />
                Rental Duration (Days)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={rentalDuration}
                  onChange={(e) => setRentalDuration(Math.max(1, Math.min(30, parseInt(e.target.value) || 1)))}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <span className="text-gray-600">days</span>
                <div className="ml-auto text-right">
                  <p className="text-sm text-gray-600">Total Rent</p>
                  <p className="text-lg font-semibold text-green-600">₹{calculateTotal()}</p>
                </div>
              </div>
            </div>

            {/* Delivery Date */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-600" />
                Preferred Delivery Date
              </label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod("COD")}
                  className={`p-4 border rounded-lg flex items-center justify-center gap-2 ${paymentMethod === "COD" ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}
                >
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Cash on Delivery</span>
                </button>
                <button
                  onClick={() => setPaymentMethod("online")}
                  className={`p-4 border rounded-lg flex items-center justify-center gap-2 ${paymentMethod === "online" ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}
                >
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span>Online Payment</span>
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-6">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the <a href="#" className="text-green-600 hover:underline">Terms and Conditions</a> and 
                  acknowledge that I will be responsible for any damages beyond normal wear and tear.
                </label>
              </div>
            </div>

            {/* Rent Now Button */}
            <button
              onClick={handleRent}
              disabled={isProcessing}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <DollarSign className="h-4 w-4" />
                  Confirm Rental
                </>
              )}
            </button>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit sticky top-4">
            <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              Order Summary
            </h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Daily Rate</span>
                <span className="font-medium">₹{item.rentPerDay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{rentalDuration} day{rentalDuration > 1 ? 's' : ''}</span>
              </div>
              {deliveryDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Date</span>
                  <span className="font-medium">{new Date(deliveryDate).toLocaleDateString()}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{calculateTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-medium">₹{Math.floor(calculateTotal() * 0.05)}</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-1">
                <div className="flex justify-between font-semibold text-gray-800">
                  <span>Total</span>
                  <span>₹{calculateTotal() + Math.floor(calculateTotal() * 0.05)}</span>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded-md border border-green-100">
              <h3 className="text-sm font-medium text-green-800 mb-1">Rental Protection Included</h3>
              <p className="text-xs text-green-600">
                Your rental includes damage protection up to ₹10,000. <a href="#" className="underline">Learn more</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}