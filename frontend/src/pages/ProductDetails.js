// import React, { useCallback, useContext, useEffect, useState } from 'react'
// import  { useNavigate, useParams } from 'react-router-dom'
// import SummaryApi from '../common'
// import { FaStar } from "react-icons/fa";
// import { FaStarHalf } from "react-icons/fa";
// import displayINRCurrency from '../helpers/displayCurrency';
// import VerticalCardProduct from '../components/VerticalCardProduct';
// import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
// import addToCart from '../helpers/addToCart';
// import Context from '../context';

// const ProductDetails = () => {
//   const [data,setData] = useState({
//     productName : "",
//     brandName : "",
//     category : "",
//     productImage : [],
//     description : "",
//     price : "",
//     sellingPrice : ""
//   })
//   const params = useParams()
//   const [loading,setLoading] = useState(true)
//   const productImageListLoading = new Array(4).fill(null)
//   const [activeImage,setActiveImage] = useState("")

//   const [zoomImageCoordinate,setZoomImageCoordinate] = useState({
//     x : 0,
//     y : 0
//   })
//   const [zoomImage,setZoomImage] = useState(false)

//   const { fetchUserAddToCart } = useContext(Context)

//   const navigate = useNavigate()

//   const fetchProductDetails = async()=>{
//     setLoading(true)
//     const response = await fetch(SummaryApi.productDetails.url,{
//       method : SummaryApi.productDetails.method,
//       headers : {
//         "content-type" : "application/json"
//       },
//       body : JSON.stringify({
//         productId : params?.id
//       })
//     })
//     setLoading(false)
//     const dataReponse = await response.json()

//     setData(dataReponse?.data)
//     setActiveImage(dataReponse?.data?.productImage[0])

//   }

//   console.log("data",data)

//   useEffect(()=>{
//     fetchProductDetails()
//   },[params])

//   const handleMouseEnterProduct = (imageURL)=>{
//     setActiveImage(imageURL)
//   }

//   const handleZoomImage = useCallback((e) =>{
//     setZoomImage(true)
//     const { left , top, width , height } = e.target.getBoundingClientRect()
//     console.log("coordinate", left, top , width , height)

//     const x = (e.clientX - left) / width
//     const y = (e.clientY - top) / height

//     setZoomImageCoordinate({
//       x,
//       y
//     })
//   },[zoomImageCoordinate])

//   const handleLeaveImageZoom = ()=>{
//     setZoomImage(false)
//   }


//   const handleAddToCart = async(e,id) =>{
//     await addToCart(e,id)
//     fetchUserAddToCart()
//   }

//   const handleBuyProduct = async(e,id)=>{
//     await addToCart(e,id)
//     fetchUserAddToCart()
//     navigate("/cart")

//   }

//   return (
//     <div className='container mx-auto p-4'>

//       <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
//           {/***product Image */}
//           <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

//               <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
//                   <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>

//                     {/**product zoom */}
//                     {
//                       zoomImage && (
//                         <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
//                           <div
//                             className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
//                             style={{
//                               background : `url(${activeImage})`,
//                               backgroundRepeat : 'no-repeat',
//                               backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `
    
//                             }}
//                           >
    
//                           </div>
//                         </div>
//                       )
//                     }
                  
//               </div>

//               <div className='h-full'>
//                   {
//                     loading ? (
//                       <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
//                         {
//                           productImageListLoading.map((el,index) =>{
//                             return(
//                               <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index}>
//                               </div>
//                             )
//                           })
//                         }
//                       </div>
                      
//                     ) : (
//                       <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
//                         {
//                           data?.productImage?.map((imgURL,index) =>{
//                             return(
//                               <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
//                                 <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(imgURL)}  onClick={()=>handleMouseEnterProduct(imgURL)}/>
//                               </div>
//                             )
//                           })
//                         }
//                       </div>
//                     )
//                   }
//               </div>
//           </div>

//            {/***product details */}
//            {
//             loading ? (
//               <div className='grid gap-1 w-full'>
//                 <p className='bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block'></p>
//                 <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
//                 <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>

//                 <div className='text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full'>
    
//                 </div>

//                 <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full'>
//                   <p className='text-red-600 bg-slate-200 w-full'></p>
//                   <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
//                 </div>

//                 <div className='flex items-center gap-3 my-2 w-full'>
//                   <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
//                   <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
//                 </div>

//                 <div className='w-full'>
//                   <p className='text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full'></p>
//                   <p className=' bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full'></p>
//                 </div>
//               </div>
//             ) : 
//             (
//               <div className='flex flex-col gap-1'>
//                 <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
//                 <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
//                 <p className='capitalize text-slate-400'>{data?.category}</p>

//                 <div className='text-red-600 flex items-center gap-1'>
//                     <FaStar/>
//                     <FaStar/>
//                     <FaStar/>
//                     <FaStar/>
//                     <FaStarHalf/>
//                 </div>

//                 <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
//                   <p className='text-red-600'>{displayINRCurrency(data.sellingPrice)}</p>
//                   <p className='text-slate-400 line-through'>{displayINRCurrency(data.price)}</p>
//                 </div>

//                 <div className='flex items-center gap-3 my-2'>
//                   <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy</button>
//                   <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white' onClick={(e)=>handleAddToCart(e,data?._id)}>Add To Cart</button>
//                 </div>

//                 <div>
//                   <p className='text-slate-600 font-medium my-1'>Description : </p>
//                   <p>{data?.description}</p>
//                 </div>
//               </div>
//             )
//            }

//       </div>



//       {
//         data.category && (
//           <CategroyWiseProductDisplay category={data?.category} heading={"Recommended Product"}/>
//         )
//       }
     



//     </div>
//   )
// }

// export default ProductDetails


// import React, { useCallback, useContext, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { FaStar, FaStarHalf, FaLeaf, FaTruck, FaShieldAlt, FaSeedling } from "react-icons/fa";
// import { GiFarmTractor, GiWaterDrop } from "react-icons/gi";

// // API and helper imports
// import SummaryApi from '../common';
// import displayINRCurrency from '../helpers/displayCurrency';
// import addToCart from '../helpers/addToCart';

// // Component imports
// import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
// import Context from '../context';

// const ProductDetails = () => {
//   const [product, setProduct] = useState({
//     productName: "",
//     brandName: "",
//     category: "",
//     productImage: [],
//     description: "",
//     price: "",
//     sellingPrice: "",
//     origin: "",
//     organic: false,
//     weight: "",
//     shelfLife: ""
//   });

//   const params = useParams();
//   const [loading, setLoading] = useState(true);
//   const productImageListLoading = new Array(4).fill(null);
//   const [activeImage, setActiveImage] = useState("");
//   const [quantity, setQuantity] = useState(1);

//   const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
//   const [zoomImage, setZoomImage] = useState(false);

//   const { fetchUserAddToCart } = useContext(Context);
//   const navigate = useNavigate();

//   const fetchProductDetails = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(SummaryApi.productDetails.url, {
//         method: SummaryApi.productDetails.method,
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify({ productId: params?.id })
//       });
//       const dataResponse = await response.json();
//       setProduct(dataResponse?.data || {});
//       setActiveImage(dataResponse?.data?.productImage?.[0] || "");
//     } catch (error) {
//       console.error("Error fetching product:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProductDetails();
//   }, [params]);

//   const handleMouseEnterProduct = (imageURL) => {
//     setActiveImage(imageURL);
//   };

//   const handleZoomImage = useCallback((e) => {
//     setZoomImage(true);
//     const { left, top, width, height } = e.target.getBoundingClientRect();
//     const x = (e.clientX - left) / width;
//     const y = (e.clientY - top) / height;
//     setZoomImageCoordinate({ x, y });
//   }, []);

//   const handleLeaveImageZoom = () => {
//     setZoomImage(false);
//   };

//   const handleAddToCart = async (e, id) => {
//     await addToCart(e, id, quantity);
//     fetchUserAddToCart();
//   };

//   const handleBuyProduct = async (e, id) => {
//     await addToCart(e, id, quantity);
//     fetchUserAddToCart();
//     navigate("/cart");
//   };

//   const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 10));
//   const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

//   return (
//     <div className='container mx-auto px-4 py-8'>
//       {/* Breadcrumb Navigation */}
//       <div className='text-sm text-gray-600 mb-6'>
//         <span className='hover:text-green-700 cursor-pointer'>Home</span> &gt; 
//         <span className='hover:text-green-700 cursor-pointer'> {product.category || "Products"}</span> &gt; 
//         <span className='text-green-800 font-medium'> {product.productName || "Product"}</span>
//       </div>

//       <div className='flex flex-col lg:flex-row gap-8'>
//         {/* Product Images Section */}
//         <div className='lg:w-1/2'>
//           <div className='flex flex-col lg:flex-row-reverse gap-4'>
//             {/* Main Image with Zoom */}
//             <div className='relative rounded-lg overflow-hidden border border-gray-200'>
//               <div className='aspect-square bg-gray-50 flex items-center justify-center'>
//                 {activeImage ? (
//                   <img 
//                     src={activeImage} 
//                     className='w-full h-full object-contain p-4'
//                     onMouseMove={handleZoomImage}
//                     onMouseLeave={handleLeaveImageZoom}
//                     alt={product.productName}
//                   />
//                 ) : (
//                   <div className='w-full h-full bg-gray-100 animate-pulse'></div>
//                 )}
//               </div>
              
//               {/* Organic Badge */}
//               {product.organic && (
//                 <div className='absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm'>
//                   <FaLeaf className='text-xs' /> Organic Certified
//                 </div>
//               )}

//               {/* Zoomed Image */}
//               {zoomImage && activeImage && (
//                 <div className='hidden lg:block absolute z-10 min-w-[500px] min-h-[500px] bg-white shadow-xl border border-gray-200 rounded-lg overflow-hidden p-1 -right-[520px] top-0'>
//                   <div
//                     className='w-full h-full min-h-[500px] min-w-[500px] bg-no-repeat bg-contain'
//                     style={{
//                       backgroundImage: `url(${activeImage})`,
//                       backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
//                     }}
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Thumbnails */}
//             <div className='flex lg:flex-col gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
//               {loading ? (
//                 productImageListLoading.map((_, index) => (
//                   <div key={`loading-${index}`} className='flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md animate-pulse'></div>
//                 ))
//               ) : (
//                 product.productImage?.map((imgURL, index) => (
//                   <div 
//                     key={`thumb-${index}`}
//                     className={`flex-shrink-0 w-20 h-20 border-2 rounded-md cursor-pointer overflow-hidden ${activeImage === imgURL ? 'border-green-500' : 'border-transparent'}`}
//                     onClick={() => handleMouseEnterProduct(imgURL)}
//                   >
//                     <img 
//                       src={imgURL} 
//                       className='w-full h-full object-contain bg-white p-1'
//                       alt={`Thumbnail ${index + 1}`}
//                     />
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Product Highlights */}
//           <div className='mt-8 bg-green-50 rounded-lg p-6 border border-green-100'>
//             <h3 className='text-lg font-semibold text-green-800 mb-4 flex items-center gap-2'>
//               <FaSeedling className='text-green-600' /> Product Highlights
//             </h3>
//             <ul className='space-y-3'>
//               <li className='flex items-start gap-2'>
//                 <GiFarmTractor className='text-green-600 mt-1 flex-shrink-0' />
//                 <span>Directly sourced from {product.origin || 'our partner farms'}</span>
//               </li>
//               <li className='flex items-start gap-2'>
//                 <GiWaterDrop className='text-green-600 mt-1 flex-shrink-0' />
//                 <span>Naturally grown with sustainable practices</span>
//               </li>
//               {product.organic && (
//                 <li className='flex items-start gap-2'>
//                   <FaLeaf className='text-green-600 mt-1 flex-shrink-0' />
//                   <span>Certified organic by USDA standards</span>
//                 </li>
//               )}
//               <li className='flex items-start gap-2'>
//                 <FaTruck className='text-green-600 mt-1 flex-shrink-0' />
//                 <span>Next-day delivery available for fresh produce</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Product Details Section */}
//         <div className='lg:w-1/2'>
//           {loading ? (
//             <div className='space-y-6'>
//               <div className='h-8 bg-gray-200 rounded-full animate-pulse w-3/4'></div>
//               <div className='h-6 bg-gray-200 rounded-full animate-pulse w-1/2'></div>
//               <div className='h-4 bg-gray-200 rounded-full animate-pulse w-1/3'></div>
//               <div className='h-12 bg-gray-200 rounded animate-pulse'></div>
//               <div className='h-10 bg-gray-200 rounded animate-pulse w-1/2'></div>
//               <div className='space-y-4'>
//                 <div className='h-6 bg-gray-200 rounded-full animate-pulse w-1/4'></div>
//                 <div className='h-4 bg-gray-200 rounded-full animate-pulse'></div>
//                 <div className='h-4 bg-gray-200 rounded-full animate-pulse w-5/6'></div>
//                 <div className='h-4 bg-gray-200 rounded-full animate-pulse w-2/3'></div>
//               </div>
//             </div>
//           ) : (
//             <div className='space-y-6'>
//               {/* Brand and Category */}
//               <div className='flex items-center gap-3'>
//                 <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium'>
//                   {product.brandName}
//                 </span>
//                 <span className='text-gray-500 text-sm'>
//                   {product.category}
//                 </span>
//               </div>

//               {/* Product Name */}
//               <h1 className='text-3xl font-bold text-gray-900'>
//                 {product.productName}
//               </h1>

//               {/* Ratings */}
//               <div className='flex items-center gap-2'>
//                 <div className='flex text-yellow-400'>
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />
//                   <FaStarHalf />
//                 </div>
//                 <span className='text-gray-500 text-sm'>(42 customer reviews)</span>
//               </div>

//               {/* Price */}
//               <div className='flex items-baseline gap-3'>
//                 <span className='text-3xl font-bold text-green-700'>
//                   {displayINRCurrency(product.sellingPrice)}
//                 </span>
//                 {product.price && (
//                   <span className='text-lg text-gray-500 line-through'>
//                     {displayINRCurrency(product.price)}
//                   </span>
//                 )}
//                 {product.price && (
//                   <span className='ml-2 bg-red-100 text-red-800 px-2 py-0.5 rounded text-sm font-medium'>
//                     {Math.round(((product.price - product.sellingPrice) / product.price) * 100)}% OFF
//                   </span>
//                 )}
//               </div>

//               {/* Product Meta */}
//               <div className='grid grid-cols-2 gap-4 text-sm'>
//                 {product.weight && (
//                   <div className='bg-gray-50 p-3 rounded-lg'>
//                     <div className='text-gray-500'>Weight</div>
//                     <div className='font-medium'>{product.weight}</div>
//                   </div>
//                 )}
//                 {product.shelfLife && (
//                   <div className='bg-gray-50 p-3 rounded-lg'>
//                     <div className='text-gray-500'>Shelf Life</div>
//                     <div className='font-medium'>{product.shelfLife}</div>
//                   </div>
//                 )}
//                 {product.origin && (
//                   <div className='bg-gray-50 p-3 rounded-lg'>
//                     <div className='text-gray-500'>Origin</div>
//                     <div className='font-medium'>{product.origin}</div>
//                   </div>
//                 )}
//                 <div className='bg-gray-50 p-3 rounded-lg'>
//                   <div className='text-gray-500'>Availability</div>
//                   <div className='font-medium text-green-600'>In Stock</div>
//                 </div>
//               </div>

//               {/* Quantity Selector */}
//               <div className='pt-4'>
//                 <div className='text-sm font-medium text-gray-700 mb-2'>Quantity</div>
//                 <div className='flex items-center gap-2'>
//                   <button 
//                     onClick={decrementQuantity}
//                     className='w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50'
//                   >
//                     -
//                   </button>
//                   <div className='w-16 h-10 border border-gray-300 rounded-md flex items-center justify-center'>
//                     {quantity}
//                   </div>
//                   <button 
//                     onClick={incrementQuantity}
//                     className='w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50'
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className='flex flex-col sm:flex-row gap-3 pt-6'>
//                 <button 
//                   onClick={(e) => handleBuyProduct(e, product._id)}
//                   className='flex-1 bg-green-700 hover:bg-green-800 text-white py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center gap-2'
//                 >
//                   Buy Now
//                 </button>
//                 <button 
//                   onClick={(e) => handleAddToCart(e, product._id)}
//                   className='flex-1 border-2 border-green-700 text-green-700 hover:bg-green-50 py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center gap-2'
//                 >
//                   Add to Cart
//                 </button>
//               </div>

//               {/* Trust Badges */}
//               <div className='flex flex-wrap gap-4 pt-6'>
//                 <div className='flex items-center gap-2 text-sm text-gray-600'>
//                   <FaTruck className='text-green-600' />
//                   <span>Free Delivery</span>
//                 </div>
//                 <div className='flex items-center gap-2 text-sm text-gray-600'>
//                   <FaShieldAlt className='text-green-600' />
//                   <span>Quality Guarantee</span>
//                 </div>
//                 <div className='flex items-center gap-2 text-sm text-gray-600'>
//                   <FaLeaf className='text-green-600' />
//                   <span>Farm Fresh</span>
//                 </div>
//               </div>

//               {/* Description */}
//               <div className='pt-8'>
//                 <h3 className='text-lg font-semibold text-gray-900 mb-3'>Product Description</h3>
//                 <p className='text-gray-700 whitespace-pre-line'>
//                   {product.description || "No description available."}
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Recommended Products */}
//       {product.category && (
//         <div className='mt-16'>
//           <CategroyWiseProductDisplay 
//             category={product.category} 
//             heading="You May Also Like"
//           />
//         </div>
//       )}

//       {/* Farm Story Section */}
//       <div className='mt-16 bg-green-50 rounded-xl p-8 border border-green-100'>
//         <div className='max-w-4xl mx-auto text-center'>
//           <h2 className='text-2xl font-bold text-green-800 mb-4'>Our Farming Story</h2>
//           <p className='text-gray-700 mb-6'>
//             Every product in our store comes from farms that practice sustainable agriculture. 
//             We partner with small family farms that prioritize soil health, water conservation, 
//             and ethical labor practices to bring you the freshest, most nutritious produce.
//           </p>
//           <button className='bg-white border border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 py-2 rounded-full font-medium transition-colors'>
//             Learn About Our Farms
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;


import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, FaStarHalf, FaLeaf, FaTruck, FaShieldAlt, FaSeedling, FaHeart } from "react-icons/fa";
import { GiFarmTractor, GiWaterDrop } from "react-icons/gi";

// API and helper imports
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';
import addToCart from '../helpers/addToCart';

// Component imports
import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import Context from '../context';

const ProductDetails = () => {
  const [product, setProduct] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
    origin: "",
    organic: false,
    weight: "",
    shelfLife: ""
  });

  const [wishlisted, setWishlisted] = useState(false);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState(false);

  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ productId: params?.id })
      });
      const dataResponse = await response.json();
      setProduct(dataResponse?.data || {});
      setActiveImage(dataResponse?.data?.productImage?.[0] || "");
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({ x, y });
  }, []);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id, quantity);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id, quantity);
    fetchUserAddToCart();
    navigate("/cart");
  };

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  const toggleWishlist = () => {
    setWishlisted(!wishlisted);
  };

  return (
    <div className='container mx-auto px-4 py-8 max-w-7xl'>
      {/* Breadcrumb Navigation */}
      <div className='text-sm text-gray-600 mb-6'>
        <span className='hover:text-green-700 cursor-pointer'>Home</span> &gt; 
        <span className='hover:text-green-700 cursor-pointer'> {product.category || "Products"}</span> &gt; 
        <span className='text-green-800 font-medium'> {product.productName || "Product"}</span>
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Product Images Section - Extra Large Cards */}
        <div className='lg:w-[55%]'>
          <div className='flex flex-col lg:flex-row-reverse gap-8'>
            {/* Main Image with Zoom - Extra Large Card */}
            <div className='relative rounded-xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full'>
              <div className='aspect-square bg-gray-50 flex items-center justify-center relative'>
                {activeImage ? (
                  <>
                    <img 
                      src={activeImage} 
                      className='w-full h-full object-contain p-8'
                      onMouseMove={handleZoomImage}
                      onMouseLeave={handleLeaveImageZoom}
                      alt={product.productName}
                    />
                    {/* Wishlist Button */}
                    <button 
                      onClick={toggleWishlist}
                      className={`absolute top-6 right-6 p-3 rounded-full ${wishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} bg-white shadow-lg`}
                    >
                      <FaHeart className='text-2xl' />
                    </button>
                  </>
                ) : (
                  <div className='w-full h-full bg-gray-100 animate-pulse'></div>
                )}
              </div>
              
              {/* Organic Badge - Larger */}
              {product.organic && (
                <div className='absolute top-6 left-6 bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 text-base shadow-lg'>
                  <FaLeaf className='text-sm' /> Organic Certified
                </div>
              )}

              {/* Zoomed Image - Larger */}
              {zoomImage && activeImage && (
                <div className='hidden lg:block absolute z-20 min-w-[600px] min-h-[600px] bg-white shadow-2xl border border-gray-200 rounded-xl overflow-hidden p-3 -right-[620px] top-0'>
                  <div
                    className='w-full h-full min-h-[600px] min-w-[600px] bg-no-repeat bg-contain'
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                    }}
                  />
                </div>
              )}
            </div>

            {/* Thumbnails - Larger Cards */}
            <div className='flex lg:flex-col gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-2'>
              {loading ? (
                productImageListLoading.map((_, index) => (
                  <div 
                    key={`loading-${index}`} 
                    className='flex-shrink-0 w-32 h-32 bg-gray-100 rounded-xl animate-pulse shadow-md'
                  ></div>
                ))
              ) : (
                product.productImage?.map((imgURL, index) => (
                  <div 
                    key={`thumb-${index}`}
                    className={`flex-shrink-0 w-32 h-32 border-2 rounded-xl cursor-pointer overflow-hidden shadow-md transition-all duration-200 ${activeImage === imgURL ? 'border-green-500 shadow-lg' : 'border-transparent hover:border-gray-300'}`}
                    onClick={() => handleMouseEnterProduct(imgURL)}
                  >
                    <img 
                      src={imgURL} 
                      className='w-full h-full object-contain bg-white p-3'
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Product Highlights - Larger Card */}
          <div className='mt-10 bg-white rounded-xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <h3 className='text-2xl font-semibold text-green-800 mb-6 flex items-center gap-4'>
              <FaSeedling className='text-green-600 text-3xl' />
              <span>Product Highlights</span>
            </h3>
            <ul className='space-y-5'>
              <li className='flex items-start gap-4 p-4 rounded-xl hover:bg-green-50 transition-colors duration-200'>
                <div className='bg-green-100 p-3 rounded-full'>
                  <GiFarmTractor className='text-green-600 text-2xl' />
                </div>
                <div>
                  <h4 className='font-medium text-gray-900 text-lg'>Farm Direct</h4>
                  <p className='text-gray-600'>Directly sourced from {product.origin || 'our partner farms'}</p>
                </div>
              </li>
              <li className='flex items-start gap-4 p-4 rounded-xl hover:bg-green-50 transition-colors duration-200'>
                <div className='bg-green-100 p-3 rounded-full'>
                  <GiWaterDrop className='text-green-600 text-2xl' />
                </div>
                <div>
                  <h4 className='font-medium text-gray-900 text-lg'>Sustainable</h4>
                  <p className='text-gray-600'>Naturally grown with sustainable practices</p>
                </div>
              </li>
              {product.organic && (
                <li className='flex items-start gap-4 p-4 rounded-xl hover:bg-green-50 transition-colors duration-200'>
                  <div className='bg-green-100 p-3 rounded-full'>
                    <FaLeaf className='text-green-600 text-2xl' />
                  </div>
                  <div>
                    <h4 className='font-medium text-gray-900 text-lg'>Organic Certified</h4>
                    <p className='text-gray-600'>Certified organic by USDA standards</p>
                  </div>
                </li>
              )}
              <li className='flex items-start gap-4 p-4 rounded-xl hover:bg-green-50 transition-colors duration-200'>
                <div className='bg-green-100 p-3 rounded-full'>
                  <FaTruck className='text-green-600 text-2xl' />
                </div>
                <div>
                  <h4 className='font-medium text-gray-900 text-lg'>Fast Delivery</h4>
                  <p className='text-gray-600'>Next-day delivery available for fresh produce</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Product Details Section */}
        <div className='lg:w-[45%]'>
          <div className='bg-white rounded-xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300'>
            {loading ? (
              <div className='space-y-6'>
                <div className='h-8 bg-gray-200 rounded-full animate-pulse w-3/4'></div>
                <div className='h-6 bg-gray-200 rounded-full animate-pulse w-1/2'></div>
                <div className='h-4 bg-gray-200 rounded-full animate-pulse w-1/3'></div>
                <div className='h-12 bg-gray-200 rounded animate-pulse'></div>
                <div className='h-10 bg-gray-200 rounded animate-pulse w-1/2'></div>
                <div className='space-y-4'>
                  <div className='h-6 bg-gray-200 rounded-full animate-pulse w-1/4'></div>
                  <div className='h-4 bg-gray-200 rounded-full animate-pulse'></div>
                  <div className='h-4 bg-gray-200 rounded-full animate-pulse w-5/6'></div>
                  <div className='h-4 bg-gray-200 rounded-full animate-pulse w-2/3'></div>
                </div>
              </div>
            ) : (
              <div className='space-y-6'>
                {/* Brand and Category */}
                <div className='flex items-center gap-3'>
                  <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm'>
                    {product.brandName}
                  </span>
                  <span className='text-gray-500 text-sm'>
                    {product.category}
                  </span>
                </div>

                {/* Product Name */}
                <h1 className='text-3xl font-bold text-gray-900'>
                  {product.productName}
                </h1>

                {/* Ratings */}
                <div className='flex items-center gap-3 bg-gray-50 p-3 rounded-lg'>
                  <div className='flex text-yellow-400'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalf />
                  </div>
                  <span className='text-gray-600 text-sm'>4.5 (42 reviews)</span>
                  <span className='text-green-600 text-sm font-medium ml-auto'>In Stock</span>
                </div>

                {/* Price */}
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <div className='flex items-baseline gap-3'>
                    <span className='text-3xl font-bold text-green-700'>
                      {displayINRCurrency(product.sellingPrice)}
                    </span>
                    {product.price && (
                      <span className='text-lg text-gray-500 line-through'>
                        {displayINRCurrency(product.price)}
                      </span>
                    )}
                    {product.price && (
                      <span className='ml-auto bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium'>
                        {Math.round(((product.price - product.sellingPrice) / product.price) * 100)}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* Product Meta */}
                <div className='grid grid-cols-2 gap-4'>
                  {product.weight && (
                    <div className='bg-gray-50 p-4 rounded-lg'>
                      <div className='text-gray-500 text-sm'>Weight</div>
                      <div className='font-medium text-lg'>{product.weight}</div>
                    </div>
                  )}
                  {product.shelfLife && (
                    <div className='bg-gray-50 p-4 rounded-lg'>
                      <div className='text-gray-500 text-sm'>Shelf Life</div>
                      <div className='font-medium text-lg'>{product.shelfLife}</div>
                    </div>
                  )}
                  {product.origin && (
                    <div className='bg-gray-50 p-4 rounded-lg'>
                      <div className='text-gray-500 text-sm'>Origin</div>
                      <div className='font-medium text-lg'>{product.origin}</div>
                    </div>
                  )}
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <div className='text-gray-500 text-sm'>Delivery</div>
                    <div className='font-medium text-lg'>1-2 Days</div>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className='pt-4'>
                  <div className='text-sm font-medium text-gray-700 mb-3'>Quantity (KG)</div>
                  <div className='flex items-center gap-3'>
                    <button 
                      onClick={decrementQuantity}
                      className='w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 text-xl'
                    >
                      -
                    </button>
                    <div className='w-20 h-12 border border-gray-300 rounded-lg flex items-center justify-center text-lg font-medium'>
                      {quantity}
                    </div>
                    <button 
                      onClick={incrementQuantity}
                      className='w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 text-xl'
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row gap-4 pt-6'>
                  <button 
                    onClick={(e) => handleBuyProduct(e, product._id)}
                    className='flex-1 bg-green-700 hover:bg-green-800 text-white py-4 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-lg shadow-md hover:shadow-lg'
                  >
                    Buy Now
                  </button>
                  <button 
                    onClick={(e) => handleAddToCart(e, product._id)}
                    className='flex-1 border-2 border-green-700 text-green-700 hover:bg-green-50 py-4 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-lg shadow-md hover:shadow-lg'
                  >
                    Add to Cart
                  </button>
                </div>

                {/* Trust Badges */}
                <div className='flex flex-wrap gap-4 pt-6 border-t border-gray-200'>
                  <div className='flex items-center gap-3 bg-gray-50 p-3 rounded-lg'>
                    <FaTruck className='text-green-600 text-xl' />
                    <div>
                      <div className='font-medium'>Free Delivery</div>
                      <div className='text-gray-500 text-sm'>On orders over ₹500</div>
                    </div>
                  </div>
                  <div className='flex items-center gap-3 bg-gray-50 p-3 rounded-lg'>
                    <FaShieldAlt className='text-green-600 text-xl' />
                    <div>
                      <div className='font-medium'>Quality Guarantee</div>
                      <div className='text-gray-500 text-sm'>Freshness assured</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className='pt-6 border-t border-gray-200'>
                  <h3 className='text-xl font-semibold text-gray-900 mb-4'>Product Description</h3>
                  <p className='text-gray-700 whitespace-pre-line leading-relaxed'>
                    {product.description || "No description available."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      {product.category && (
        <div className='mt-16'>
          <CategroyWiseProductDisplay 
            category={product.category} 
            heading="You May Also Like"
            cardStyle="enhanced"
          />
        </div>
      )}

      {/* Farm Story Section - Larger Card */}
      <div className='mt-16 bg-white rounded-xl p-12 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex flex-col md:flex-row gap-10 items-center'>
            <div className='md:w-1/2'>
              <img 
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Farm Story" 
                className='w-full h-auto rounded-xl shadow-lg'
              />
            </div>
            <div className='md:w-1/2'>
              <h2 className='text-4xl font-bold text-green-800 mb-6'>Our Farming Philosophy</h2>
              <p className='text-gray-700 mb-8 leading-relaxed text-lg'>
                At our core, we believe in sustainable agriculture that nourishes both people and the planet. 
                Each product is carefully selected from farms that prioritize regenerative practices, 
                ensuring you receive the highest quality while supporting environmental stewardship.
              </p>
              <div className='space-y-5'>
                <div className='flex items-start gap-4'>
                  <div className='bg-green-100 p-3 rounded-full mt-1'>
                    <FaLeaf className='text-green-600 text-xl' />
                  </div>
                  <div>
                    <h4 className='font-medium text-gray-900 text-lg'>Chemical-Free Farming</h4>
                    <p className='text-gray-600'>No synthetic pesticides or fertilizers</p>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <div className='bg-green-100 p-3 rounded-full mt-1'>
                    <GiWaterDrop className='text-green-600 text-xl' />
                  </div>
                  <div>
                    <h4 className='font-medium text-gray-900 text-lg'>Water Conservation</h4>
                    <p className='text-gray-600'>Efficient irrigation systems</p>
                  </div>
                </div>
              </div>
              <button className='mt-8 bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl text-lg'>
                Meet Our Farmers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;