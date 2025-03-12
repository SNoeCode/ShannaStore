// import React, { createContext, useReducer, useEffect, useContext, useState, useCallback } from "react";
// import axios from "axios";
// import cartReducer from "../context/cartReducer";
// import { UserContext } from "../context/UserContext";

// export const CartContext = createContext(null);

// export const CartProvider = ({ children }) => {
//   const { authedUser, setAuthedUser } = useContext(UserContext);
// const token = localStorage.getItem('token')
// const userId = localStorage.getItem('userId')

//   //  const getLocalCartItems = () => {
//   //   const storedCartItems = localStorage.getItem("cartItems");
//   //   if (!storedCartItems) {
//   //     // If there's no data in localStorage, return an empty array
//   //     return [];
//   //   }
//   //   try {
//   //     return JSON.parse(storedCartItems) || []; 
//   //   } catch (error) {
//   //     console.error("Error parsing cart items from localStorage:", error);
//   //     return []; 
//   //   }
//   // };


//   // const getLocalCartItems = () => {
//   //   try {
//   //     const storedCartItems = localStorage.getItem("cartItems");
//   //     return storedCartItems ? JSON.parse(storedCartItems) : [];
//   //   } catch (error) {
//   //     console.error("Error parsing cart items from localStorage:", error);
//   //     return [];
//   //   }
//   // };
//   const initialState = {
//     userId: authedUser?.userId || null,
//     cartItems: Array.isArray(getLocalCartItems()) ? getLocalCartItems() : [],
//     isCartOpen: false,
//     loading: true,
    
//   };

//   const [state, dispatch] = useReducer(cartReducer, initialState);

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//   }, [state.cartItems]);

 
//   // useEffect(() => {
//   //   if (authedUser?.userId && authedUser.token) {
//   //     fetchCart(authedUser.userId, authedUser.token);
//   //   }
//   // }, [authedUser]);
//   useEffect(() => {
//     if (authedUser?.userId && authedUser.token) {
//       fetchCart(authedUser.userId, authedUser.token);
//       console.log("Fetching cart for user:", authedUser.userId);
//     }
//   }, [authedUser]);
//   const getLocalCartItems = () => {
//     const storedCartItems = localStorage.getItem("cartItems");
//     if (!storedCartItems || storedCartItems === "undefined") {
//         return []; // Return empty array if no valid data
//     }
//     try {
//         return JSON.parse(storedCartItems);
//     } catch (error) {
//         console.error("Error parsing cart items from localStorage:", error);
//         return [];
//     }
//   }
//   // const fetchCart = async (userId, token) => {
//   //   if (!userId) return;

//   //   try {
//   //     const response = await axios.get(`http://localhost:3004/api/cart/${userId}`, {
//   //       headers: { Authorization: `Bearer ${token}` },
//   //       withCredentials: true,
//   //     });

//   //     const cartItems = response.data.cartItems || [];
//   //     dispatch({ type: "UPDATE_CART", payload: { cartItems } });
//   //   } catch (error) {
//   //     console.error("Error fetching cart:", error);
//   //   }
//   // };

//   const consolidateCartItems = (items) => {
//     return items.reduce((acc, item) => {
//       const existingItem = acc.find((i) => i.productId === item.productId);
  
//       if (existingItem) {
//         existingItem.quantity += item.quantity;
//       } else {
//         acc.push({ ...item });
//       }
  
//       return acc;
//     }, []);
//   }
  
//   const fetchCart = async (userId, token) => {
//     if (!userId) return;
//   }

//   dispatch({ type: "SET_LOADING", payload: true })
//     try {
//       const response = await axios.get(`http://localhost:3004/api/cart/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       });
  
//       const rawCartItems = response.data.cartItems || [];
//       console.log("Fetched raw cart items:", rawCartItems);
  
//       const consolidatedCartItems = consolidateCartItems(rawCartItems);
//       console.log("Consolidated cart items:", consolidatedCartItems);
  
//       dispatch({ type: "UPDATE_CART", payload: { cartItems: consolidatedCartItems } });
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     } finally {
//       dispatch({ type: "SET_LOADING", payload: false }); // Stop loading
//     }
//   }  

// //   const updateCartItemQuantity = async (productId, userId, quantity) => {
// //     if (typeof userId !== "string" || userId.length !== 24) {
// //       console.error("Invalid userId:", userId);
// //       return; 
// //     }
  
// //     try {
// //       const response = await axios.put(
// //         `http://localhost:3004/api/cart/update/${userId}`,
// //         { productId, quantity },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem("token")}`,
// //           },
// //           withCredentials: true,
// //         }
// //       );
  
// //       const updatedCartItems = response.data.cartItems;
// //       dispatch({
// //         type: "SET_CART_ITEMS",
// //         payload: updatedCartItems,
// //       });
  
// //       console.log("Cart item successfully updated:", updatedCartItems);
// //     } catch (error) {
// //       console.error("Error updating cart item:", error);
// //     }
// //   };


//   const handleQuantityChange = async (productId, userId, changeType) => {
//     if (!authedUser) {
       
//         dispatch({
//             type: changeType === 'increment' ? 'INCREMENT' : 'DECREMENT',
//             payload: { productId },
//         });
//         return;
//     }
// };


// // const updateCartItemQuantity = async (productId, userId, quantity) => {
// //   if (typeof userId !== "string" || userId.length !== 24) {
// //     console.error("Invalid userId:", userId);
// //     return;
// //   }

// //   try {
// //     const response = await axios.put(
// //       `http://localhost:3004/api/cart/update/${userId}`,
// //       { productId, quantity },
// //       {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// //         },
// //         withCredentials: true,
// //       }
// //     );

// //     const updatedCartItems = consolidateCartItems(response.data.cartItems);
// //     console.log("Consolidated Cart Items After Update:", updatedCartItems);

// //     dispatch({
// //       type: "SET_CART_ITEMS",
// //       payload: updatedCartItems,
// //     });
// //   } catch (error) {
// //     console.error("Error updating cart item:", error);
// //   }
// // };
// const updateCartItemQuantity = async (productId, userId, quantity) => {
//   if (typeof userId !== "string" || userId.length !== 24) {
    
//     return;
//   }

//   try {
//     const response = await axios.put(
//       `http://localhost:3004/api/cart/update/${userId}`,
//       { productId, quantity },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         withCredentials: true,
//       }
//     );

//     const updatedCartItems = consolidateCartItems(response.data.cartItems);
//     console.log("Consolidated Cart Items After Update:", updatedCartItems);

//     dispatch({
//       type: "SET_CART_ITEMS",
//       payload: updatedCartItems,
//     });
//   } catch (error) {
//     console.error("Error updating cart item:", error);
//   }
// }
//   const addItem = (product) => {
//     dispatch({ type: "ADD_ITEM", payload: product });
//   };

//   const incrementItem = useCallback((productId) => {
//     const currentItem = state.cartItems.find(
//       item => item.productId === productId
//     );
    
//     if (currentItem) {
//       updateCartItemQuantity(
//         productId, 
//         currentItem.quantity + 1
//       );
//     }
//   }, [state.cartItems, updateCartItemQuantity]);

//   const decrementItem = (productId) => {
//     dispatch({ type: "DECREMENT", payload: { productId } });
//   };

//   const toggleCart = () => {
//     dispatch({ type: "TOGGLE_CART" });
//   };

//   const clearCart = () => {
//     dispatch({ type: "CLEAR_CART" });
//   };

//   const removeFromCart = (productId) => {
//     dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         state,
//         clearCart,
//         dispatch,
//         removeFromCart,
//         cartItems: state.cartItems,
//         addItem,
//         updateCartItemQuantity,
//         decrementItem,
//         incrementItem,
//         handleQuantityChange,
//         fetchCart,
//         isCartOpen: state.isCartOpen,
//         toggleCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartProvider;


import React, { createContext, useReducer, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import cartReducer from "../context/cartReducer";
import { UserContext } from "../context/UserContext";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { authedUser } = useContext(UserContext);

  const getLocalCartItems = () => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (!storedCartItems || storedCartItems === "undefined") {
      // Return an empty array if there's no valid data
      return [];
    }
    try {
      return JSON.parse(storedCartItems);
    } catch (error) {
      console.error("Error parsing cart items from localStorage:", error);
      return [];
    }
  };

  const consolidateCartItems = (items) =>
    items.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);

  const initialState = {
    userId: authedUser?.userId || null,
    cartItems: getLocalCartItems(),
    isCartOpen: false,
    loading: false,
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Save cartItems to localStorage whenever they are updated
  // useEffect(() => {
  //   localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  // }, [state.cartItems]);

  // // Fetch cart items when the user logs in
  // useEffect(() => {
  //   if (authedUser?.userId && authedUser.token) {
  //     fetchCart(authedUser.userId, authedUser.token);
  //   }
  // }, [authedUser]);

  const fetchCart = async (userId, token) => {
    if (!userId) return;

    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await axios.get(`http://localhost:3004/api/cart/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const rawCartItems = response.data.cartItems || [];
      const consolidatedCartItems = consolidateCartItems(rawCartItems);
      dispatch({ type: "UPDATE_CART", payload: { cartItems: consolidatedCartItems } });
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const updateCartItemQuantity = async (productId, userId, quantity) => {
    if (!userId || typeof userId !== "string" || userId.length !== 24) {
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3004/api/cart/update/${userId}`,
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        }
      );

      const updatedCartItems = consolidateCartItems(response.data.cartItems);
      dispatch({ type: "SET_CART_ITEMS", payload: updatedCartItems });
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const handleQuantityChange = (productId, changeType) => {
    if (!authedUser) {
      dispatch({
        type: changeType === "increment" ? "INCREMENT" : "DECREMENT",
        payload: { productId },
      });
      return;
    }
  };

  const addItem = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  // const incrementItem = useCallback(
  //   (productId) => {
  //     const currentItem = state.cartItems.find((item) => item.productId === productId);
  //     if (currentItem) {
  //       updateCartItemQuantity(productId, authedUser.userId, currentItem.quantity + 1);
  //     }
  //   },
  //   [state.cartItems, authedUser.userId]
  // );
  const incrementItem = useCallback((productId) => {
    const currentItem = state.cartItems.find(
      item => item.productId === productId
    );
    
    if (currentItem) {
      updateCartItemQuantity(
        productId, 
        currentItem.quantity + 1
      );
    }
  }, [state.cartItems, updateCartItemQuantity]);
  const decrementItem = (productId) => {
    dispatch({ type: "DECREMENT", payload: { productId } });
  };

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        cartItems: state.cartItems,
        isCartOpen: state.isCartOpen,
        loading: state.loading,
        addItem,
        incrementItem,
        decrementItem,
        clearCart,
        removeFromCart,
        updateCartItemQuantity,
        handleQuantityChange,
        toggleCart,
        fetchCart,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
