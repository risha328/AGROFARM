import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa"
import { GiFarmTractor } from "react-icons/gi"
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
    const toggleProductDropdown = () => setProductDropdown(!productDropdown)

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
        navigate(value ? `/search?q=${value}` : "/search")
    }

    return (
        <header className="bg-green-800 text-white shadow-lg fixed top-0 w-full z-50">
    <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <motion.div animate={{ rotate: [0, -5, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
                <GiFarmTractor className="text-3xl" />
            </motion.div>
            <span>AGROFARM</span>
        </Link>

        {/* Search Bar - Visible on large screens */}
        <div className="hidden lg:flex items-center w-full max-w-md border border-green-500 rounded-full bg-green-600 px-3">
            <input type="text" placeholder="Search products..." className="w-full bg-transparent py-2 text-white outline-none" />
            <GrSearch className="text-xl text-white cursor-pointer" />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-green-300">Home</Link>

            {/* Products Dropdown */}
            <div className="relative group">
                <span className="hover:text-green-300 cursor-pointer">Products ▾</span>
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full hidden group-hover:block bg-white text-green-700 rounded-lg shadow-lg py-2 min-w-[12rem] z-50">
                    {["Fruits", "Vegetables", "Fertilizers"].map((item) => (
                        <Link key={item} to={`/products/${item.toLowerCase()}`} className="block px-4 py-2 hover:bg-green-100">{item}</Link>
                    ))}
                </div>
            </div>

            <Link to="/aboutus" className="hover:text-green-300">About</Link>
            <Link to="/contactus" className="hover:text-green-300">Contact</Link>
            <Link to="/blog" className="hover:text-green-300">Blog</Link>

            {/* Cart */}
            {user?._id && (
                <Link to="/cart" className="relative text-2xl">
                    <FaShoppingCart />
                    {context?.cartProductCount > 0 && (
                        <div className="absolute -top-2 -right-3 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                            {context?.cartProductCount}
                        </div>
                    )}
                </Link>
            )}

            {/* User Dropdown */}
            <div className="relative">
                {user?._id ? (
                    <div onClick={() => setMenuDisplay(!menuDisplay)} className="text-2xl cursor-pointer">
                        {user?.profilePic ? <img src={user?.profilePic} alt="profile" className="w-8 h-8 rounded-full" /> : <FaRegCircleUser />}
                    </div>
                ) : (
                    <Link to="/login" className="px-4 py-1 rounded-full bg-green-600 hover:bg-green-700">Login</Link>
                )}

                {menuDisplay && (
                    <div className="absolute bg-white text-green-700 right-0 mt-2 shadow-lg rounded p-2 w-44">
                        {user?.role === ROLE.ADMIN && <Link to="/admin-panel" className="block px-4 py-2 hover:bg-green-100">Admin Panel</Link>}
                        {user?.role === ROLE.GENERAL && <Link to="/user-panel" className="block px-4 py-2 hover:bg-green-100">User Panel</Link>}
                        <button onClick={handleLogout} className="block text-left w-full text-red-600 hover:bg-red-100 px-4 py-2">Logout</button>
                    </div>
                )}
            </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
        </div>
    </div>

    {/* Mobile Menu */}
    {isOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} transition={{ duration: 0.4 }} className="md:hidden bg-green-700 px-6 py-4 space-y-3">
            <Link to="/" onClick={toggleMenu} className="block">Home</Link>
            <Link to="/about" onClick={toggleMenu} className="block">About</Link>
            <Link to="/contact" onClick={toggleMenu} className="block">Contact</Link>
            <Link to="/blog" onClick={toggleMenu} className="block">Blog</Link>
        </motion.div>
    )}
</header>

    )
}

export default Header


