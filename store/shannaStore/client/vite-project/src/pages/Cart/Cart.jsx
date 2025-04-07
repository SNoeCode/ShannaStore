import React, {useContext} from "react";
import "./Cart.css";
import { CartContext } from "../../context/cartContext";
import { UserContext } from "../../context/UserContext";
const Cart = () => {
  const {
    state: { cartItems = [], loading },
    fetchCart,
  } = useContext(CartContext);

  return (
    <>
    <div className="cart-items-container">
      <br/>
      <br/>
      <br/>


      <br/>
      <br/>

      <br/>
      <br/>
    <h1 className="h1cart">Cart Items</h1>
    
      
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.productId}>
            <h3>{item.title}</h3>
            <img src={item.image} alt={item.title} className="image"/>
          </div>
        ))
      ) : (
        <p>No items in the cart.</p>
      )}
      </div>
      <h2>SHnanna Noe</h2>
    </>
  );
};

export default Cart;
