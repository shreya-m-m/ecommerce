import React from 'react'
const AddressCard = ({address}) => {
    return(
        <div>
            <div className='text-left space-y-2'>
                <p className='font-semibold'>{address?.firstname+" "+address?.lastname}</p>
                <p>{address?.streetname+", "+address?.city+", "+address?.state}</p>
                <p>{address?.zipcode}</p>
                <div className='space-y-1'>
                    <p className='font-semibold'>Mobile:</p>
                    <p>{address?.phone_number}</p>
                </div>
            </div>
        </div>


    )
} 
export default AddressCard