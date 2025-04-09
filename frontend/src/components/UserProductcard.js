import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";

import displayINRCurrency from '../helpers/displayCurrency';
import UserEditProduct from './UserEditProduct';

const UserProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false)

  return (
    <div className='bg-white p-4 rounded shadow-md hover:shadow-lg transition-all'>
      <div className='w-40'>
        <div className='relative w-32 h-32 group'>
          <img 
            src={data?.productImage[0]} 
            alt={data.productName}
            className='mx-auto object-cover h-full w-full rounded'
          />
          <div 
            className='absolute top-2 right-2 p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer transition-all'
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline />
          </div>
        </div>
        
        <div className='mt-3'>
          <h1 className='text-ellipsis line-clamp-2 font-medium'>{data.productName}</h1>
          <p className='text-sm text-gray-600'>Brand: {data.brandName}</p>
          <p className='text-sm text-gray-600'>Category: {data.category}</p>
          <div className='flex justify-between items-center mt-2'>
            <p className='font-bold text-green-600'>{displayINRCurrency(data.sellingPrice)}</p>
            <p className='text-sm text-gray-500 line-through'>{displayINRCurrency(data.price)}</p>
          </div>
        </div>
      </div>

      {editProduct && (
        <UserEditProduct 
          productData={data} 
          onClose={() => setEditProduct(false)} 
          fetchdata={fetchdata}
        />
      )}
    </div>
  )
}

export default UserProductCard