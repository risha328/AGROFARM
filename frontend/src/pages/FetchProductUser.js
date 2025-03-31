import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import UserProductCard from '../components/UserProductcard'
import { useNavigate } from 'react-router-dom'

const FetchProductUser = () => {
  const [allProduct, setAllProduct] = useState([])
  const navigate = useNavigate()

  const fetchAllProduct = async() => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()
    setAllProduct(dataResponse?.data || [])
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])
  
  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button 
          className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full' 
          onClick={() => navigate('/upload-product')}
        >
          Upload Product
        </button>
      </div>

      {/**all product */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProduct.map((product, index) => {
            return (
              <UserProductCard 
                data={product} 
                key={index+"allProduct"} 
                fetchdata={fetchAllProduct}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default FetchProductUser
