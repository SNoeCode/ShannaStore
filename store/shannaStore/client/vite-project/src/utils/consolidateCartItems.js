import { CartContext } from "../context/cartContext";
import {useContext} from  'react'
const consolidateCartItems = (items) => {
  const { cartItems } = useContext(CartContext);
    return items.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.productId === item.productId);
  
      if (existingItem) {
        // If item exists, sum the quantities
        existingItem.quantity += item.quantity;
      } else {
        // Otherwise, add it to the accumulator
        acc.push({ ...item });
      }
  
      return acc;
    }, []);
  };


// Consolidate cart items before calculating quantity
// const consolidatedCartItems = consolidateCartItems(cartItems);

// const cartQuantity = consolidatedCartItems
//   ? consolidatedCartItems.reduce((total, item) => total + item.quantity, 0)
//   : 0;

// console.log("Cart Quantity:", cartQuantity);

export default consolidateCartItems