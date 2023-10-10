import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../features/cart/cartSlice'

const Card = ({url,text,description,price,id,isDiscountApplied}) => {
    const { cartItems} = useSelector(state=>state.cart)
    const dispatch = useDispatch()
    const item = {url,text,description,price,id,isDiscountApplied}
    const isItemInCart = cartItems.some((item) => item.text === text);
  return (
    <div className='align-element'>
        <div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src={url} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">{text}</h2>
    <p>{description}</p>
    <div className="card-actions justify-around gap-6 mt-7 ">
      {
        isItemInCart ? <button className="btn btn-primary hover:bg-secondary" onClick={()=>dispatch(removeFromCart(item))}>Remove From Cart</button> 
        : <button className="btn btn-primary hover:bg-secondary" onClick={()=>dispatch(addToCart(item))}>Add To Cart</button>
      }
      <button className="btn btn-primary hover:bg-accent hover:text-black">Add To Wishlist</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Card