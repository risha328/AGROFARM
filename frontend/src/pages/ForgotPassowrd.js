import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from "framer-motion";
import { GiPlantSeed } from "react-icons/gi";
import SummaryApi from '../common';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!email) {
            return toast.error("Email is required");
        }

        setIsLoading(true);
        
        try {
            const response = await fetch(SummaryApi.forgotPassword.url, {
                method: SummaryApi.forgotPassword.method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const responseData = await response.json();

            if(responseData.success) {
                toast.success(responseData.message);
                navigate('/login');
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className='min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100'>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='bg-white rounded-2xl shadow-xl p-8 w-full max-w-md'
            >
                {/* Animated Logo */}
                <div className='flex justify-center mb-4'>
                    <motion.div
                        animate={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className='text-green-600 text-5xl'
                    >
                        <GiPlantSeed />
                    </motion.div>
                </div>

                <h2 className='text-2xl font-bold text-center text-green-800 mb-2'>Forgot Password</h2>
                <p className='text-sm text-gray-600 text-center mb-6'>
                    Enter your email to receive a password reset link
                </p>

                <form className='space-y-4' onSubmit={handleSubmit}>
                    {/* Email */}
                    <div>
                        <label className='text-sm font-medium text-green-800'>Email Address</label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your email'
                            className='mt-1 block w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none p-3 bg-green-50 transition'
                            required
                        />
                    </div>

                    <button 
                        type='submit'
                        disabled={isLoading}
                        className={`w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition-transform hover:scale-105 flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </>
                        ) : 'Send Reset Link'}
                    </button>
                </form>

                <div className='mt-4 text-center text-sm'>
                    <p className='text-gray-600'>Remember your password? <Link to="/login" className='text-green-600 hover:underline font-medium'>Login here</Link></p>
                </div>
            </motion.div>
        </section>
    );
};

export default ForgotPassword;