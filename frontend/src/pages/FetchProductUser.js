import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import UserProductCard from '../components/UserProductcard'
import { useNavigate } from 'react-router-dom'

const FetchProductUser = () => {
    const [userProducts, setUserProducts] = useState([])
    const navigate = useNavigate()
    
    const fetchUserProducts = async() => {
        try {
            const token = localStorage.getItem('token')
            const userId = localStorage.getItem('userId')
            
            const response = await fetch(SummaryApi.allProduct.url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const dataResponse = await response.json()
            
            // Debug logs to check data
            console.log('API Response:', dataResponse)
            console.log('User ID:', userId)
            
            if (dataResponse.data && Array.isArray(dataResponse.data)) {
                const userUploadedProducts = dataResponse.data.filter(product => {
                    console.log('Product:', product) // Log each product to see its structure
                    return product.userId === userId || 
                           product.uploadedBy === userId ||
                           product.user_id === userId
                })
                console.log('Filtered Products:', userUploadedProducts)
                setUserProducts(userUploadedProducts)
            }
        } catch (error) {
            console.error("Fetch error:", error)
        }
    }

    useEffect(() => {
        fetchUserProducts()
    }, [])

    // Add console log after state updates
    useEffect(() => {
        console.log('Updated userProducts:', userProducts)
    }, [userProducts])

   


  

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>Products ({userProducts.length})</h2>
        <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full'
          onClick={() => navigate('/add-product')}
        >
          Upload Product
        </button>
      </div>
      {userProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
          {userProducts.map((product) => (
            <UserProductCard
              key={product._id}
              data={product}
              fetchdata={fetchUserProducts}
            />
          ))}
        </div>
      )}
    </div>
  )
}
export default FetchProductUser