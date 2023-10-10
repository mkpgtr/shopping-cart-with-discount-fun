export const itemHasDiscount = (itemId,discountList)=>{


 const item =  discountList.filter((discountItem)=>{
    console.log(itemId)
    console.log(discountItem)
    if(discountItem?.tripId===itemId){
        return true
    }else{
        return false
    }

    
   })

   console.log(item)

   return item
}
