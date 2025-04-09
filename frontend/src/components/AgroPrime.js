import React, { useState } from 'react';
import { FaTractor, FaSeedling, FaChartLine, FaCalendarAlt, FaPhoneVolume, FaBook, FaCheck, FaLeaf, FaSun, FaWater, FaReceipt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AgroPrimePage = () => {
  return (
    <div className="bg-gray-50">
      <ToastContainer position="top-center" autoClose={5000} />
      {/* Banner Section */}
      <div className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 w-full h-[70vh] flex items-center">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Farm landscape"
            className="w-full h-full object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 py-16 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
            <div className="text-center lg:text-left">
              {/* Headings */}
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">AgroPrime Subscription</span>
                <span className="block text-yellow-300 animate-pulse">Grow Smarter, Not Harder</span>
              </h1>
              
              {/* Subheading */}
              <p className="mt-6 max-w-lg text-lg text-green-100 sm:max-w-2xl sm:mx-auto md:mt-8 md:text-xl lg:mx-0">
                Join <span className="font-semibold text-yellow-200">15,000+ farmers</span> using our premium agricultural intelligence to maximize yields and profits.
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="rounded-md shadow-lg transform transition hover:scale-105">
                  <a
                    href="#subscription-plans"
                    className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg text-green-900 bg-yellow-400 hover:bg-yellow-300 transition-colors duration-300"
                  >
                    Get Started Today
                    <svg className="ml-2 -mr-1 w-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
                <div className="rounded-md shadow-lg transform transition hover:scale-105">
                  <a
                    href="#features"
                    className="w-full flex items-center justify-center px-8 py-4 border-2 border-yellow-300 text-lg font-bold rounded-lg text-yellow-300 bg-transparent hover:bg-green-800/50 transition-colors duration-300"
                  >
                    How It Works
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600 mx-auto">
                <FaLeaf className="h-6 w-6" />
              </div>
              <p className="mt-5 text-3xl font-semibold text-green-800">10,000+</p>
              <p className="mt-2 text-sm text-gray-500">Active Farms</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600 mx-auto">
                <FaSun className="h-6 w-6" />
              </div>
              <p className="mt-5 text-3xl font-semibold text-green-800">30%</p>
              <p className="mt-2 text-sm text-gray-500">Average Yield Increase</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600 mx-auto">
                <FaWater className="h-6 w-6" />
              </div>
              <p className="mt-5 text-3xl font-semibold text-green-800">50%</p>
              <p className="mt-2 text-sm text-gray-500">Water Savings</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600 mx-auto">
                <FaChartLine className="h-6 w-6" />
              </div>
              <p className="mt-5 text-3xl font-semibold text-green-800">$5M+</p>
              <p className="mt-2 text-sm text-gray-500">Farmer Earnings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Agro-Prime Subscription Component */}
      <AgroPrimeSubscription />
    </div>
  );
};

const AgroPrimeSubscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    farmSize: '',
    location: '',
    crops: '',
    phone: ''
  });

  const subscriptionPlans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: '$9.99/month',
      features: [
        'Market price alerts',
        'Basic weather forecasts',
        'Monthly expert tips',
        'Access to community forum'
      ],
      bestFor: 'Small-scale farmers'
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      price: '$24.99/month',
      features: [
        'Advanced market analytics',
        'Detailed weather forecasts',
        'Weekly expert consultations',
        'Disease/pest alerts',
        'Soil health monitoring',
        'Priority customer support'
      ],
      bestFor: 'Medium-scale commercial farmers',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      price: '$49.99/month',
      features: [
        'Personalized farm advisor',
        'Real-time satellite monitoring',
        'Customized fertilizer plans',
        'Equipment rental discounts',
        'Premium insurance options',
        '24/7 expert hotline'
      ],
      bestFor: 'Large-scale agricultural businesses'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (selectedPlan) {
      setShowPayment(true);
    }
  };

  const handlePayment = () => {
    // Simulate payment processing
    setPaymentSuccess(true);
    
    setTimeout(() => {
      setIsSubscribed(true);
      setShowPayment(false);
      toast.success('Payment Successful!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }, 1500);
  };

  const generateReceipt = () => {
    const currentPlan = subscriptionPlans.find(p => p.id === selectedPlan);
    const receiptDate = new Date().toLocaleDateString();
    const receiptNumber = `AGR-${Math.floor(Math.random() * 1000000)}`;
    
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-800">Payment Receipt</h2>
          <FaReceipt className="text-3xl text-green-600" />
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Receipt Number:</span>
            <span className="font-medium">{receiptNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{receiptDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Plan:</span>
            <span className="font-medium">{currentPlan.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Amount Paid:</span>
            <span className="font-medium">{currentPlan.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method:</span>
            <span className="font-medium">Credit Card</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className="font-medium text-green-600">Completed</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-semibold text-gray-800 mb-2">Customer Information</h3>
          <p className="text-gray-600">{formData.name}</p>
          <p className="text-gray-600">{formData.location}</p>
          <p className="text-gray-600">{formData.phone}</p>
        </div>

        <button
          onClick={() => setShowReceipt(false)}
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
        >
          Close Receipt
        </button>
      </div>
    );
  };

  if (showReceipt) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        {generateReceipt()}
      </div>
    );
  }

  if (isSubscribed) {
    const currentPlan = subscriptionPlans.find(p => p.id === selectedPlan);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="flex justify-center text-6xl text-green-600 mb-4">
            <FaSeedling />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Agro-Prime {currentPlan.name.split(' ')[0]}!</h2>
          <p className="text-gray-600 mb-6">
            Your {currentPlan.name} subscription is now active.
          </p>
          
          <div className="flex justify-center space-x-4 mb-6">
            <button 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
              onClick={() => window.location.href = '/farmer-dashboard'}
            >
              Go to Dashboard
            </button>
            <button 
              className="bg-white border border-green-600 text-green-600 hover:bg-green-50 font-bold py-2 px-4 rounded-lg transition duration-200"
              onClick={() => setShowReceipt(true)}
            >
              View Receipt
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showPayment) {
    const currentPlan = subscriptionPlans.find(p => p.id === selectedPlan);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Complete Payment</h2>
          
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-yellow-800 mb-2">Order Summary</h3>
            <div className="flex justify-between mb-1">
              <span>Plan:</span>
              <span className="font-medium">{currentPlan.name}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Price:</span>
              <span className="font-medium">{currentPlan.price}</span>
            </div>
            <div className="border-t border-yellow-200 my-2"></div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>{currentPlan.price}</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition duration-200 text-lg flex items-center justify-center"
            disabled={paymentSuccess}
          >
            {paymentSuccess ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              `Pay ${currentPlan.price}`
            )}
          </button>

          <button
            onClick={() => setShowPayment(false)}
            className="w-full mt-4 text-gray-600 hover:text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200 text-center"
          >
            Back to subscription
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="subscription-plans">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 flex items-center justify-center gap-2">
          <FaTractor /> Agro-Prime Membership
        </h1>
        <p className="text-xl text-gray-600 mt-2">
          Premium agricultural services tailored to your farm's needs
        </p>
      </header>

      {/* Benefits Section */}
      <section className="mb-16" id="features">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Why Join Agro-Prime?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <div className="text-green-600 text-4xl mb-4">
              <FaChartLine />
            </div>
            <h3 className="text-xl font-semibold mb-2">Market Intelligence</h3>
            <p className="text-gray-600">
              Real-time crop prices and demand forecasts to maximize your profits.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <div className="text-green-600 text-4xl mb-4">
              <FaCalendarAlt />
            </div>
            <h3 className="text-xl font-semibold mb-2">Seasonal Planning</h3>
            <p className="text-gray-600">
              Custom planting and harvesting schedules based on your location.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <div className="text-green-600 text-4xl mb-4">
              <FaPhoneVolume />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
            <p className="text-gray-600">
              Direct access to agricultural specialists when you need help.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <div className="text-green-600 text-4xl mb-4">
              <FaBook />
            </div>
            <h3 className="text-xl font-semibold mb-2">Knowledge Base</h3>
            <p className="text-gray-600">
              Exclusive guides and tutorials on modern farming techniques.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-xl shadow-md overflow-hidden border-2 transition-all duration-300 hover:shadow-lg ${
                plan.popular ? 'border-yellow-400' : 'border-transparent'
              } ${selectedPlan === plan.id ? 'ring-2 ring-green-500' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 px-3 py-1 text-sm font-bold transform rotate-12 translate-x-2 -translate-y-1">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-800 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-4">{plan.price}</div>
                <div className="text-sm text-gray-500 italic mb-6">{plan.bestFor}</div>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Signup Form */}
      {selectedPlan && (
        <section className="bg-gray-50 rounded-xl p-8 shadow-inner">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
            Complete Your Subscription
          </h2>
          <form onSubmit={handleSubscribe} className="max-w-2xl mx-auto">
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Farm Size (acres)</label>
                <input
                  type="number"
                  name="farmSize"
                  value={formData.farmSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Primary Crops/Livestock</label>
                <input
                  type="text"
                  name="crops"
                  value={formData.crops}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  required
                  className="rounded text-green-600 focus:ring-green-500 mr-2"
                />
                <span className="text-gray-700">I agree to the terms and conditions</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition duration-200 text-lg"
            >
              Subscribe to {subscriptionPlans.find(p => p.id === selectedPlan).name}
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default AgroPrimePage;