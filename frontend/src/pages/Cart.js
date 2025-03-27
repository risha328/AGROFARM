import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const loadingCart = new Array(4).fill(null);

    const fetchData = async () => {
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: { "content-type": 'application/json' }
        });
        const responseData = await response.json();
        if (responseData.success) setData(responseData.data);
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
        setLoading(false);
    }, []);

    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: { "content-type": 'application/json' },
            body: JSON.stringify({ _id: id, quantity: qty + 1 })
        });
        const responseData = await response.json();
        if (responseData.success) fetchData();
    };

    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: { "content-type": 'application/json' },
                body: JSON.stringify({ _id: id, quantity: qty - 1 })
            });
            const responseData = await response.json();
            if (responseData.success) fetchData();
        }
    };

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: { "content-type": 'application/json' },
            body: JSON.stringify({ _id: id })
        });
        const responseData = await response.json();
        if (responseData.success) {
            fetchData();
            context.fetchUserAddToCart();
        }
    };

    const totalQty = data.reduce((acc, curr) => acc + curr.quantity, 0);
    const totalPrice = data.reduce((acc, curr) => acc + (curr.quantity * curr?.productId?.sellingPrice), 0);

    return (
        <div className='container mx-auto py-4'>

            {/* Empty Cart */}
            {data.length === 0 && !loading && (
                <div className='text-center bg-white py-8 rounded shadow text-gray-500 text-lg'>
                    Your Cart is Empty
                </div>
            )}

            <div className='flex flex-col lg:flex-row gap-8'>

                {/* Cart Items */}
                <div className='w-full lg:w-2/3 space-y-4'>
                    {loading ? (
                        loadingCart.map((_, i) => (
                            <div key={i} className='h-32 bg-slate-200 animate-pulse rounded'></div>
                        ))
                    ) : (
                        data.map((product) => (
                            <div key={product._id} className='bg-white rounded-lg p-3 flex gap-4 shadow'>

                                {/* Image */}
                                <div className='w-28 h-28 flex-shrink-0 bg-slate-100 rounded overflow-hidden'>
                                    <img src={product.productId.productImage[0]} alt='' className='w-full h-full object-contain mix-blend-multiply' />
                                </div>

                                {/* Details */}
                                <div className='flex-1 relative'>

                                    {/* Delete Button */}
                                    <button onClick={() => deleteCartProduct(product._id)} className='absolute right-0 text-red-500 hover:text-red-700'>
                                        <MdDelete size={20} />
                                    </button>

                                    <h2 className='text-lg font-semibold text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                    <p className='capitalize text-sm text-gray-500 mb-1'>{product?.productId.category}</p>

                                    {/* Price */}
                                    <div className='flex justify-between items-center'>
                                        <p className='text-red-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                        <p className='text-gray-700 font-semibold'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                    </div>

                                    {/* Qty Controls */}
                                    <div className='flex items-center gap-3 mt-2'>
                                        <button className='border border-gray-400 px-2 rounded hover:bg-gray-200' onClick={() => decreaseQty(product?._id, product?.quantity)}>-</button>
                                        <span>{product?.quantity}</span>
                                        <button className='border border-gray-400 px-2 rounded hover:bg-gray-200' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Summary */}
                <div className='w-full lg:w-1/3 space-y-4'>

                    <div className='bg-white rounded-lg shadow p-4'>
                        <h2 className='text-lg font-semibold mb-4 border-b pb-2'>Order Summary</h2>
                        <div className='flex justify-between mb-2'>
                            <span>Total Quantity:</span>
                            <span>{totalQty}</span>
                        </div>
                        <div className='flex justify-between mb-4'>
                            <span>Total Amount:</span>
                            <span>{displayINRCurrency(totalPrice)}</span>
                        </div>
                        <Link to="/payment">
                            <button className='w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-all'>Proceed to Checkout</button>
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Cart;

