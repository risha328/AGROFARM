import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeartBroken } from 'react-icons/fa';
import displayINRCurrency from '../helpers/displayCurrency';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const res = await fetch('/api/user/wishlist', { credentials: 'include' });

                if (!res.ok) {
                    throw new Error(`Failed to fetch wishlist: ${res.status}`);
                }

                const data = await res.json();

                if (data.success) {
                    setWishlist(data.wishlist || []);
                } else {
                    setError("Failed to load wishlist");
                }

            } catch (err) {
                console.error("Error fetching wishlist:", err);
                setError("Something went wrong while loading your wishlist.");
            }
        };

        fetchWishlist();
    }, []);

    const removeFromWishlist = async (productId) => {
        try {
            await fetch('/api/user/remove-wishlist', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId })
            });
            setWishlist((prev) => prev.filter((item) => item._id !== productId));
        } catch (err) {
            console.error("Error removing from wishlist:", err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-6 text-green-700">My Wishlist</h2>

            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                    {error}
                </div>
            )}

            {wishlist.length === 0 && !error ? (
                <div className="flex flex-col items-center justify-center bg-white py-10 rounded shadow-sm border">
                    <FaHeartBroken className="text-6xl text-gray-400" />
                    <p className="mt-4 text-gray-500 text-center">Your wishlist is empty</p>
                    <Link to="/" className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {wishlist.map((item) => (
                        <div key={item._id} className="flex flex-col md:flex-row bg-white p-4 rounded-lg shadow border hover:shadow-md transition duration-200">
                            <img src={item.productImage[0]} alt={item.productName} className="w-full md:w-32 h-32 object-contain rounded border" />

                            <div className="flex-1 md:ml-4 mt-3 md:mt-0">
                                <h3 className="text-lg font-semibold text-gray-800">{item.productName}</h3>
                                <p className="text-sm text-gray-500 mb-1 capitalize">{item.category}</p>
                                <p className="text-green-600 font-medium text-lg">{displayINRCurrency(item.sellingPrice)}</p>

                                <div className="flex gap-3 mt-3">
                                    <Link to={`/product/${item._id}`} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm">
                                        View Details
                                    </Link>
                                    <button
                                        onClick={() => removeFromWishlist(item._id)}
                                        className="border border-red-600 text-red-600 px-4 py-1 rounded hover:bg-red-600 hover:text-white text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
