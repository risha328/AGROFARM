import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaUserCircle, FaUserCog, FaBoxOpen, FaHeart, FaSignOutAlt, FaBandAid, FaAddressCard } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const UserPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?._id) {
            navigate("/");
        }
    }, [user]);

    return (
        <div className='min-h-[calc(100vh-120px)] flex flex-col md:flex-row bg-gray-50'>
            {/* Sidebar */}
            <aside className='bg-white min-h-full w-full md:w-64 lg:w-72 shadow-lg'>
                {/* User Profile Section */}
                <div className='h-48 flex flex-col justify-center items-center p-4 border-b border-gray-100'>
                    <div className='relative mb-4'>
                        {user?.profilePic ? (
                            <img 
                                src={user?.profilePic} 
                                className='w-20 h-20 rounded-full object-cover border-4 border-green-100 shadow-md' 
                                alt={user?.name} 
                            />
                        ) : (
                            <div className='w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600'>
                                <FaUserCircle size={32} />
                            </div>
                        )}
                    </div>
                    <p className='capitalize text-lg font-semibold text-gray-800'>{user?.name}</p>
                    <p className='text-sm text-gray-500 uppercase tracking-wider'>{user?.role}</p>
                </div>

                {/* Navigation */}
                <nav className='p-4 space-y-2'>
                    <Link 
                        to={"account/profile"} 
                        className='flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all'
                    >
                        <FaUserCog className="mr-3 text-green-500" />
                        <span>Profile Settings</span>
                    </Link>
                    
                    <Link 
                        to={"orders"} 
                        className='flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all'
                    >
                        <FaBoxOpen className="mr-3 text-green-500" />
                        <span>My Orders</span>
                    </Link>
                    
                    <Link 
                        to={"sellyourproduct"} 
                        className='flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all'
                    >
                        <FaAddressCard className="mr-3 text-green-500" />
                        <span>Sell Your Product</span>
                    </Link>

                    <Link 
                        to={"wishlist"} 
                        className='flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all'
                    >
                        <FaHeart className="mr-3 text-green-500" />
                        <span>Wishlist</span>
                    </Link>

                    {user?.role === ROLE.ADMIN && (
                        <Link 
                            to={"/admin-panel"} 
                            className='flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all'
                        >
                            <MdDashboard className="mr-3 text-green-500" />
                            <span>Admin Dashboard</span>
                        </Link>
                    )}

                    <button 
                        onClick={() => {
                            // Add logout logic here
                            navigate("/logout");
                        }}
                        className='w-full flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all mt-8'
                    >
                        <FaSignOutAlt className="mr-3 text-red-500" />
                        <span>Sign Out</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className='flex-1 p-4 md:p-6 lg:p-8'>
                <div className='bg-white rounded-xl shadow-sm p-4 md:p-6 min-h-full'>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default UserPanel;