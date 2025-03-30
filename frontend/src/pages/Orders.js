import React from 'react';
import { FaBoxOpen, FaTruck, FaCheckCircle, FaUndo, FaStar, FaReceipt } from 'react-icons/fa';
import { MdCancel, MdPayment } from 'react-icons/md';

const MyOrdersPage = () => {
  // Sample orders data - replace with actual data from your API/state
  const orders = [
    {
      id: '#AGF-2023-1085',
      date: 'Oct 15, 2023',
      status: 'Delivered',
      items: 3,
      total: '$148.75',
      delivery: 'Standard Shipping',
      tracking: 'UPS - 1Z999AA10123456784',
      products: [
        {
          id: 1,
          name: 'Organic Tomato Seeds',
          image: 'https://via.placeholder.com/80',
          price: '$12.99',
          quantity: 2,
          status: 'Delivered Oct 18, 2023',
          rating: null
        },
        {
          id: 2,
          name: 'Premium Fertilizer 5kg',
          image: 'https://via.placeholder.com/80',
          price: '$39.99',
          quantity: 1,
          status: 'Delivered Oct 18, 2023',
          rating: 4
        }
      ]
    },
    {
      id: '#AGF-2023-0972',
      date: 'Sep 28, 2023',
      status: 'Shipped',
      items: 2,
      total: '$87.50',
      delivery: 'Express Shipping',
      tracking: 'FedEx - 123456789012',
      products: [
        {
          id: 3,
          name: 'Garden Tool Set',
          image: 'https://via.placeholder.com/80',
          price: '$49.99',
          quantity: 1,
          status: 'Shipped - ETA Oct 5, 2023',
          rating: null
        },
        {
          id: 4,
          name: 'Watering Can',
          image: 'https://via.placeholder.com/80',
          price: '$18.75',
          quantity: 1,
          status: 'Shipped - ETA Oct 5, 2023',
          rating: null
        }
      ]
    }
  ];

  const statusIcon = (status) => {
    switch(status) {
      case 'Delivered':
        return <FaCheckCircle className="text-green-500" />;
      case 'Shipped':
        return <FaTruck className="text-blue-500" />;
      case 'Cancelled':
        return <MdCancel className="text-red-500" />;
      default:
        return <FaBoxOpen className="text-gray-500" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaBoxOpen className="text-green-600" />
          My Orders
        </h1>
        <div className="relative">
          <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
            <option>All Orders</option>
            <option>Pending</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <FaBoxOpen className="mx-auto text-gray-400 text-5xl mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">No Orders Yet</h3>
          <p className="text-gray-500 mb-4">You haven't placed any orders with us yet.</p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition-all">
            Browse Products
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Order Header */}
              <div className="border-b border-gray-200 p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="font-bold text-gray-800">Order {order.id}</h2>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      } flex items-center gap-1`}>
                        {statusIcon(order.status)}
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Placed on {order.date}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-green-600">
                      <FaReceipt />
                      Invoice
                    </button>
                    {order.status === 'Shipped' && (
                      <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-green-600">
                        <FaTruck />
                        Track
                      </button>
                    )}
                    {order.status === 'Delivered' && (
                      <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-green-600">
                        <FaUndo />
                        Return
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Order Items */}
              <div className="divide-y divide-gray-200">
                {order.products.map((product) => (
                  <div key={product.id} className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{product.name}</h3>
                        <p className="text-gray-600 text-sm">{product.price} × {product.quantity}</p>
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                          {order.status === 'Delivered' ? (
                            <FaCheckCircle className="text-green-500 text-xs" />
                          ) : (
                            <FaTruck className="text-blue-500 text-xs" />
                          )}
                          {product.status}
                        </p>
                        
                        {order.status === 'Delivered' && (
                          <div className="mt-3">
                            {product.rating ? (
                              <div className="flex items-center gap-1 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar key={i} className={i < product.rating ? 'fill-current' : 'text-gray-300'} />
                                ))}
                                <span className="text-xs text-gray-500 ml-1">Rated</span>
                              </div>
                            ) : (
                              <button className="text-sm text-green-600 hover:text-green-800 flex items-center gap-1">
                                <FaStar className="text-yellow-400" />
                                Rate Product
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex md:flex-col justify-between md:justify-start gap-2">
                        <button className="text-sm text-gray-700 hover:text-green-600 px-3 py-1 border border-gray-300 rounded-lg hover:border-green-300 transition-all">
                          View Details
                        </button>
                        {order.status === 'Delivered' && (
                          <button className="text-sm text-gray-700 hover:text-green-600 px-3 py-1 border border-gray-300 rounded-lg hover:border-green-300 transition-all">
                            Buy Again
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order Footer */}
              <div className="border-t border-gray-200 p-4 md:p-6 bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">Delivery:</span> {order.delivery}
                    </p>
                    {order.tracking && (
                      <p className="text-gray-600">
                        <span className="font-medium">Tracking:</span> {order.tracking}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="text-lg font-bold text-gray-800 mb-1">Total: {order.total}</div>
                    <div className="flex gap-3">
                      <button className="text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-1">
                        <MdPayment />
                        Pay Now
                      </button>
                      <button className="text-sm bg-white border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-all">
                        Contact Support
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;