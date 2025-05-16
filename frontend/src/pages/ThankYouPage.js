import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Download, Mail, Home } from 'lucide-react';

const ThankYouPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [animationStage, setAnimationStage] = useState(0);
    const timers = useRef([]);

    useEffect(() => {
        if (!state) {
            navigate('/');
            return;
        }

        // Clear any existing timers
        timers.current.forEach(timer => clearTimeout(timer));
        timers.current = [];

        const setupAnimation = () => {
            timers.current.push(
                setTimeout(() => setAnimationStage(1), 300)  // Show circle
            );
            timers.current.push(
                setTimeout(() => setAnimationStage(2), 1000) // Draw checkmark
            );
            timers.current.push(
                setTimeout(() => setAnimationStage(3), 1800) // Show content
            );
        };

        setupAnimation();

        return () => {
            timers.current.forEach(timer => clearTimeout(timer));
        };
    }, [state, navigate]);

    // Loading animation (stages 0-2)
    if (animationStage < 3) {
        return (
            <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-50">
                <div className="relative w-64 h-64">
                    {/* Background circle */}
                    <div className={`
                        absolute inset-0 bg-green-100 rounded-full 
                        transition-all duration-700 ease-in-out 
                        ${animationStage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                    `}></div>
                    
                    {/* Checkmark */}
                    <svg
                        className={`
                            absolute inset-0 w-full h-full text-green-500 
                            transition-opacity duration-300 
                            ${animationStage >= 2 ? 'opacity-100' : 'opacity-0'}
                        `}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                            style={{
                                strokeDasharray: 24,
                                strokeDashoffset: animationStage >= 2 ? 0 : 24,
                                transition: 'stroke-dashoffset 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
                            }}
                        />
                    </svg>
                    
                    {/* Pulsing effects */}
                    {animationStage >= 2 && (
                        <>
                            <div className="absolute inset-0 border-4 border-green-200 rounded-full animate-ping opacity-0"></div>
                            <div 
                                className="absolute inset-0 border-2 border-green-300 rounded-full opacity-0 animate-ping" 
                                style={{ animationDelay: '0.3s' }}
                            ></div>
                        </>
                    )}
                </div>
            </div>
        );
    }

    // Main content
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Success Header */}
                <div className="text-center mb-10 animate-fade-in">
                    <div className="relative mx-auto w-24 h-24 mb-6">
                        <div className="absolute inset-0 bg-green-100 rounded-full"></div>
                        <svg
                            className="absolute inset-0 w-full h-full text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">
                        Order Placed Successfully!
                    </h1>
                    <p className="text-lg text-gray-600">
                        Your payment was processed. Your Order is confirmed.
                    </p>
                </div>

                {/* Order Summary
                <div className="bg-white shadow rounded-lg overflow-hidden mb-8 animate-fade-in-up delay-100">
                    <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-lg font-medium text-gray-900 flex items-center">
                            <ShoppingBag className="mr-2 h-5 w-5 text-blue-500" />
                            Order Summary
                        </h2>
                    </div>
                    <div className="px-6 py-5 divide-y divide-gray-200">
                        <div className="flex justify-between py-3">
                            <span className="text-gray-600">Order Number</span>
                            <span className="font-medium text-gray-900">#{state?.orderId || '123456'}</span>
                        </div>
                        <div className="flex justify-between py-3">
                            <span className="text-gray-600">Date</span>
                            <span className="font-medium text-gray-900">
                                {new Date().toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                        <div className="flex justify-between py-3">
                            <span className="text-gray-600">Total Paid</span>
                            <span className="font-medium text-gray-900">${state?.amount}</span>
                        </div>
                        <div className="flex justify-between py-3">
                            <span className="text-gray-600">Payment Method</span>
                            <span className="font-medium text-gray-900">{state?.paymentMethod || 'Credit Card'}</span>
                        </div>
                    </div>
                </div> */}

                {/* Next Steps */}
                <div className="bg-white shadow rounded-lg overflow-hidden mb-8 animate-fade-in-up delay-200">
                    <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-lg font-medium text-gray-900">What's Next?</h2>
                    </div>
                    <div className="px-6 py-5 grid gap-4 sm:grid-cols-2">
                        <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="bg-blue-100 p-2 rounded-full mr-4">
                                <Mail className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Email Confirmation</h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    We've sent the receipt to {state?.email || 'your email'}.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="bg-blue-100 p-2 rounded-full mr-4">
                                <Download className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Download Your Files</h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    Access your purchases in your account.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-300">
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        <Home className="mr-2 h-5 w-5" />
                        Return Home
                    </button>
                    <button
                        onClick={() => navigate('/account/orders')}
                        className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        View Your Orders
                    </button>
                </div>

                {/* Support Info */}
                <div className="mt-12 text-center text-sm text-gray-500 animate-fade-in-up delay-400">
                    <p>Need help? <a href="mailto:support@yourcompany.com" className="text-blue-600 hover:underline">Contact our support team</a></p>
                    <p className="mt-1">We're here to help with any questions about your order.</p>
                </div>
            </div>

            {/* Animation styles */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.6s ease-out forwards;
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
                .delay-100 {
                    animation-delay: 0.1s;
                }
                .delay-200 {
                    animation-delay: 0.2s;
                }
                .delay-300 {
                    animation-delay: 0.3s;
                }
                .delay-400 {
                    animation-delay: 0.4s;
                }
            `}</style>
        </div>
    );
};

export default ThankYouPage;