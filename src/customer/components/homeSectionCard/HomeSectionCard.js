import React from 'react'
const HomeSetionCard = ({product}) => {
    return (
        <div className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3'>
            <div className='h-[20rem] w-[15rem]'>
                <img className='object-cover object-top w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-150' src={product.imageUrl} alt="" />

            </div>
            <div className='p-4'>
                <h3 className='text-lg font-medium' >{product.brand}</h3>
                <p className="mt-2 text-sm text-gray-500">
                    {product.title}
                </p>

            </div>
        </div>


    )
}
export default HomeSetionCard 