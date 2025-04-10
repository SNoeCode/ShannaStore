import React, { useContext, useEffect, useCallback } from "react";
import { CartContext } from "../../context/cartContext";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./ShoppingCart.css";

const ShoppingCart = () => {
  const {
    isCartOpen,
    toggleCart,
    updateCartItemQuantity,
    incrementItem,
dispatch,
    decrementItem,
    removeCartItem,
    state: { cartItems = [], loading },
    fetchCart,
  } = useContext(CartContext);
const userId = localStorage.getItem("userId");
  const { authedUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authedUser) {
      console.log("Fetching cart for user:", authedUser.user);
      
      fetchCart(authedUser?.userId, authedUser.token);

    }
  }, [authedUser]);

  const handleCheckout = useCallback(() => {
    navigate("/auth/checkout");
  }, [navigate]);


  const handleIncrement = async (productId) => {
   
    const currentItem = cartItems.find((item) => item.productId === productId);
    if (currentItem) {
      try {
        await updateCartItemQuantity(productId, currentItem.quantity + 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItems || []));
      } catch (error) {
        console.error("Error incrementing item quantity:", error);
      }
    }
  };
  
  
  const handleDecrement = async (productId) => {
    const currentItem = cartItems.find((item) => item.productId === productId);
    if (currentItem) {
      try {
        if (currentItem.quantity > 1) {
         
          await updateCartItemQuantity(productId, currentItem.quantity - 1);
          localStorage.setItem("cartItems", JSON.stringify(cartItems || []));
        } else {
          await handleRemove(productId);
        }
      
      } catch (error) {
        console.error("Error decrementing item quantity:", error);
      }
    }
  };
  
  

  const handleRemove = async(productId) => {
    
      try {
        const userId = authedUser?.userId || localStorage.getItem("userId"); // Ensure valid userId
        
        if (!userId || typeof userId !== "string" || userId.length !== 24) {
          console.error("Invalid userId:", userId);
          return;
        }
    
    
    const currentItem = cartItems.find((item) => item.productId === productId);

    if (!currentItem) {
      console.error("Item not found in the cart.");
      return;
    }
    await removeCartItem(productId, authedUser.userId);
    dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
  } catch (error) {
    console.error("Error removing item:", error);
  }
};
const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  if (!isCartOpen) return null;

  return (
    <div className="cart" id="cart">
    <h2 className="my-cart"></h2>
      <div className="cart-content">
        <div className="cart-head">
          <div title="Close" className="close-btn" onClick={toggleCart}>
          X
          </div>
        </div>
        <div className="cart-container">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.productId} className="shopping-cart">
                <div className="cart-item">
                
                  <img src={item?.image} alt={item.title} className="cart-item-img" />

                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                  </div>
                
                  <div className="price-section">
                    <span className="item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
               
                </div>
                  <span>
                <div className="btn-container">

                    <button
                      className="add"
                      onClick={() => handleIncrement(item.productId)}
                      >
                      +
                    </button>
                    <p className="quantity">Quantity: {item.quantity}</p>
                    <button
                      className="minus"
                      onClick={() => handleDecrement(item.productId)}
                      >
                    -
                    </button>
                 
                  </div>
                    </span>

              </div>
            ))
          ) : (
            <p className="empty">Your cart is empty</p>
          )}
          <h2 className="total">Total: ${calculateTotal()}</h2>
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;

