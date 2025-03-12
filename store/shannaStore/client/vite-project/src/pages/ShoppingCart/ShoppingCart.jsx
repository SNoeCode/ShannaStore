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
    decrementItem,
    removeFromCart,
    state: { cartItems = [], loading },
    fetchCart,
  } = useContext(CartContext);

  const { authedUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Fetch cart data when authedUser is available
  // useEffect(() => {
  //   if (authedUser) {
  //     fetchCart(authedUser._id, authedUser.token);
  //   }
  // }, [authedUser, fetchCart]);
useEffect(() => {
  if (authedUser) {
    fetchCart(authedUser._id, authedUser.token);
  }
}, [authedUser, fetchCart]);
  // Navigate to the checkout page
  const handleCheckout = useCallback(() => {
    navigate("/checkout");
  }, [navigate]);

  // Increment item quantity
  const handleIncrement = (productId) => {
    const currentItem = cartItems.find((item) => item.productId === productId);
    if (currentItem) {
      incrementItem(productId);
      updateCartItemQuantity(productId, authedUser._id, currentItem.quantity + 1);
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  if (!isCartOpen) return null;

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
                      onClick={() => handleIncrement(item.productId)}
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
                  <div className="price-section">
                    <span className="item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    Remove
                  </button>
                </div>
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



// import React, { useContext, useEffect, useCallback } from "react";
// import { CartContext } from "../../context/cartContext";
// import { useNavigate } from "react-router-dom";
// import "./ShoppingCart.css";
// import { UserContext } from "../../context/UserContext";

// const ShoppingCart = () => {
//   const {
//     isCartOpen,
//     toggleCart,
//     updateCartItemQuantity,
//     handleQuantityChange,
//     incrementItem,
//     decrementItem,
//     removeFromCart,
//     state: { cartItems = [], loading },
    
//     fetchCart,
//   } = useContext(CartContext);

// }
// const { authedUser } = useContext(UserContext);
// const navigate = useNavigate();
// useEffect(() => {
//   if (authedUser) {
//     fetchCart(authedUser._id, authedUser.token);
//   }
// }, [authedUser, fetchCart]);

// // useEffect(() => {
// //   if (authedUser) {
// //     fetchCart();
// //   }
// // }, [authedUser, fetchCart]);

// const handleCheckout = useCallback(() => {
//   navigate("/checkout");
// }, [navigate]);

// const handleIncrement = (productId) => {
//   const currentItem = cartItems.find((item) => item.productId === productId);
//   if (currentItem) {
//     incrementItem(productId);
//     updateCartItemQuantity(productId, authedUser._id, currentItem.quantity + 1);
//   }
// };
// // const handleIncrement = (productId) => {
// //   const currentItem = state.cartItems.find(
// //     (item) => item.productId === productId
// //   );
  
// //   if (currentItem) {
    
// //     incrementItem(productId);
    
    
// //     updateCartItemQuantity(productId, authedUser?._id, currentItem.quantity + 1);
// //   }
// // };

//   // const calculateTotal = () => {
//   //   if (!cartItems || !Array.isArray(cartItems)) return 0;
//   //   return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
//   // }
//   const calculateTotal = () => {
//     return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
//   }
//   // const calculateTotal = () => {
//   //   return state.cartItems.reduce((acc, item) => {
    
//   //     const price = item.price || 0;
//   //     const quantity = item.quantity || 0;
//   //     return acc + (price * quantity);
//   //   }, 0);
//   // };
  
//   if (!isCartOpen) return null;

//   return (
//     <div className="cart" id="cart">
//       <h2 className="my-cart">My Cart ({state.cartItems.length})</h2>
//       <div className="cart-content">
//         <div className="cart-head">
//           <div title="Close" className="close-btn" onClick={toggleCart}>
//             Close &times;
//           </div>
//         </div>
//         <div className="cart-container">
       

// {state.cartItems.length > 0 ? (
//             state.cartItems.map((item) => (              <div key={item.productId} className="shopping-cart">
//                 <div className="cart-item">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="cart-item-img"
//                   />
//                   <div className="cart-item-details">
//                     <h3>{item.title}</h3>
//                   </div>
//                   <div className="btn-container">
//                     <button
//                       className="add"
//                       onClick={() => handleIncrement(item.productId, 'increment')}
//                     >
//                       +
//                     </button>
//                     <p className="quantity">Quantity: {item.quantity}</p>
//                     <button
//                       className="minus"
//                       onClick={() => decrementItem(item.productId)}
//                     >
//                       -
//                     </button>
//                   </div>
//                   <div className="price-section">
//                     {/* <span className="item-price">
//                       ${(item.price * item.quantity).toFixed(2)}
//                     </span> */}
//                       <span className="item-price">
//                       ${(item.price * item.quantity)}
//                     </span>
//                     </div>
//                     <button 
//                       className="remove-btn"
//                       onClick={() => removeFromCart(item.productId)}
//                     >
//                       Remove
//                     </button>
//                   <p className="price">
//                     Price: ${(item.price * item.quantity).toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="empty">Your cart is empty</p>
//           )}
//           <h2 className="total">
//             Total: ${calculateTotal()}
//           </h2>
//           <button className="checkout-btn" onClick={handleCheckout}>
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShoppingCart;



