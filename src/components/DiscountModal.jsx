import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkForDiscounts, removeDiscount } from '../features/cart/cartSlice'

const DiscountModal = ({}) => {
  
    const {finalDiscountsArray,cartItems} = useSelector(state=>state.cart)

  
const dispatch = useDispatch()
    

 
    
  
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
{/* <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>open modal</button> */}
<dialog id="my_modal_2" className="modal">
  <div className="modal-box h-[20rem]">


<h1 className='text-3xl italic underline mb-5'>Discounts Applied For</h1>
{finalDiscountsArray.map((discountItem) => {
  const matchingCartItem = cartItems.find((cartItem) => cartItem.id === discountItem?.tripId);
  

  if (matchingCartItem) {
    return <div className='text-md text-red-600 italic font-semibold' key={matchingCartItem.id}>{discountItem.tripText} <span className='text-blue-500 underline'> {discountItem.benefit}</span> {discountItem.condition} 
    <span className='btn' onClick={()=>{
      console.log('remvoe discount clicked')
      dispatch(removeDiscount({itemId:matchingCartItem.id,quantity:matchingCartItem.quantity,limit:discountItem.ticketLimit}))
    }}
      
      >remove discount</span>
    </div>;
  }

  // If no matching cart item is found, you can return null or an empty fragment.
  return null;
})}
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
  
    </div>
  )
}

export default DiscountModal