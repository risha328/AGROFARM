import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import UserProductCard from '../components/UserProductcard'
import { useSelector } from 'react-redux'
//import Loading from '../components/Loading'

const UserProduct = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [userProducts, setUserProducts] = useState([])
  //const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const user = useSelector(state => state.user?.user)

  const fetchUserProducts = async () => {
    try {
      //setLoading(true)
      setError('')
      
      if (!user?._id) {
        throw new Error("Please login to view your products")
      }

      const response = await fetch(SummaryApi.userProducts.url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      const dataResponse = await response.json()

      if (!response.ok) {
        throw new Error(dataResponse.message || 'Failed to fetch your products')
      }

      setUserProducts(dataResponse?.data || [])
    } catch (error) {
      setError(error.message)
      console.error("Fetch error:", error)
    } 
  }

  useEffect(() => {
    fetchUserProducts()
  }, [user?._id]) // Refetch when user changes
  
 

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <div className='bg-white py-2 px-4 flex justify-between items-center sticky top-0 z-10'>
        <h2 className='font-bold text-lg'>My Products</h2>
        <button 
          className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full' 
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/** User's products */}
      <div className='flex items-center flex-wrap gap-5 py-4 min-h-[calc(100vh-190px)]'>
        {userProducts.length === 0 ? (
          <div className="w-full text-center py-10">
            <p className="text-gray-500 mb-4">You haven't uploaded any products yet</p>
            <button 
              className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
              onClick={() => setOpenUploadProduct(true)}
            >
              Upload Your First Product
            </button>
          </div>
        ) : (
          userProducts.map((product, index) => (
            <UserProductCard 
              data={product} 
              key={`${product._id}-${index}`} 
              fetchdata={fetchUserProducts}
            />
          ))
        )}
      </div>

      {/** Upload product component */}
      {openUploadProduct && (
        <UploadProduct 
          onClose={() => setOpenUploadProduct(false)} 
          fetchData={fetchUserProducts}
        />
      )}
    </div>
  )
}

export default UserProduct