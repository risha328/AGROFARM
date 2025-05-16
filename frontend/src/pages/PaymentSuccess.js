import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Loader2 } from 'lucide-react'; // Using Lucide icons (or you can use other icon libraries)

const PaymentSuccess = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const verifyPayment = async () => {
            if (!state) {
                setStatus('error');
                setErrorMessage('Missing payment information');
                return;
            }

            try {
                const res = await fetch('/api/verify-payment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(state)
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                
                if (data.success) {
                    setStatus('success');
                    // Redirect after a short delay to show success message
                    setTimeout(() => navigate('/thank-you'), 2000);
                } else {
                    setStatus('error');
                    setErrorMessage(data.message || 'Payment verification failed');
                }
            } catch (error) {
                setStatus('error');
                setErrorMessage(error.message || 'An error occurred during verification');
                console.error('Verification error:', error);
            }
        };

        verifyPayment();
    }, [state, navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8 text-center">
                {status === 'verifying' && (
                    <div className="space-y-4">
                        <div className="flex justify-center">
                            <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-800">Verifying Your Payment</h1>
                        <p className="text-gray-600">Please wait while we confirm your transaction...</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="space-y-4">
                        <div className="flex justify-center">
                            <CheckCircle className="h-12 w-12 text-green-500" />
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-800">Payment Successful!</h1>
                        <p className="text-gray-600">Thank you for your purchase. You'll be redirected shortly.</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                            <div className="bg-green-500 h-2.5 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div className="space-y-4">
                        <div className="flex justify-center">
                            <svg className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-800">Verification Failed</h1>
                        <p className="text-gray-600">{errorMessage}</p>
                        <button
                            onClick={() => navigate('/')}
                            className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Return to Home
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
                <p>Having trouble? <a href="mailto:support@yourcompany.com" className="text-blue-600 hover:underline">Contact support</a></p>
                <p className="mt-1">Order reference: {state?.orderId || 'N/A'}</p>
            </div>
        </div>
    );
};

export default PaymentSuccess;


// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import SummaryApi from '../common'; // adjust path if needed

// const PaymentSuccess = () => {
//     const { state } = useLocation();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const verifyAndPlaceOrder = async () => {
//             try {
//                 if (!state || !state.totalAmount || !state.userId || !state.items) {
//                     alert("Missing payment details. Please return to cart.");
//                     navigate('/');
//                     return;
//                 }

//                 const res = await fetch(SummaryApi.verifyPayment.url, {
//                     method: SummaryApi.verifyPayment.method,
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({
//                         razorpay_order_id: state.paymentInfo?.razorpay_order_id,
//                         razorpay_payment_id: state.paymentInfo?.razorpay_payment_id,
//                         razorpay_signature: state.paymentInfo?.razorpay_signature
//                     })
//                 });

//                 const data = await res.json();

//                 if (data.success) {
//                     const orderRes = await fetch(SummaryApi.placeOrder.url, {
//                         method: SummaryApi.placeOrder.method,
//                         headers: { 'Content-Type': 'application/json' },
//                         body: JSON.stringify({
//                             userId: state.userId,
//                             items: state.items,
//                             totalAmount: state.totalAmount,
//                             shippingAddress: state.shippingAddress,
//                             paymentInfo: state.paymentInfo,
//                             isPaid: true,
//                             paidAt: new Date()
//                         })
//                     });

//                     const orderData = await orderRes.json();

//                     if (orderData._id) {
//                         navigate('/thank-you');
//                     } else {
//                         alert('Order placement failed!');
//                         navigate('/');
//                     }
//                 } else {
//                     alert('Payment verification failed!');
//                     navigate('/');
//                 }
//             } catch (error) {
//                 console.error('Error during payment verification or order placement:', error);
//                 alert('An error occurred. Please try again.');
//                 navigate('/');
//             }
//         };

//         verifyAndPlaceOrder();
//     }, [state, navigate]);

//     return (
//         <div className="flex justify-center items-center min-h-screen">
//             <p className="text-green-700 text-xl">Verifying payment and placing order...</p>
//         </div>
//     );
// };

// export default PaymentSuccess;
