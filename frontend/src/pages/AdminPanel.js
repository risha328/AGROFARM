import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaUsers, FaBoxOpen, FaChartLine, FaCog, FaSignOutAlt, FaUser, FaUserAlt } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

// Using placeholder logo - replace with your actual logo
const logo = "https://via.placeholder.com/150";

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        if(user?.role !== ROLE.ADMIN) {
            navigate("/");
        }
        // Set active link based on current route
        setActiveLink(window.location.pathname.split('/').pop());
    }, [user, navigate]);

    const handleLogout = () => {
        // Add your logout logic here
        console.log("Admin logged out");
        navigate('/login');
    };

    const navItems = [
       
        { path: "all-users", name: "User Management", icon: <FaUsers className="mr-3" /> },
        { path: "all-products", name: "Product Inventory", icon: <FaBoxOpen className="mr-3" /> },
        { path: "analytics", name: "Analytics", icon: <FaChartLine className="mr-3" /> },
        { path: "settings", name: "Settings", icon: <FaCog className="mr-3" /> },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-md transition-all duration-300 ease-in-out`}>
                <div className="flex items-center justify-between p-4 border-b">
                    {sidebarOpen ? (
                        <img src={logo} alt="Admin Logo" className="h-10" />
                    ) : (
                        <div className="w-10 h-10 flex items-center justify-center">
                            <img src={logo} alt="Admin Logo" className="h-8" />
                        </div>
                    )}
                    <button 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        {sidebarOpen ? '◀' : '▶'}
                    </button>
                </div>

                {/* Admin Profile */}
                <div className="p-4 border-b">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            {user?.profilePic ? (
                                <img 
                                    src={user?.profilePic} 
                                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-500" 
                                    alt={user?.name} 
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <FaRegCircleUser className="text-blue-500 text-xl" />
                                </div>
                            )}
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                        </div>
                        {sidebarOpen && (
                            <div>
                                <p className="font-semibold text-gray-800">{user?.name}</p>
                                <p className="text-xs text-gray-500 uppercase">{user?.role}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-2">
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link 
                                    to={item.path}
                                    onClick={() => setActiveLink(item.path)}
                                    className={`flex items-center p-3 rounded-lg mb-1 ${activeLink === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    {item.icon}
                                    {sidebarOpen && <span>{item.name}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Logout */}
                <div className="absolute bottom-0 w-full p-4">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center w-full p-3 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                        <FaSignOutAlt className="mr-3" />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {/* Header */}
                <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-gray-800">
                        {navItems.find(item => item.path === activeLink)?.name || 'Dashboard'}
                    </h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button className="text-gray-500 hover:text-gray-700">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;