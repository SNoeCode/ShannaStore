


import React, { createContext, useReducer, useEffect, useContext,useState } from "react";
import axios from "axios";
import cartReducer from "../context/cartReducer";
import { UserContext } from "../context/UserContext";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { authedUser } = useContext(UserContext);
  const token = authedUser?.token || localStorage.getItem("token");

  const initialState = {
    userId: localStorage.getItem("userId") || null,
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    isCartOpen: false,
  };
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const fetchCart = async () => {
    if (!authedUser?.userId || !token) {
      console.error("UserID or token is missing.");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:3004/api/cart/${authedUser.userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({
        type: "UPDATE_CART",
        payload: { cartItems: response.data.cartItems },
      });
      localStorage.setItem("cartItems", JSON.stringify(response.data.cartItems));
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };
  const addToCart = async (productId, quantity = 1) => {
    if (!token) {
      alert("Please log in to add items to the cart.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3003/api/cart/addToCart",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({ type: "ADD_TO_CART", payload: { items: response.data.cart.items } });
      localStorage.setItem("cartItems", JSON.stringify(response.data.cart.items));
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  const saveCartToBackend = async () => {
    if (!authedUser?.userId || !token) {
      console.error("Cannot save cart without authentication.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3004/api/cart/saveCart",
        {
          userId: authedUser.userId,
          cartItems: state.cartItems,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Cart saved:", response.data);
      dispatch({ type: "UPDATE_CART", payload: { cartItems: response.data.updatedCart.cartItems } });
      localStorage.setItem("cartItems", JSON.stringify(response.data.updatedCart.cartItems));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

return (
  <CartContext.Provider
    value={{
      state,
      dispatch,
      cartItems: state.cartItems,
      addToCart,
      fetchCart,
      saveCartToBackend,
      isCartOpen: state.isCartOpen,
      toggleCart: () => dispatch({ type: "TOGGLE_CART" }),
    }}
  >
    {children}
  </CartContext.Provider>
);
};
export default CartProvider;


