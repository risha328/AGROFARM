import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, removeWishlist } from '../../store/wishlistSlice';
import { Link } from 'react-router-dom';
import { FaHeartBroken } from 'react-icons/fa';
import displayINRCurrency from '../../helpers/displayCurrency';

const WishlistPage = () => {
    const dispatch = useDispatch();
    const { items, status } = useSelector(state => state.wishlist);

    useEffect(() => {
        dispatch(fetchWishlist());
    }, [dispatch]);

    if (status === 'loading') return <p className="text-center py-10">Loading Wishlist...</p>;
    if (status === 'failed') return <p className="text-center text-red-500">Error loading wishlist!</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-6 text-green-700">My Wishlist</h2>

            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center bg-white py-10 rounded shadow-sm border">
                    <FaHeartBroken className="text-6xl text-gray-400" />
                    <p className="mt-4 text-gray-500 text-center">Your wishlist is empty</p>
                    <Link to="/" className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {items.map((item) => (
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
                                        onClick={() => dispatch(removeWishlist(item._id))}
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

export default WishlistPage;
