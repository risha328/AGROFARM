import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa"
import { FiChevronDown } from "react-icons/fi"
import { FaRegCircleUser } from "react-icons/fa6"
import { GrSearch } from "react-icons/gr"
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

import SummaryApi from '../common'
import { setUserDetails } from '../store/userSlice'
import ROLE from '../common/role'
import Context from '../context'

const Header = () => {
    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const context = useContext(Context)
    const [isOpen, setIsOpen] = useState(false)
    const [productDropdown, setProductDropdown] = useState(false)
    const [menuDisplay, setMenuDisplay] = useState(false)

    const searchInput = useLocation()
    const URLSearch = new URLSearchParams(searchInput?.search)
    const searchQuery = URLSearch.get("q") || ""
    const [search, setSearch] = useState(searchQuery)

    const toggleMenu = () => setIsOpen(!isOpen)

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: 'include'
        })
        const data = await fetchData.json()

        if (data.success) {
            toast.success(data.message)
            dispatch(setUserDetails(null))
            navigate("/")
        } else {
            toast.error(data.message)
        }
    }

    const handleSearch = (e) => {
        const { value } = e.target
        setSearch(value)

        if (value) {
            navigate(`/search?q=${value}`)
        } else {
            navigate("/search")
        }
    }

    const handleSellClick = () => {
        if (user?._id) {
            navigate('/sell-product')
        } else {
            toast.info('Please login to sell products')
            navigate('/login')
        }
    }

    return (
        <header className="bg-green-800 text-white shadow-lg fixed top-0 w-full z-50">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center flex-shrink-0">
                    <Link
                        to="/"
                        className="flex items-center gap-3 hover:opacity-90 transition-opacity"
                    >
                        <img
                            src="/assets/logos/logo.jpg"
                            alt="AgroFarm Logo"
                            className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-md"
                        />
                        <span className="text-xl font-bold tracking-tight hidden sm:block">
                            AGROFARM
                        </span>
                    </Link>
                </div>

                {/* Search Bar - Centered */}
                <div className="hidden lg:flex flex-1 max-w-xl mx-8">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full py-2 px-4 pr-10 rounded-full text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={search}
                            onChange={handleSearch}
                        />
                        <button
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-full transition-colors"
                            aria-label="Search"
                        >
                            <GrSearch className="text-sm" />
                        </button>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    <div className="flex items-center space-x-6">
                        <Link
                            to="/"
                            className="text-sm font-medium hover:text-green-200 transition-colors"
                        >
                            Home
                        </Link>

                        {/* Products Dropdown */}
                        <div className="relative group">
                            <button className="text-sm font-medium hover:text-green-200 transition-colors flex items-center">
                                Products <FiChevronDown className="ml-1" />
                            </button>
                            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 invisible group-hover:visible">
                                {["Fruits", "Flowers", "Vegetables", "Seeds","Plant Growth Promoters","Insecticides","Fertilizers", "Animal Husbandry Products", "Tools & Equipment", "Organic & Specialty Items", "Machinaries"].map((item) => (
                                    <Link
                                        key={item}
                                        to={`/products/${item.toLowerCase()}`}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Link
                            to="/prime"
                            className="text-sm font-medium hover:text-green-200 transition-colors"
                        >
                            AgroPrime
                        </Link>

                        <Link
                            to="/aboutus"
                            className="text-sm font-medium hover:text-green-200 transition-colors"
                        >
                            About
                        </Link>

                        <Link
                            to="/contactus"
                            className="text-sm font-medium hover:text-green-200 transition-colors"
                        >
                            Contact
                        </Link>

                        <Link
                            to="/blog"
                            className="text-sm font-medium hover:text-green-200 transition-colors"
                        >
                            Blog
                        </Link>
                    </div>

                    {/* Sell Button */}
                  
<Link
  to={user?._id ? "/add-product" : "/login"}
  onClick={(e) => {
    if (!user?._id) {
      e.preventDefault();
      toast.info('Please login to sell products');
      navigate('/login');
    }
  }}
  className="ml-4"
>
  <button
    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md text-sm transition-all duration-300 flex items-center gap-1 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
  >
    <span className="hidden sm:inline">SELL</span>
    <span className="sm:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
    </span>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 hidden sm:inline" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
  </button>
</Link>

                    {/* Cart Icon */}
                    {user?._id && (
                        <div className="relative ml-4">
                            <Link to="/cart" className="flex items-center">
                                <FaShoppingCart className="text-xl hover:text-green-200 transition-colors" />
                                {context?.cartProductCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                        {context?.cartProductCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    )}

                    {/* User Menu */}
                    <div className="relative ml-4">
                        {user?._id ? (
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setMenuDisplay(!menuDisplay)}
                                    className="focus:outline-none relative"
                                >
                                    {/* User Avatar with Initial */}
                                    {user?.profilePic ? (
                                        <img
                                            src={user.profilePic}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full object-cover border-2 border-white"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold border-2 border-white">
                                            {user.firstName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </button>

                                {/* Dropdown Menu */}
                               {/* Dropdown Menu */}
{menuDisplay && (
  <div className="absolute right-0 mt-2 min-w-40 max-w-xs bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-200">
    {user?.role === ROLE.ADMIN && (
      <Link
        to="/admin-panel"
        className="block px-5 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors rounded-md"
        onClick={() => setMenuDisplay(false)}
      >
        Admin Panel
      </Link>
    )}
    <Link
      to="/profile"
      className="block px-5 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors rounded-md"
      onClick={() => setMenuDisplay(false)}
    >
      My Profile
    </Link>
    <button
      onClick={() => {
        handleLogout();
        setMenuDisplay(false);
      }}
      className="block w-full text-left px-5 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-md"
    >
      Logout
    </button>
  </div>
)}

                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-sm font-medium transition-colors"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden ml-4">
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <FaTimes className="text-2xl" />
                        ) : (
                            <FaBars className="text-2xl" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Content */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden bg-green-700 overflow-hidden"
                >
                    <div className="px-4 py-3 space-y-4">
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full py-2 px-4 pr-10 rounded-full text-sm text-gray-800 focus:outline-none"
                                value={search}
                                onChange={handleSearch}
                            />
                            <button
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600"
                                aria-label="Search"
                            >
                                <GrSearch className="text-sm" />
                            </button>
                        </div>

                        <Link
                            to="/"
                            onClick={toggleMenu}
                            className="block py-2 font-medium hover:text-green-200 transition-colors"
                        >
                            Home
                        </Link>

                        <div className="py-2">
                            <span className="block font-medium mb-2">Products</span>
                            <div className="pl-4 space-y-2">
                                {["Fruits", "Vegetables", "Fertilizers"].map((item) => (
                                    <Link
                                        key={item}
                                        to={`/products/${item.toLowerCase()}`}
                                        onClick={toggleMenu}
                                        className="block py-1 text-sm hover:text-green-200 transition-colors"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Link
                            to="/prime"
                            onClick={toggleMenu}
                            className="block py-2 font-medium hover:text-green-200 transition-colors"
                        >
                            AgroPrime
                        </Link>

                        <Link
                            to="/aboutus"
                            onClick={toggleMenu}
                            className="block py-2 font-medium hover:text-green-200 transition-colors"
                        >
                            About
                        </Link>

                        <Link
                            to="/contactus"
                            onClick={toggleMenu}
                            className="block py-2 font-medium hover:text-green-200 transition-colors"
                        >
                            Contact
                        </Link>

                        <Link
                            to="/blog"
                            onClick={toggleMenu}
                            className="block py-2 font-medium hover:text-green-200 transition-colors"
                        >
                            Blog
                        </Link>

                        {/* Mobile Sell Button */}
                        <button
                            onClick={() => {
                                handleSellClick();
                                toggleMenu();
                            }}
                            className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md text-sm transition-colors text-center"
                        >
                            SELL
                        </button>

                        {user?._id ? (
                            <div className="pt-4 border-t border-green-600">
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left py-2 text-red-300 hover:text-red-200 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                onClick={toggleMenu}
                                className="block mt-4 py-2 px-4 rounded-md bg-green-600 hover:bg-green-700 text-center font-medium transition-colors"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </motion.div>
            )}
        </header>
    )
}

export default Header


