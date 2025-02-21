import React, { useContext, useEffect, useState } from "react";
import {CartContext} from "../../context/cartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useParams } from 'react-router-dom';

const Cart = () => {
  const {
    
      isCartOpen,
      cartItems,
      toggleCart,
      incrementItem,
      decrementItem,
      
  } = useContext(cartContext);
  const navigate = useNavigate();


  


  return (
    <div className="carts" id="carts">
      <h2 className="my-carts">My Cart ({cartItems.length})</h2>
      <div className="cart-contents">
        <div className="cart-heads">
          <div title="Close" className="close-btn" onClick={toggleCart}> 
             Close &times;
          </div>
        </div>
        <div className="cart-containers">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.productId} className="shopping-carts">
                <div className="cart-items">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item-imgs"
                  />
                  <div className="cart-items-details">
                    <h3>{item.title}</h3>
                  </div>
                  <div className="btn-containers">
                    <button className="add" onClick={() => incrementItem(item.productId)}>
                      +
                    </button>
                    <p className="quantity">Quantity: {item.quantity}</p>
                    <button className="minus" onClick={() => decrementItem(item.productId)}>
                      -
                    </button>
                  </div>
                  <p className="prices">Price: ${item.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No items</p>
        
          )}
          <h2 className="totals">
            Total: $
            {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
          </h2>
          <button className="check-outed-btn" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
