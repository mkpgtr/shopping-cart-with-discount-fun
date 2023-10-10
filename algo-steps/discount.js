// when check discount button is clicked

// Step : 1 => check whether within the cart items there are items which have a discount on them & whether there quantity matches the discount scheme quantity

// Step : 2 => when the discount applies, we can have two options : apply automatically or allow the user to apply it.

// step 3 : let's say we apply it automatically. So : when the discount is applied : it should make necessary changes to the price of the cart Item and then turn the discount flag off. so that any future change in the cart shall not re-apply thre discount once again.



/// Scenario ::

// 1. Let's say we want the discount to apply of product with id : 1 & only when the quantity is more than 4

// which means that : the discount will not apply when quantity is less than 4 or equal to 4. 

// which means that : the discount will be applied at quantity === 5 & will not apply any futher. to bring more clarity, push this product into an array so that we can see discount is applied here.


// / but let's say that this product has quantity 8. then 10% off will be applied on each product.