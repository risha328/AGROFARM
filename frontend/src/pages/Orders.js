import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBoxOpen } from 'react-icons/fa';
import displayINRCurrency from '../helpers/displayCurrency';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/user/orders', {
                    credentials: 'include'
                });

                const contentType = res.headers.get("content-type");

                if (contentType && contentType.includes("application/json")) {
                    const data = await res.json();

                    if (data.success) {
                        setOrders(data.orders);
                    } else {
                        console.error('API returned success: false', data);
                    }
                } else {
                    console.error('Non-JSON response from server');
                }

            } catch (error) {
                console.error('Fetch Orders Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <p className="text-center py-10">Loading Orders...</p>;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">My Orders</h2>

            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center bg-white py-10 rounded shadow">
                    <FaBoxOpen className="text-6xl text-gray-400" />
                    <p className="mt-4 text-gray-500 text-center">You have no orders yet.</p>
                    <Link to="/" className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Shop Now
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white p-4 rounded shadow border border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold text-gray-800">Order ID: {order._id}</h3>
                                <span className={`text-sm ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="space-y-2">
                                {order.products.map((product) => (
                                    <div key={product._id} className="flex items-center gap-4 border-b py-2 last:border-b-0">
                                        <img src={product.productId?.productImage?.[0] || ""} alt={product.productId?.productName} className="w-16 h-16 object-contain rounded" />
                                        <div className="flex-1">
                                            <h4 className="font-medium">{product.productId?.productName}</h4>
                                            <p className="text-sm text-gray-500">{product.productId?.category}</p>
                                            <p className="text-sm text-gray-600">Qty: {product.quantity}</p>
                                        </div>
                                        <div className="font-semibold text-green-700">
                                            {displayINRCurrency(product.productId?.sellingPrice * product.quantity)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-3 text-sm text-gray-600">
                                <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                <p>Total: <span className="font-semibold text-green-700">{displayINRCurrency(order.totalAmount)}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;

