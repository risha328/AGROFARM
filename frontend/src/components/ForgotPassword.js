import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { motion } from "framer-motion";
import { GiPlantSeed } from "react-icons/gi";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const res = await fetch(SummaryApi.forgotPassword.url, {
                method: SummaryApi.forgotPassword.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            const resData = await res.json();

            if (resData.success) {
                toast.success(resData.message);
                navigate('/login');
            } else {
                toast.error(resData.message);
            }
        } catch (error) {
            toast.error("Something went wrong!");
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
                <div className='flex justify-center mb-4'>
                    <motion.div
                        animate={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className='text-green-600 text-5xl'
                    >
                        <GiPlantSeed />
                    </motion.div>
                </div>

                <h2 className='text-2xl font-bold text-center text-green-800 mb-6'>Forgot Password</h2>
                <p className='text-sm text-gray-600 text-center mb-6'>
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div>
                        <label className='text-sm font-medium text-green-800'>Email</label>
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
                        className={`w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition-transform hover:scale-105 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                <p className='mt-4 text-center text-sm'>
                    Remember your password? <Link to="/login" className='text-green-600 hover:underline'>Login</Link>
                </p>
            </motion.div>
        </section>
    );
};

export default ForgotPassword;