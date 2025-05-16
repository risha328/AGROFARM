import { useState } from 'react';
import { FaTractor, FaLeaf, FaCreditCard, FaTruck, FaPhone } from 'react-icons/fa';

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const cartItems = [
    { id: 1, name: 'Organic Fertilizer (50kg)', price: 45.99, quantity: 2 },
    { id: 2, name: 'Hybrid Corn Seeds (1kg)', price: 32.50, quantity: 1 },
    { id: 3, name: 'Garden Tool Set', price: 29.99, quantity: 1 }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 12.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const sellerPhoneNumber = '+1 (555) 123-4567'; // Seller's contact number

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    
    if (paymentMethod === 'cod') {
      setOrderPlaced(true);
    } else {
      alert('Order placed successfully!');
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <FaLeaf className="text-green-600 text-3xl mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">AGROFARM</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto text-center">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your order. This is a Cash on Delivery (COD) order. 
              Please have the exact amount ready when our delivery agent arrives.
            </p>
            
            {/* <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Order Summary</h3>
              <p className="text-gray-600">Total Amount: ${total.toFixed(2)}</p>
            </div> */}
            
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center justify-center">
                <FaPhone className="text-blue-500 mr-2" />
                Contact Seller
              </h3>
              <p className="text-gray-600 mb-2">For any questions about your order, please contact With Seller Phone Number</p>
              {/* <a 
                href={`tel:${sellerPhoneNumber.replace(/\D/g, '')}`}
                className="text-blue-600 font-medium text-lg hover:text-blue-800"
              >
                {sellerPhoneNumber}
              </a> */}
              <p className="text-gray-500 text-sm mt-2">Our customer service is available 9AM-5PM, Mon-Fri</p>
            </div>
            
            <button
              onClick={() => setOrderPlaced(false)}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-150 ease-in-out"
            >
              Back to Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <FaLeaf className="text-green-600 text-3xl mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">AGROFARM</h1>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Checkout form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <FaTruck className="text-green-500 mr-2" />
                Shipping Information
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="IN">India</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={billingSameAsShipping}
                      onChange={() => setBillingSameAsShipping(!billingSameAsShipping)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Billing address is the same as shipping address</span>
                  </label>
                </div>
                
                {!billingSameAsShipping && (
                  <div className="bg-gray-50 p-4 rounded-md mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Billing Address</h3>
                    {/* Add billing address fields here */}
                  </div>
                )}
                
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <FaCreditCard className="text-green-500 mr-2" />
                  Payment Method
                </h2>
                
                <div className="mb-6">
                  <div className="flex items-center space-x-4 mb-4 flex-wrap">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'credit'}
                        onChange={() => setPaymentMethod('credit')}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Credit/Debit Card</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'paypal'}
                        onChange={() => setPaymentMethod('paypal')}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">PayPal</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'bank'}
                        onChange={() => setPaymentMethod('bank')}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Bank Transfer</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Cash on Delivery (COD)</span>
                    </label>
                  </div>
                  
                  {paymentMethod === 'credit' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required={paymentMethod === 'credit'}
                        />
                      </div>
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required={paymentMethod === 'credit'}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                          <input
                            type="text"
                            id="expiry"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required={paymentMethod === 'credit'}
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="123"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required={paymentMethod === 'credit'}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {paymentMethod === 'paypal' && (
                    <div className="bg-yellow-50 p-4 rounded-md">
                      <p className="text-sm text-gray-700">You will be redirected to PayPal to complete your payment.</p>
                    </div>
                  )}
                  
                  {paymentMethod === 'bank' && (
                    <div className="bg-blue-50 p-4 rounded-md">
                      <p className="text-sm text-gray-700 mb-2">Please make a transfer to:</p>
                      <p className="text-sm font-medium">Bank Name: AgriMarket Bank</p>
                      <p className="text-sm font-medium">Account Number: 1234567890</p>
                      <p className="text-sm font-medium">Routing Number: 987654321</p>
                      <p className="text-sm mt-2">Please include your order number as the reference.</p>
                    </div>
                  )}
                  
                  {paymentMethod === 'cod' && (
                    <div className="bg-green-50 p-4 rounded-md">
                      <p className="text-sm text-gray-700 mb-2">
                        Pay with cash when your order is delivered. Our delivery agent will contact you 
                        before arriving at your shipping address.
                      </p>
                      <p className="text-sm font-medium">
                        Please have the exact amount (${total.toFixed(2)}) ready for the delivery agent.
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Order Notes (Optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Special instructions, delivery preferences, etc."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  {paymentMethod === 'cod' ? 'Place COD Order' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>
          
          {/* Right column - Order summary */}
          {/* <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <FaTractor className="text-green-500 mr-2" />
                Order Summary
              </h2>
              
              <div className="border-b border-gray-200 pb-4 mb-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between mb-3">
                    <div>
                      <p className="text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-800">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-800">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t border-gray-200">
                  <span className="text-gray-800">Total</span>
                  <span className="text-green-600">${total.toFixed(2)}</span>
                </div>
              </div> */}
              
              {paymentMethod === 'cod' && (
                <div className="bg-green-50 p-3 rounded-md mb-4">
                  <p className="text-sm text-green-700">
                    Cash on Delivery available for orders under $500. Please have exact change ready.
                  </p>
                </div>
              )}
              
              <div className="text-center">
                <a href="#" className="text-sm text-green-600 hover:text-green-800">
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        </div>
     
  );
};

export default CheckoutPage;