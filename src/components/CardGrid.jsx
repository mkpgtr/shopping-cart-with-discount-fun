import React, { useEffect } from 'react'
import Card from './Card'
import { computeTotalPrice } from '../features/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

const CardGrid = ({data}) => {

    const {cartItems,totalPrice,totalItems} = useSelector(state=>state.cart)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(computeTotalPrice())
    },[totalItems])
  return (
    <div>
        <div className='flex lg:flex-row flex-wrap gap-y-10'>
     {data.map((item)=>{
      return  <Card id={item.id} url={item.url} text={item.text}
      description={item.description} price={item.price} isDiscountApplied={item.isDiscountApplied}
      />
     })}





      
    </div>
    </div>
  )
}

export default CardGrid