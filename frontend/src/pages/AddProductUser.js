import React, { useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import { useNavigate } from 'react-router-dom'

const AddProductUser = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(true)
  const navigate = useNavigate()

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>Upload Product</h2>
        <button 
          className='border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all py-1 px-3 rounded-full'
          onClick={() => navigate('/user-products')}
        >
          View All Products
        </button>
      </div>

      {/**upload product component */}
      <div className='py-4'>
        <UploadProduct 
          onClose={() => navigate('/my-product')} 
          fetchData={() => {}} // This can be removed or kept for consistency
        />
      </div>
    </div>
  )
}

export default AddProductUser