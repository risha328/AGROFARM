import React, { useState, useEffect } from 'react';

const OrderTrackingPage = () => {
  const [order, setOrder] = useState({
    id: 'AGR12345678',
    date: '2023-11-15',
    total: '$147.50',
    status: 'in-transit',
    items: [
      { name: 'Organic Tomatoes (5 lbs)', quantity: 2, price: '$12.50' },
      { name: 'Fresh Carrots (3 lbs)', quantity: 1, price: '$8.00' },
      { name: 'Premium Honey (16 oz)', quantity: 1, price: '$14.50' },
      { name: 'Farm Fresh Eggs (Dozen)', quantity: 2, price: '$5.00' }
    ],
    delivery: {
      method: 'Standard Delivery',
      address: '123 Farm Lane, Agricultural City, AC 12345',
      estimatedDelivery: '2023-11-20',
      carrier: 'FarmFresh Logistics',
      trackingNumber: 'FFL789456123'
    }
  });

  const [trackingSteps, setTrackingSteps] = useState([
    { id: 'ordered', name: 'Order Placed', status: 'complete', date: 'Nov 15, 2023', time: '10:30 AM' },
    { id: 'processed', name: 'Order Processed', status: 'complete', date: 'Nov 16, 2023', time: '9:15 AM' },
    { id: 'packed', name: 'Order Packed', status: 'complete', date: 'Nov 17, 2023', time: '2:45 PM' },
    { id: 'shipped', name: 'Shipped', status: 'complete', date: 'Nov 18, 2023', time: '11:20 AM' },
    { id: 'in-transit', name: 'In Transit', status: 'current', date: 'Estimated Nov 20, 2023', time: 'By EOD' },
    { id: 'delivered', name: 'Delivered', status: 'upcoming' }
  ]);

  const [mapVisible, setMapVisible] = useState(false);
  const [deliveryProof, setDeliveryProof] = useState(null);

  // Simulate delivery completion after 5 seconds for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (order.status === 'in-transit') {
        setOrder(prev => ({
          ...prev,
          status: 'delivered',
          delivery: {
            ...prev.delivery,
            actualDelivery: '2023-11-19',
            deliveryTime: '3:45 PM'
          }
        }));
        setTrackingSteps(prev => prev.map(step => 
          step.id === 'in-transit' ? {...step, status: 'complete'} : 
          step.id === 'delivered' ? {...step, status: 'current', date: 'Nov 19, 2023', time: '3:45 PM'} : step
        ));
        setDeliveryProof({
          photo: 'https://example.com/delivery-proof.jpg',
          signedBy: 'John Doe',
          notes: 'Left at front porch as requested'
        });
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [order.status]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700">Order Tracking</h1>
          <p className="mt-2 text-lg text-gray-600">
            Track your agricultural products from farm to your doorstep
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          {/* Order Summary */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Order #{order.id}</h2>
                <p className="text-sm text-gray-500">Placed on {order.date}</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                  order.status === 'in-transit' ? 'bg-blue-100 text-blue-800' : 
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status === 'delivered' ? 'Delivered' : 
                   order.status === 'in-transit' ? 'In Transit' : 'Processing'}
                </span>
              </div>
            </div>
          </div>

          {/* Tracking Progress */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Status</h3>
            
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-0 left-4 h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
              
              <ul className="space-y-8">
                {trackingSteps.map((step, index) => (
                  <li key={step.id} className="relative pl-10">
                    <div className={`absolute left-4 top-0 flex items-center justify-center w-8 h-8 rounded-full ${
                      step.status === 'complete' ? 'bg-green-500' :
                      step.status === 'current' ? 'bg-blue-500' : 'bg-gray-200'
                    }`}>
                      {step.status === 'complete' ? (
                        <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : step.status === 'current' ? (
                        <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="h-2.5 w-2.5 bg-gray-300 rounded-full"></span>
                      )}
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm ${
                          step.status === 'complete' ? 'text-green-600' :
                          step.status === 'current' ? 'text-blue-600' : 'text-gray-500'
                        } font-medium`}>
                          {step.name}
                        </h4>
                        <time className="text-xs text-gray-500">
                          {step.date} {step.time && `at ${step.time}`}
                        </time>
                      </div>
                      {step.id === 'in-transit' && order.status === 'in-transit' && (
                        <div className="mt-2">
                          <button 
                            onClick={() => setMapVisible(!mapVisible)}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            {mapVisible ? 'Hide' : 'View'} real-time location
                          </button>
                          {mapVisible && (
                            <div className="mt-2 bg-gray-100 p-4 rounded-lg">
                              <div className="h-48 bg-gray-300 rounded flex items-center justify-center">
                                <span className="text-gray-500">Map showing delivery vehicle location</span>
                              </div>
                              <p className="mt-2 text-sm text-gray-600">
                                Your order is currently in transit with {order.delivery.carrier}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Delivery Method</h4>
                <p className="mt-1 text-sm text-gray-900">{order.delivery.method}</p>
                
                <h4 className="text-sm font-medium text-gray-500 mt-4">Tracking Number</h4>
                <p className="mt-1 text-sm text-gray-900">{order.delivery.trackingNumber}</p>
                <a 
                  href={`https://tracking.farmfreshlogistics.com/${order.delivery.trackingNumber}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  Track on carrier's website
                  <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Delivery Address</h4>
                <p className="mt-1 text-sm text-gray-900">{order.delivery.address}</p>
                
                <h4 className="text-sm font-medium text-gray-500 mt-4">
                  {order.status === 'delivered' ? 'Delivered On' : 'Estimated Delivery'}
                </h4>
                <p className="mt-1 text-sm text-gray-900">
                  {order.status === 'delivered' ? 
                    `${order.delivery.actualDelivery} at ${order.delivery.deliveryTime}` : 
                    order.delivery.estimatedDelivery}
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Proof (shown only when delivered) */}
          {order.status === 'delivered' && deliveryProof && (
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Proof</h3>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-1/3">
                  <div className="bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={deliveryProof.photo} 
                      alt="Delivery proof" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-600 text-center">Delivery photo</p>
                </div>
                
                <div className="w-full sm:w-2/3">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Signed By</h4>
                      <p className="mt-1 text-sm text-gray-900">{deliveryProof.signedBy}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Delivery Notes</h4>
                      <p className="mt-1 text-sm text-gray-900">{deliveryProof.notes}</p>
                    </div>
                    
                    <button className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      Download Delivery Receipt
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
            
            <div className="space-y-6">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                    <img 
                      src={`https://source.unsplash.com/random/100x100/?${item.name.split(' ')[0]}`} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-lg font-bold text-green-700">{order.total}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Need help with your delivery?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h4 className="mt-3 text-sm font-medium text-gray-900">Call Us</h4>
                <p className="mt-1 text-sm text-gray-500">
                  +1 (800) 123-4567<br />
                  Available 24/7
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="mt-3 text-sm font-medium text-gray-900">Email Us</h4>
                <p className="mt-1 text-sm text-gray-500">
                  support@agriculture-ecom.com<br />
                  Response within 24 hours
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h4 className="mt-3 text-sm font-medium text-gray-900">Live Chat</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Chat with our team<br />
                  Available 9AM-5PM EST
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;