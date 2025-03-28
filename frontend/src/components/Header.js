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
    const searchQuery = URLSearch.getAll("q")
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
        }
        if (data.error) {
            toast.error(data.message)
        }
    }

    const handleSearch = (e) => {
        const { value } = e.target
        setSearch(value)
        if (value) navigate(`/search?q=${value}`)
        else navigate("/search")
    }

    return (
        <header className="bg-green-800 text-white shadow-lg top-3 z-70">
            <div className="max-w-screen-xl mx-auto px-9 py-5 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white">
                    <motion.div animate={{ rotate: [0, -5, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
                        <GiFarmTractor className="text-3xl" />
                    </motion.div>
                    <span>AGROFARM</span>
                </Link>

                {/* Search */}
                <div className="hidden lg:flex items-center w-full max-w-md border border-green-500 rounded-full bg-green-600 focus-within:ring-2 ring-green-300 px-3 mx-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full outline-none bg-transparent py-2 text-white placeholder-white"
                        value={search}
                        onChange={handleSearch}
                    />
                    <GrSearch className="text-xl text-white" />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-[1rem]">

                    <Link to="/" className="hover:text-green-300">Home</Link>

                    {/* Product Dropdown */}
                    {/* Product Dropdown */}
<div className="relative group">
    <span className="hover:text-green-300 cursor-pointer">Products ▾</span>
    <div className="absolute top-full left-0 hidden group-hover:block bg-white text-green-700 rounded-lg shadow-lg py-2 min-w-[12rem] space-y-1 z-50 border border-green-300">
        <Link to="/products/fruits" className="block px-4 py-2 hover:bg-green-100">Fruits</Link>
        <Link to="/products/flowers" className="block px-4 py-2 hover:bg-green-100">Flowers</Link>
        <Link to="/products/vegetables" className="block px-4 py-2 hover:bg-green-100">Vegetables</Link>
        <Link to="/products/plantgrowthpromoters" className="block px-4 py-2 hover:bg-green-100">Plant Growth Promoters</Link>
        <Link to="/products/pesticides" className="block px-4 py-2 hover:bg-green-100">Insecticides & Pesticides</Link>
        <Link to="/products/fertilizers" className="block px-4 py-2 hover:bg-green-100">Fertilizers</Link>
        <Link to="/products/animals" className="block px-4 py-2 hover:bg-green-100">Animal Husbandry Products</Link>
        <Link to="/products/tools" className="block px-4 py-2 hover:bg-green-100">Tools</Link>
        <Link to="/products/organic" className="block px-4 py-2 hover:bg-green-100">Organic & Specialty Items</Link>
    </div>
</div>


                    <Link to="/about" className="hover:text-green-300">About</Link>
                    <Link to="/contact" className="hover:text-green-300">Contact</Link>
                    <Link to="/blog" className="hover:text-green-300">Blog</Link>

                    {/* Cart */}
                    {user?._id && (
                        <Link to="/cart" className="relative text-2xl">
                            <FaShoppingCart />
                            <div className="absolute -top-2 -right-3 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                                {context?.cartProductCount}
                            </div>
                        </Link>
                    )}

                    {/* User */}
                    <div className="relative">
                        {user?._id ? (
                            <div onClick={() => setMenuDisplay(!menuDisplay)} className="text-2xl cursor-pointer relative">
                                {user?.profilePic ? <img src={user?.profilePic} alt="profile" className="w-8 h-8 rounded-full" /> : <FaRegCircleUser />}
                            </div>
                        ) : (
                            <Link to="/login" className="px-4 py-1 rounded-full bg-green-600 hover:bg-green-800">Login</Link>
                        )}

                        {/* User Dropdown */}
                        {menuDisplay && (
                            <div className="absolute bg-white text-green-700 right-0 mt-2 shadow-lg rounded p-2 space-y-1 w-44">
                                {user?.role === ROLE.ADMIN && (<Link to="/admin-panel/all-products" className="block hover:bg-green-100">Admin Panel</Link>)}
                                {user?.role === ROLE.GENERAL && (<Link to="/user-panel" className="block hover:bg-green-100">User Panel</Link>)}
                                <button onClick={handleLogout} className="block text-left w-full hover:bg-red-100 text-red-600">Logout</button>
                            </div>
                        )}
                    </div>

                </nav>

                {/* Mobile Toggle */}
                <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>

            {/* Mobile Menu with Animation */}
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`md:hidden bg-green-600 px-4 py-4 space-y-3 rounded-b overflow-hidden ${isOpen ? 'block' : 'hidden'}`}
            >
                <Link to="/" className="block text-lg" onClick={toggleMenu}>Home</Link>
                <div>
                    <div onClick={toggleProductDropdown} className="flex justify-between items-center cursor-pointer text-lg">
                        <span>Products</span>
                        <span>{productDropdown ? "▲" : "▼"}</span>
                    </div>
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={productDropdown ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pl-4 space-y-1 mt-1 overflow-hidden"
                    >
                        <Link to="/products/seeds" onClick={toggleMenu} className="block text-sm">Seeds</Link>
                        <Link to="/products/fertilizers" onClick={toggleMenu} className="block text-sm">Fertilizers</Link>
                        <Link to="/products/tools" onClick={toggleMenu} className="block text-sm">Tools</Link>
                    </motion.div>
                </div>

                <Link to="/about" className="block text-lg" onClick={toggleMenu}>About</Link>
                <Link to="/contact" className="block text-lg" onClick={toggleMenu}>Contact</Link>
                <Link to="/blog" className="block text-lg" onClick={toggleMenu}>Blog</Link>

                {user?._id ? (
                    <>
                        <Link to="/cart" onClick={toggleMenu} className="block text-lg">Cart ({context?.cartProductCount})</Link>
                        <button onClick={handleLogout} className="w-full text-left text-red-200 hover:text-red-400">Logout</button>
                    </>
                ) : (
                    <Link to="/login" onClick={toggleMenu} className="block text-lg">Login</Link>
                )}
            </motion.div>
        </header>
    )
}

export default Header

