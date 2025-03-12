import React, { useContext, useEffect, useCallback, useState } from "react";
import { CartContext } from "../../context/cartContext";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useParams } from "react-router-dom";
import './Cart.css'

import { UserContext } from "../../context/UserContext";

const Cart = ({cartItems}) => {
  const {
    isCartOpen,
    toggleCart,
    updateCartItemQuantity,
    incrementItem,
    decrementItem,
    removeFromCart,
    state,
    fetchCart,
  } = useContext(CartContext);
  const { authedUser } = useContext(UserContext);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (authedUser) {
      fetchCart();
    }
  }, [authedUser, fetchCart]);

  const handleCheckout = useCallback(() => {
    navigate("/checkout");
  }, [navigate]);
  const handleIncrement = (productId) => {
    const currentItem = state.cartItems.find(
      item => item.productId === productId
    );
    
    if (currentItem) {
      updateCartItemQuantity(
        productId, 
        currentItem.quantity + 1
      );
    }
  };
  
  const calculateTotal = () => {
    return state.cartItems.reduce((acc, item) => {
    
      const price = item.price || 0;
      const quantity = item.quantity || 0;
      return acc + (price * quantity);
    }, 0);
  };
 
  if (!isCartOpen) return null;
return (
  <div className="cart1" id="cart1">
      <h2 className="my-cart1">My Cart ({state.cartItems.length})</h2>
      <div className="cart-content1">
     
        <div className="cart-container1">
         
{state.cartItems.length > 0 ? (
            state.cartItems.map((item) => (              
            <div key={item.productId} className="shopping-cart1">
                <div className="cart-item1">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item-img1"
                  />
                  <div className="cart-item-details1">
                    <h3>{item.title}</h3>
                  </div>
                  <div className="btn-container1">
                    <button
                      className="add1"
                      onClick={() => handleIncrement(item.productId)}
                    >
                      +
                    </button>
                    <p className="quantity1">Quantity: {item.quantity}</p>
                    <button
                      className="minus1"
                      onClick={() => decrementItem(item.productId)}
                    >
                      -
                    </button>
                  </div>
                  <div className="price-section1">
                    <span className="item-price1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    </div>
                    <button 
                      className="remove-btn1"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      Remove
                    </button>
                  <p className="price1">
                    Price: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="empty1">Your cart is empty</p>
          )}
          <h2 className="total1">
            Total: ${calculateTotal().toFixed(2)}
          </h2>
          <button className="checkout-btn1" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>

  );
};

export default Cart;
