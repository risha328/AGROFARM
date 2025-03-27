import React, { useState, useEffect, useContext } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const { fetchUserAddToCart } = useContext(Context);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();

    const [shipping, setShipping] = useState({
        firstName: '', lastName: '', email: '', phone: '', address: '', city: '', state: '', pincode: ''
    });

    useEffect(() => {
        const fetchTotal = async () => {
            try {
                const response = await fetch(SummaryApi.addToCartProductView.url, {
                    method: SummaryApi.addToCartProductView.method,
                    credentials: 'include',
                    headers: { "content-type": "application/json" }
                });
                const result = await response.json();
                if (result.success) {
                    const total = result.data.reduce((acc, curr) => acc + (curr.quantity * curr.productId.sellingPrice), 0);
                    setTotalAmount(total);
                } else {
                    toast.error('Failed to fetch cart data.');
                }
            } catch (error) {
                toast.error('Error fetching cart data.');
            }
        };
        fetchTotal();
    }, []);

    const handlePayment = async () => {
        if (!shipping.firstName || !shipping.address || !shipping.phone) {
            return toast.warning('Please fill all shipping details.');
        }

        if (totalAmount <= 0) {
            return toast.warning('Your cart is empty.');
        }

        const response = await fetch(SummaryApi.payment.url, {
            method: SummaryApi.payment.method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: totalAmount, currency: 'INR' })
        });

        const orderData = await response.json();

        if (orderData.success) {
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: totalAmount * 100,
                currency: "INR",
                name: "Kishan2Kitchen",
                description: "Order Payment",
                order_id: orderData.order.id,
                handler: async function (response) {
                    const verifyRes = await fetch('/api/verify-payment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(response)
                    });
                    const verifyData = await verifyRes.json();
                    if (verifyData.success) {
                        toast.success('Payment Successful!');
                        fetchUserAddToCart();
                        navigate('/thank-you');
                    } else {
                        toast.error('Payment Verification Failed.');
                    }
                },
                theme: { color: "#059669" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } else {
            toast.error("Failed to initiate payment.");
        }
    };

    return (
       <div className="container mx-auto px-4 py-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left - Shipping */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">

            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Shipping Address</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="flex flex-col space-y-1">
                    <label className="text-sm text-gray-600 font-medium">First Name</label>
                    <input type="text" placeholder="John" value={shipping.firstName} onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })} className="input-style" />
                </div>

                <div className="flex flex-col space-y-1">
                    <label className="text-sm text-gray-600 font-medium">Last Name</label>
                    <input type="text" placeholder="Doe" value={shipping.lastName} onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })} className="input-style" />
                </div>

                <div className="flex flex-col space-y-1">
                    <label className="text-sm text-gray-600 font-medium">Email</label>
                    <input type="email" placeholder="john@example.com" value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} className="input-style" />
                </div>

                <div className="flex flex-col space-y-1">
                    <label className="text-sm text-gray-600 font-medium">Phone</label>
                    <input type="text" placeholder="9876543210" value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} className="input-style" />
                </div>

                <div className="flex flex-col space-y-1 md:col-span-2">
                    <label className="text-sm text-gray-600 font-medium">Address</label>
                    <input type="text" placeholder="House No, Street, Landmark" value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} className="input-style" />
                </div>

                <div className="flex flex-col space-y-1">
                    <label className="text-sm text-gray-600 font-medium">City</label>
                    <input type="text" placeholder="City" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} className="input-style" />
                </div>

                <div className="flex flex-col space-y-1">
                    <label className="text-sm text-gray-600 font-medium">State</label>
                    <input type="text" placeholder="State" value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} className="input-style" />
                </div>

                <div className="flex flex-col space-y-1">
                    <label className="text-sm text-gray-600 font-medium">Pincode</label>
                    <input type="text" placeholder="123456" value={shipping.pincode} onChange={(e) => setShipping({ ...shipping, pincode: e.target.value })} className="input-style" />
                </div>

            </div>
        </div>
    



                {/* Right - Order Summary */}
                <div className="bg-white rounded-lg shadow p-5 space-y-4 h-fit">
                    <h2 className="text-xl font-semibold border-b pb-2">Order Summary</h2>
                    <p className="flex justify-between">Subtotal: <span>{displayINRCurrency(totalAmount)}</span></p>
                    <p className="flex justify-between">Shipping: <span className="text-green-600">FREE</span></p>
                    <p className="flex justify-between font-semibold text-lg">Total: <span>{displayINRCurrency(totalAmount)}</span></p>

                    <button onClick={handlePayment} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-all duration-300 font-medium">
                        Proceed to Pay
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PaymentPage;
