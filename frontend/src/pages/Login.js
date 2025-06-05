// import React, { useContext, useState } from 'react';
// import { FaEye, FaEyeSlash,FaGoogle } from "react-icons/fa";
// import { Link, useNavigate } from 'react-router-dom';
// import SummaryApi from '../common';
// import { toast } from 'react-toastify';
// import Context from '../context';
// import { motion } from "framer-motion";
// import { GiPlantSeed } from "react-icons/gi";


// const Login = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const [data, setData] = useState({ email: "", password: "" });
//     const navigate = useNavigate();
//     const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

//     const handleOnChange = (e) => {
//         const { name, value } = e.target;
//         setData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const dataResponse = await fetch(SummaryApi.signIn.url, {
//             method: SummaryApi.signIn.method,
//             credentials: 'include',
//             headers: { "content-type": "application/json" },
//             body: JSON.stringify(data)
//         });

//         const dataApi = await dataResponse.json();
//         if (dataApi.success) {
//             toast.success(dataApi.message);
//             navigate('/');
//             fetchUserDetails();
//             fetchUserAddToCart();
//         }
//         if (dataApi.error) {
//             toast.error(dataApi.message);
//         }
//     };


//     return (
//         <section className='min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100'>
//             <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className='bg-white rounded-2xl shadow-xl p-8 w-full max-w-md'
//             >
//                 {/* Animated Logo */}
//                 <div className='flex justify-center mb-4'>
//                     <motion.div
//                         animate={{ rotate: [0, -10, 10, -10, 0] }}
//                         transition={{ repeat: Infinity, duration: 4 }}
//                         className='text-green-600 text-5xl'
//                     >
//                         <GiPlantSeed />
//                     </motion.div>
//                 </div>

//                 <h2 className='text-center text-2xl font-bold text-green-700 mb-4'>Welcome Back Farmer</h2>

//                 <form className='space-y-4' onSubmit={handleSubmit}>
//                     {/* Email */}
//                     <div>
//                         <label className='text-sm font-medium text-green-800'>Email</label>
//                         <input
//                             type='email'
//                             name='email'
//                             value={data.email}
//                             onChange={handleOnChange}
//                             placeholder='Enter your email'
//                             className='mt-1 block w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none p-3 bg-green-50 transition'
//                             required
//                         />
//                     </div>

//                     {/* Password */}
//                     <div>
//                         <label className='text-sm font-medium text-green-800'>Password</label>
//                         <div className='relative'>
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 name='password'
//                                 value={data.password}
//                                 onChange={handleOnChange}
//                                 placeholder='Enter your password'
//                                 className='mt-1 block w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none p-3 bg-green-50 pr-10 transition'
//                                 required
//                             />
//                             <span className='absolute right-3 top-3 cursor-pointer text-green-600' onClick={() => setShowPassword(prev => !prev)}>
//                                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//                             </span>
//                         </div>
//                         <Link to={'/forgot-password'} className='block w-fit ml-auto text-sm text-green-600 hover:underline mt-1'>
//                             Forgot Password?
//                         </Link>
//                     </div>

//                     <button className='w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition-transform hover:scale-105'>
//                         Login
//                     </button>
//                 </form>


//                 {/* Divider */}
//                 <div className='flex items-center my-4'>
//                     <div className='flex-1 border-t border-gray-300'></div>
//                     <span className='px-3 text-gray-500 text-sm'>OR</span>
//                     <div className='flex-1 border-t border-gray-300'></div>
//                 </div>

//                 {/* Google Login Button */}
//                 <button 
                    
//                     className='w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-full hover:bg-gray-50 transition-transform hover:scale-105 flex items-center justify-center gap-2'
//                 >
//                     <FaGoogle className='text-green-500' />
//                     Continue with Google
//                 </button>

//                 <p className='mt-4 text-center text-sm'>
//                     Don't have an account? <Link to={"/sign-up"} className='text-green-600 hover:underline'>Sign Up</Link>
//                 </p>
//             </motion.div>
//         </section>
//     );
// };

// export default Login;


// import React, { useContext, useState } from 'react';
// import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import Context from '../context';
// import { motion } from "framer-motion";
// import { GiPlantSeed } from "react-icons/gi";

// Firebase imports
import React, { useContext, useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Context from '../context';
import { motion } from "framer-motion";
import { GiPlantSeed } from "react-icons/gi";

// Firebase imports
import { auth, googleProvider } from '../firebase'; // Ensure correct import path
import { signInWithPopup } from "firebase/auth";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({ email: "", password: "" });
    const [userInitial, setUserInitial] = useState(null); // Store the user's initial
    const navigate = useNavigate();
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const backendResponse = await fetch(`${process.env.REACT_APP_SERVER}/api/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        });

        const dataApi = await backendResponse.json();

        if (dataApi.success) {
            toast.success(dataApi.message);

            // ✅ Extract user's first name (assuming backend sends user data)
            const firstName = dataApi.user?.firstName || data.email;

            // ✅ Set initial letter
            setUserInitial(firstName.charAt(0).toUpperCase());

            navigate('/');
            fetchUserDetails();
            fetchUserAddToCart();
        } else if (dataApi.error) {
            toast.error(dataApi.message);
        }
    } catch (error) {
        console.error('Login Error:', error);
        toast.error('Something went wrong, please try again later.');
    }
};


    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Extract first letter of the user's display name or email
            const firstName = user.displayName ? user.displayName.split(' ')[0] : user.email;
            setUserInitial(firstName.charAt(0).toUpperCase()); // Set the initial letter

            console.log(user); // For debugging purposes
            toast.success("Login successful with Google!");
            navigate('/');
            fetchUserDetails();
            fetchUserAddToCart();
        } catch (error) {
            console.error('Google Login Error:', error.message);
            toast.error('Something went wrong with Google login, please try again.');
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
                

                <h2 className='text-center text-2xl font-bold text-green-700 mb-4'>Welcome To AGROFARM!!!</h2>

                <form className='space-y-4' onSubmit={handleSubmit}>
                    {/* Email */}
                    <div>
                        <label className='text-sm font-medium text-green-800'>Email</label>
                        <input
                            type='email'
                            name='email'
                            value={data.email}
                            onChange={handleOnChange}
                            placeholder='Enter your email'
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
                                placeholder='Enter your password'
                                className='mt-1 block w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none p-3 bg-green-50 pr-10 transition'
                                required
                            />
                            <span className='absolute right-3 top-3 cursor-pointer text-green-600' onClick={() => setShowPassword(prev => !prev)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <Link to={'/forgot-password'} className='block w-fit ml-auto text-sm text-green-600 hover:underline mt-1'>
                            Forgot Password?
                        </Link>
                    </div>

                    <button className='w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition-transform hover:scale-105'>
                        Login
                    </button>
                </form>

                {/* Divider */}
                <div className='flex items-center my-4'>
                    <div className='flex-1 border-t border-gray-300'></div>
                    <span className='px-3 text-gray-500 text-sm'>OR</span>
                    <div className='flex-1 border-t border-gray-300'></div>
                </div>

                {/* Google Login Button */}
                <button
                    onClick={handleGoogleLogin}
                    className='w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-full hover:bg-gray-50 transition-transform hover:scale-105 flex items-center justify-center gap-2'
                >
                    {userInitial ? (
                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                            {userInitial}
                        </div>
                    ) : (
                        <FaGoogle className='text-green-500' />
                    )}
                    Continue with Google
                </button>

                <p className='mt-4 text-center text-sm'>
                    Don't have an account? <Link to={"/sign-up"} className='text-green-600 hover:underline'>Sign Up</Link>
                </p>
            </motion.div>
        </section>
    );
};

export default Login;


