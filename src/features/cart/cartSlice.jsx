import { createSlice } from '@reduxjs/toolkit'
import { itemHasDiscount } from '../../utils/discount';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    totalItems : 0,
    cartItems : [],
    totalPrice : 0,
    discounts:{
      availableOn : [
        {
          tripId : 1,
          condition : `more than 3 tickets`,

          // ! norway has a discount on it
          tripText : 'Trip To Norway',
          benefit : '10% of on every ticket',
          discountAfter : 3,
          // ! cannot buy more than 5 tickets

          ticketLimit : 7
        },

        // ! 10 % discount after 3 tickets for norway

        // ! but not beligum
        {
          tripId : 2,

          // ! alaska too has a discount
          tripText : 'Trip To Alaska',
          condition : 'more than 5 tickets',
          benefit : '10% of on every ticket',

          // ! discount will be given after 5 tickets
          discountAfter : 5,

          // ! no limit
          ticketLimit : -1
        }
      ],
     
    },
    finalDiscountsArray :[],
    removedDiscounts: []
   

  },
  reducers: {
    addToCart: (state,{payload})=>{
        

       
        const existingItem = state.cartItems.find((item) => item.text === payload.text);

  if (existingItem) {
    // If the product is already in the cart, increment its quantity
    existingItem.quantity += 1;
  } else {
    // If the product is not in the cart, add it with a quantity of 1
    state.cartItems.push({ ...payload, quantity: 1 });
  }

  // Increment the totalItems count
  state.totalItems += 1;
    },
    removeFromCart: (state,{payload})=>{
        const indexToRemove = state.cartItems.findIndex((item) => item.id === payload.id);
        const itemToRemove = state.cartItems.find((item) => item.id === payload.id);
        console.log(itemToRemove)

        if (indexToRemove !== -1) {
          // If the item is found in the cart, remove it
          state.cartItems.splice(indexToRemove, 1);
      
          // Decrement the totalItems count
          state.totalItems -= itemToRemove.quantity;
        }
    },
    incrementItem: (state,{payload})=>{

      const wasRemovedEarlier = state.removedDiscounts.filter(removedItem=>removedItem.itemId===payload.id)

      console.log(new Set(wasRemovedEarlier))
      
      if(wasRemovedEarlier.length > 0 && !(wasRemovedEarlier[wasRemovedEarlier.length-1].limit===-1)){
        if(payload.quantity > (wasRemovedEarlier[wasRemovedEarlier.length-1].limit - 1)){

          alert(`cannot buy more than ${wasRemovedEarlier[0].limit} tickets`)
          return
        }
        // if()
        console.log('yes was removed earlier')
      }

      const discountDetails = state.discounts.availableOn.filter(discountItem=>discountItem.tripId===payload.id)

      console.log(discountDetails)
        if(wasRemovedEarlier && (payload.quantity > (discountDetails[0]?.ticketLimit - 1))){

          if((discountDetails[0]?.ticketLimit!==-1) && (itemHasDiscount(payload.id,state.finalDiscountsArray).length > 0)){
            alert(`you cannot buy more than ${discountDetails[0]?.ticketLimit} tickets`)
            return;
          }
        }
        
      
        const itemToIncrement = state.cartItems.find((item) => item.text === payload.text);

      if (itemToIncrement) {
        itemToIncrement.quantity += 1;
        state.totalItems += 1;
      }

      console.log(itemToIncrement)

    },
    decrementItem: (state,{payload})=>{
       

        const itemToDecrement = state.cartItems.find((item) => item.text === payload.text);

        if (itemToDecrement) {
            if (itemToDecrement.quantity > 1) {
              itemToDecrement.quantity -= 1;
              state.totalItems -= 1;
            } else {
              // Remove the item if its quantity becomes 0
              const indexToRemove = state.cartItems.findIndex((item) => item.text === payload.text);
              if (indexToRemove !== -1) {
                state.cartItems.splice(indexToRemove, 1);
                state.totalItems -= 1;
              }
            }
          }

    },





    
    computeTotalPrice : (state,{payload})=>{
      const updatedCartItems = state.cartItems.map((item) => {
        const isDiscountAvailable = itemHasDiscount(item.id, state.finalDiscountsArray).length > 0;
      
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

        let totalPrice = 0;
        updatedCartItems.forEach((item) => {
          totalPrice += item?.price; // Assuming each item has a 'price' property
        });

        state.totalPrice = totalPrice;
    },

    // ! this function will be called everytime the cartItems will change.

    //! this is the function that calculates which items are on discount
    checkForDiscounts : (state)=>{
      const discountItems = state.cartItems.map((cartItem)=>{
      const itemsWithDiscounts = state.discounts.availableOn.map((discountItem)=>{
          if(discountItem.tripId===cartItem.id && cartItem.quantity > discountItem.discountAfter){
            return discountItem
          }
        })

        return itemsWithDiscounts
        // return [...new Set(itemsWithDiscounts)]
      }).flat()

 

      state.finalDiscountsArray = discountItems

     

      

      console.log(discountItems)

   // do something to this variable so that I get only unique items
    },

    removeDiscount : (state,{payload})=>{

      console.log(payload)
      
      const {itemId,quantity} = payload;

      const newFinalDiscounts = state.finalDiscountsArray.filter((item) => {
        return item?.tripId !== itemId;
      });

      
      
      return {
        ...state,
        finalDiscountsArray  : newFinalDiscounts,
        removedDiscounts: [...state.removedDiscounts, payload],
      }
    }

  }
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart,incrementItem,decrementItem,computeTotalPrice,checkForDiscounts,removeDiscount } = cartSlice.actions

export default cartSlice.reducer