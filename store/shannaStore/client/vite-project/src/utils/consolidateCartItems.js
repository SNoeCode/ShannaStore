import { CartContext } from "../context/cartContext";
import {useContext} from  'react'
const consolidateCartItems = (items) => {
  const { cartItems } = useContext(CartContext);
    return items.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.productId === item.productId);
  
      if (existingItem) {
      
        existingItem.quantity += item.quantity;
      } else {
       
        acc.push({ ...item });
      }
  
      return acc;
    }, []);
  };


/