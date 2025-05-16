// import React, { useContext, useEffect, useState } from 'react'
// import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
// import displayINRCurrency from '../helpers/displayCurrency'
// import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
// import { Link } from 'react-router-dom'
// import addToCart from '../helpers/addToCart'
// import Context from '../context'
// import scrollTop from '../helpers/scrollTop'

// const CategroyWiseProductDisplay = ({category, heading}) => {
//     const [data,setData] = useState([])
//     const [loading,setLoading] = useState(true)
//     const loadingList = new Array(13).fill(null)

//     const { fetchUserAddToCart } = useContext(Context)

//     const handleAddToCart = async(e,id)=>{
//        await addToCart(e,id)
//        fetchUserAddToCart()
//     }




//     const fetchData = async() =>{
//         setLoading(true)
//         const categoryProduct = await fetchCategoryWiseProduct(category)
//         setLoading(false)

//         console.log("horizontal data",categoryProduct.data)
//         setData(categoryProduct?.data)
//     }

//     useEffect(()=>{
//         fetchData()
//     },[])




//   return (
//     <div className='container mx-auto px-4 my-6 relative'>

//             <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

                
//            <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
//            {

//                 loading ? (
//                     loadingList.map((product,index)=>{
//                         return(
//                             <div className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
//                                 <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
//                                 </div>
//                                 <div className='p-4 grid gap-3'>
//                                     <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
//                                     <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
//                                     <div className='flex gap-3'>
//                                         <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
//                                         <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
//                                     </div>
//                                     <button className='text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse'></button>
//                                 </div>
//                             </div>
//                         )
//                     })
//                 ) : (
//                     data.map((product,index)=>{
//                         return(
//                             <Link to={"/product/"+product?._id} className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow ' onClick={scrollTop}>
//                                 <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
//                                     <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
//                                 </div>
//                                 <div className='p-4 grid gap-3'>
//                                     <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
//                                     <p className='capitalize text-slate-500'>{product?.category}</p>
//                                     <div className='flex gap-3'>
//                                         <p className='text-red-600 font-medium'>{ displayINRCurrency(product?.sellingPrice) }</p>
//                                         <p className='text-slate-500 line-through'>{ displayINRCurrency(product?.price)  }</p>
//                                     </div>
//                                     <button className='text-sm bg-green-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
//                                 </div>
//                             </Link>
//                         )
//                     })
//                 )
                
//             }
//            </div>
            

//     </div>
//   )
// }

// export default CategroyWiseProductDisplay


import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'

const CategoryWiseProductDisplay = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(4).fill(null) // Reduced skeleton count
    const scrollContainerRef = useRef(null)
    
    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        e.preventDefault()
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -300,
                behavior: 'smooth'
            })
        }
    }

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 300,
                behavior: 'smooth'
            })
        }
    }

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(categoryProduct?.data || [])
    }

    useEffect(() => {
        fetchData()
    }, [category]) // Added category to dependency array

    return (
        <div className='container mx-auto px-4 my-12 relative'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-800'>{heading}</h2>
                <div className='flex space-x-2'>
                    <button 
                        onClick={scrollLeft}
                        className='p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors'
                        aria-label='Scroll left'
                    >
                        <FaAngleLeft className='text-gray-600' />
                    </button>
                    <button 
                        onClick={scrollRight}
                        className='p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors'
                        aria-label='Scroll right'
                    >
                        <FaAngleRight className='text-gray-600' />
                    </button>
                </div>
            </div>

            <div 
                ref={scrollContainerRef}
                className='flex space-x-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory'
            >
                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className='flex-shrink-0 w-72 bg-white rounded-lg shadow-sm overflow-hidden snap-start'>
                            <div className='bg-gray-100 h-60 w-full animate-pulse'></div>
                            <div className='p-4 space-y-3'>
                                <div className='h-5 bg-gray-100 rounded animate-pulse'></div>
                                <div className='h-4 bg-gray-100 rounded animate-pulse w-2/3'></div>
                                <div className='flex space-x-3'>
                                    <div className='h-5 bg-gray-100 rounded animate-pulse w-1/3'></div>
                                    <div className='h-5 bg-gray-100 rounded animate-pulse w-1/3'></div>
                                </div>
                                <div className='h-8 bg-gray-100 rounded-full animate-pulse'></div>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product) => (
                        <Link 
                            key={product._id}
                            to={`/product/${product._id}`} 
                            className='flex-shrink-0 w-72 bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 snap-start'
                            onClick={scrollTop}
                        >
                            <div className='bg-gray-50 h-60 w-full flex items-center justify-center p-4'>
                                <img 
                                    src={product.productImage[0]} 
                                    className='object-contain h-full w-full hover:scale-105 transition-transform duration-300 mix-blend-multiply' 
                                    alt={product.productName}
                                />
                            </div>
                            <div className='p-4 space-y-3'>
                                <h3 className='font-semibold text-gray-900 truncate'>{product.productName}</h3>
                                <p className='text-sm text-gray-500 capitalize'>{product.category}</p>
                                <div className='flex items-center space-x-3'>
                                    <span className='font-bold text-red-600'>{displayINRCurrency(product.sellingPrice)}</span>
                                    {product.price > product.sellingPrice && (
                                        <span className='text-sm text-gray-400 line-through'>
                                            {displayINRCurrency(product.price)}
                                        </span>
                                    )}
                                </div>
                                <button 
                                    onClick={(e) => handleAddToCart(e, product._id)}
                                    className='w-full py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:from-green-600 hover:to-green-700 transition-colors duration-300 text-sm font-medium'
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}

export default CategoryWiseProductDisplay