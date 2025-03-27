import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { motion } from "framer-motion";
import { GiPlantSeed } from "react-icons/gi";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        profilePic: "",
    });
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleUploadPic = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const imagePic = await imageTobase64(file);
            setData(prev => ({ ...prev, profilePic: imagePic }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.password !== data.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {
            const res = await fetch(SummaryApi.signUP.url, {
                method: SummaryApi.signUP.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const resData = await res.json();

            if (resData.success) {
                toast.success(resData.message);
                navigate("/login");
            } else {
                toast.error(resData.message);
            }
        } catch (error) {
            toast.error("Something went wrong!");
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

                {/* Farmer ID (Profile Pic) Upload */}
                <div className='flex flex-col items-center'>
                    <div className='relative w-24 h-24 rounded-full overflow-hidden border-4 border-green-500 shadow-md'>
                        <img src={data.profilePic || "https://via.placeholder.com/150x150.png?text=Farmer+ID"} alt='Farmer ID' className='object-cover w-full h-full' />
                        <label className='absolute bottom-0 left-0 right-0 bg-green-600 bg-opacity-80 text-white text-xs py-1 cursor-pointer text-center rounded-b-full'>
                            Upload Farmer ID
                            <input type='file' accept='image/*' className='hidden' onChange={handleUploadPic} />
                        </label>
                    </div>
                </div>

                {/* Form */}
                <form className='pt-6 space-y-4' onSubmit={handleSubmit}>
                    {/* Name */}
                    <div>
                        <label className='text-sm font-medium text-green-800'>Name</label>
                        <input
                            type='text'
                            name='name'
                            value={data.name}
                            onChange={handleOnChange}
                            placeholder='Enter your name'
                            className='mt-1 block w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none p-3 bg-green-50 transition'
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className='text-sm font-medium text-green-800'>Email</label>
                        <input
                            type='email'
                            name='email'
                            value={data.email}
                            onChange={handleOnChange}
                            placeholder='Enter email'
                            className='mt-1 block w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none p-3 bg-green-50 transition'
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className='text-sm font-medium text-green-800'>Password</label>
                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                name='password'
                                value={data.password}
                                onChange={handleOnChange}
                                placeholder='Enter password'
                                className='mt-1 block w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none p-3 bg-green-50 pr-10 transition'
                                required
                            />
                            <span className='absolute right-3 top-3 cursor-pointer text-green-600' onClick={() => setShowPassword(prev => !prev)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className='text-sm font-medium text-green-800'>Confirm Password</label>
                        <div className='relative'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleOnChange}
                                placeholder='Confirm password'
                                className='mt-1 block w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none p-3 bg-green-50 pr-10 transition'
                                required
                            />
                            <span className='absolute right-3 top-3 cursor-pointer text-green-600' onClick={() => setShowConfirmPassword(prev => !prev)}>
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    <button className='w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition-transform hover:scale-105'>
                        Sign Up
                    </button>
                </form>

                <p className='mt-4 text-center text-sm'>
                    Already have an account? <Link to={"/login"} className='text-green-600 hover:underline'>Login</Link>
                </p>
            </motion.div>
        </section>
    );
};

export default SignUp;

