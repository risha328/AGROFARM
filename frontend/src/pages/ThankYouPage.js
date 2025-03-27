import React from 'react';
import { Link } from 'react-router-dom';

const ThankYouPage = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen space-y-4 bg-green-50">
            <h2 className="text-3xl font-bold text-green-700">Thank You!</h2>
            <p className="text-green-600">Your payment was successful.</p>
            <Link to="/" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Back to Home</Link>
        </div>
    );
};

export default ThankYouPage;
