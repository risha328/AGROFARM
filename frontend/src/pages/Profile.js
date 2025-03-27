import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../store/userSlice';
import { FaUserCircle, FaShoppingCart, FaHeart, FaBox } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => setProfilePic(reader.result);
        if (file) reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('/api/user/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ profilePic })
        });
        dispatch(fetchUserProfile());
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* PROFILE CARD */}
            <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center relative">
                <div className="absolute top-4 right-4 text-xs text-gray-400">Profile Settings</div>
                <div className="relative">
                    {user?.profilePic ? (
                        <img src={user.profilePic} alt="Profile" className="w-32 h-32 rounded-full border-4 border-green-600 shadow-lg" />
                    ) : (
                        <FaUserCircle className="text-[120px] text-green-600" />
                    )}
                </div>
                <h2 className="text-2xl font-semibold mt-4 text-gray-800">{user?.name || "Your Name"}</h2>
                <p className="text-sm text-gray-500">{user?.email || "Your Email"}</p>

                {/* PROFILE UPDATE */}
                <form onSubmit={handleSubmit} className="w-full md:w-1/2 mt-6 space-y-3">
                    <label className="text-sm text-gray-600 font-medium">Update Profile Picture</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 rounded w-full focus:ring-2 focus:ring-green-600 outline-none" />
                    <button type="submit" className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 transition">Upload</button>
                </form>

                {/* LINKS */}
                <div className="grid grid-cols-3 gap-4 w-full mt-8">
                    <Link to="/orders" className="bg-gray-50 hover:bg-gray-100 border rounded p-4 flex flex-col items-center transition">
                        <FaBox className="text-green-600 text-3xl mb-2" />
                        <span className="text-sm font-medium">My Orders</span>
                    </Link>

                    <Link to="/wishlist" className="bg-gray-50 hover:bg-gray-100 border rounded p-4 flex flex-col items-center transition">
                        <FaHeart className="text-red-500 text-3xl mb-2" />
                        <span className="text-sm font-medium">My Wishlist</span>
                    </Link>

                    <Link to="/cart" className="bg-gray-50 hover:bg-gray-100 border rounded p-4 flex flex-col items-center transition">
                        <FaShoppingCart className="text-blue-500 text-3xl mb-2" />
                        <span className="text-sm font-medium">My Cart</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;











        