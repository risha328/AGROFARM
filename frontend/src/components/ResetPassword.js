import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { motion } from "framer-motion";
import { GiPlantSeed } from "react-icons/gi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        setIsLoading(true);
        
        try {
            const res = await fetch(SummaryApi.resetPassword.url, {
                method: SummaryApi.resetPassword.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password })
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

                <h2 className='text-2xl font-bold text-center text-green-800 mb-6'>Reset Password</h2>
                <p className='text-sm text-gray-600 text-center mb-6'>
                    Enter your new password below.
                </p>

                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div>
                        <label className='text-sm font-medium text-green-800'>New Password</label>
                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter new password'
                                className='mt-1 block w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none p-3 bg-green-50 pr-10 transition'
                                required
                            />
                            <span 
                                className='absolute right-3 top-3 cursor-pointer text-green-600' 
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className='text-sm font-medium text-green-800'>Confirm New Password</label>
                        <div className='relative'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder='Confirm new password'
                                className='mt-1 block w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none p-3 bg-green-50 pr-10 transition'
                                required
                            />
                            <span 
                                className='absolute right-3 top-3 cursor-pointer text-green-600' 
                                onClick={() => setShowConfirmPassword(prev => !prev)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    <button 
                        type='submit'
                        disabled={isLoading}
                        className={`w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition-transform hover:scale-105 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>

                <p className='mt-4 text-center text-sm'>
                    <Link to="/login" className='text-green-600 hover:underline'>Back to Login</Link>
                </p>
            </motion.div>
        </section>
    );
};

export default ResetPassword;