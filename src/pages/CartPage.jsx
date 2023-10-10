import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  checkForDiscounts, computeTotalPrice, decrementItem, incrementItem, } from '../features/cart/cartSlice'
import { DiscountModal } from '../components'
import { itemHasDiscount } from '../utils/discount'

const CartPage = () => {
 const dispatch =  useDispatch()
 const [showModal,setShowModal] = useState(false)
    const {cartItems,totalPrice,totalItems,finalDiscountsArray} = useSelector(state=>state.cart)
    const [userWantsDiscount,setUserWantsDiscount] = useState(false)
    

    const updatedCartItems = cartItems.map((item) => {
        const isDiscountAvailable = itemHasDiscount(item.id, finalDiscountsArray).length > 0;
      
        // Calculate the updated price without modifying the original item
        const newPrice = isDiscountAvailable
          ? item.price * item.quantity - (item.price * (10 / 100)) * item.quantity
          : item.price * item.quantity;
      
        // Create a new object with the updated price
        const newItem = {
          ...item,
          price: newPrice,
        };
      
        return newItem;
      });



    useEffect(()=>{
      dispatch(checkForDiscounts())
        dispatch(computeTotalPrice())
        
    },[totalItems])

    useEffect(()=>{
        dispatch(computeTotalPrice())
        
    },[finalDiscountsArray])
    
    
  
 
  

  

   

  return (
    <div className='align-element'>

        Cart Page


        
      
        <div className=' h-screen'>
            <div className=' w-full'>
                       <DiscountModal />
         <button className="btn btn-primary block ms-auto"  onClick={()=>document.getElementById('my_modal_2').showModal()}>
            Manage Discounts
         </button>
            </div>
            {/* Cart item */}
                {
                  updatedCartItems.map((item)=>{

                 
                    
                    // const isDiscountAvailable = itemHasDiscount(item.id,finalDiscountsArray).length > 0

                    

                
                   
                    // const newPrice = (isDiscountAvailable) ? ((item.price * item.quantity) - ((item.price * 10/100)*(item.quantity)))
                    
                    // : item.price*item.quantity;

                    

                    // console.log(newPrice)
                    // console.log(isDiscountAvailable)

                    
                    return  <div className='mt-10 flex items-center border border-black justify-around'>

                    {/* id */}
                    <div>
                    <span className='font-bold'>{item?.id}</span>
                    </div>
                    {/* image */}
                    <div className='max-w-[10rem] p-1 ml-10'>
                        <img className='rounded-xl' src={item?.url} alt="" />
                    </div>
                    {/* text & description */}
                    <div className='ml-6'>
                        <span className='text-2xl italic'>{item?.text}</span>
                    </div>
                      {
                        itemHasDiscount(item.id, finalDiscountsArray).length > 0 && 
                        <div className="discount bg-secondary text-white p-2 rounded-xl">
                        <span className='text-sm'>discount applied</span>
                      </div>
                      }
                      
                   
    
                    {/* increment/decrement buttons */}
                            <div className='flex gap-4 ml-10 items-center'>
                                <button className="btn" onClick={()=>dispatch(decrementItem(item))}>-</button>
                                <span>{item?.quantity}</span>
                                <button className="btn" onClick={()=>dispatch(incrementItem(item))}>+</button>
                            </div>
                    {/* price */}
    
                    <div className='ml-10'>
                        <span className='text-lg font-bold'>${item.price}</span>
                        {/* <span className='text-lg font-bold'>${(item?.price * item?.quantity)}</span> */}
                    </div>
                </div>
                  })
                }
                {/* Single Cart Item */}
            
                <div className='w-10 mx-auto text-2xl font-bold mt-10'>
                    <span>Total=</span>
            <span>${totalPrice}</span>
        </div>
        </div>

        {/* total price */}

       
    </div>
  )
}

export default CartPage