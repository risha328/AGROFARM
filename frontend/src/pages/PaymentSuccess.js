import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            const res = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(state)
            });
            const data = await res.json();
            if (data.success) {
                navigate('/thank-you');
            } else {
                alert('Payment Verification Failed!');
                navigate('/');
            }
        };

        if (state) verify();
    }, [state]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <p className="text-green-700 text-xl">Verifying payment...</p>
        </div>
    );
};

export default PaymentSuccess;
