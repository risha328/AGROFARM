import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { motion } from "framer-motion";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validCode, setValidCode] = useState(false);
    const [email, setEmail] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { verifyResetCode, confirmReset } = useAuth();

    useEffect(() => {
        const verifyCode = async () => {
            const code = searchParams.get('oobCode');
            if (code) {
                const email = await verifyResetCode(code);
                if (email) {
                    setValidCode(true);
                    setEmail(email);
                } else {
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
        };

        verifyCode();
    }, [searchParams, verifyResetCode, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        const code = searchParams.get('oobCode');
        const success = await confirmReset(code, newPassword);
        if (success) {
            navigate('/login');
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
                {validCode ? (
                    <>
                        <h2 className='text-center text-2xl font-bold text-green-700 mb-4'>Reset Password</h2>
                        <p className='text-sm text-gray-600 mb-4'>Enter a new password for {email}</p>
                        
                        <form className='space-y-4' onSubmit={handleSubmit}>
                            <div>
                                <label className='text-sm font-medium text-green-800'>New Password</label>
                                <input
                                    type='password'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder='Enter new password'
                                    className='mt-1 block w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none p-3 bg-green-50 transition'
                                    required
                                    minLength={6}
                                />
                            </div>
                            
                            <div>
                                <label className='text-sm font-medium text-green-800'>Confirm Password</label>
                                <input
                                    type='password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder='Confirm new password'
                                    className='mt-1 block w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none p-3 bg-green-50 transition'
                                    required
                                    minLength={6}
                                />
                            </div>
                            
                            <button
                                type='submit'
                                className='w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition-transform hover:scale-105'
                            >
                                Reset Password
                            </button>
                        </form>
                    </>
                ) : (
                    <p className='text-center text-gray-600'>Verifying reset link...</p>
                )}
            </motion.div>
        </section>
    );
};

export default ResetPassword;