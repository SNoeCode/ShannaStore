import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getProducts } from "../../config/api";
import "./ShoppingCart.css";

const ShoppingCart = (props) => {
  const {
    isCartOpen,
    cartItems,
    toggleCart,
    incrementItem,
    decrementItem,
    dispatch,
  } = useContext(CartContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);
  if (!isCartOpen) return null;
  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
  }, []);
  const addToCart = (cartItems) => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart && storedCart.trim()) {
      cartItems = JSON.parse(storedCart);
    } else {
      cartItems = [];
    }

    cartItems.push(productId);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");

    if (storedCart && storedCart.trim()) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error("Error parsing cart data:", error);

        localStorage.removeItem("cartItems");
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }, []);

  return (
    <div className="cart" id="cart">
      <h2 className="my-cart">My Cart ({cartItems.length})</h2>
      <div className="cart-content">
        <div className="cart-head">
          <div title="Close" className="close-btn" onClick={toggleCart}>
            Close &times;
          </div>
        </div>
        <div className="cart-container">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.productId} className="shopping-cart">
                <div className="cart-item">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item-img"
                  />
                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                  </div>
                  <div className="btn-container">
                    <button
                      className="add"
                      onClick={() => incrementItem(item.productId)}
                    >
                      +
                    </button>
                    <p className="quantity">Quantity: {item.quantity}</p>
                    <button
                      className="minus"
                      onClick={() => decrementItem(item.productId)}
                    >
                      -
                    </button>
                  </div>
                  <p className="price">Price: ${item.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="empty">Your cart is empty</p>
          )}
          <h2 className="total">
            Total: $
            {cartItems.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            )}
          </h2>
          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
export default ShoppingCart;
