

import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useCallback,
} from "react";
import axios from "axios";
import cartReducer from "../context/cartReducer";
import { UserContext } from "../context/UserContext";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { authedUser,updatedAuthedUser } = useContext(UserContext);
  const getLocalCartItems = () => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (!storedCartItems || storedCartItems === "undefined") {
      return [];
    }
    try {
      return JSON.parse(storedCartItems);
    } catch (error) {
      console.error("Error parsing cart items from localStorage:", error);
      return [];
    }
  };
  const initialState = {
    userId: authedUser?.userId || null,
    cartItems: Array.isArray(getLocalCartItems()) ? getLocalCartItems() : [],
    isCartOpen: false,
    loading: false,
  };
  //   const initialState = {
  //   userId: authedUser?.userId || null,
  //   cartItems:[],
  //     isCartOpen: false,
  //   loading: true,

  // };

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
    const [state, dispatch] = useReducer(cartReducer, initialState);
    
    const token = localStorage.getItem('authedUser?.token')
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  }, [state.cartItems]);
  useEffect(() => {
    if (authedUser?.userId && authedUser.token) {
      fetchCart(authedUser.userId, authedUser.token);
    }
  }, [authedUser]);

  const fetchCart = async (userId) => {
    if (!userId) return;

    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await axios.get(
        `http://localhost:3004/api/cart/${userId}`,
        {
          headers: { 'Authorization': `Bearer ${token}`},
          withCredentials: true,
        }
      );

      const rawCartItems = response.data.cartItems || [];
      console.log("fetched cart", rawCartItems);
      const consolidatedCartItems = consolidateCartItems(rawCartItems);

      dispatch({
        type: "UPDATE_CART",
        payload: { cartItems: consolidatedCartItems },
      });
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
      if (quantity <= 0) {
        // Remove the item if quantity is 0
        await removeCartItem(productId);
        return;
      }
      const response = await axios.put(
        `http://localhost:3004/api/cart/update/${userId}`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${
              authedUser?.token || localStorage.getItem("token")
            }`,
          },
          withCredentials: true,
        }
      );

      // const updatedCartItems = consolidateCartItems(response.data.cartItems);
      const updatedCartItems = response.data.cartItems;
      // dispatch({ type: "SET_CART_ITEMS", payload: updatedCartItems });
      dispatch({ type: "SET_CART_ITEMS", payload: updatedCartItems });
      dispatch({ type: "INCREMENT", payload: productId });
      dispatch({ type: "DECREMENT", payload: productId });
      // dispatch({ type: "REMOVE_FROM_CART", payload: productId });
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const handleQuantityChange = async (productId, changeType) => {
    if (authedUser.userId) {
      dispatch({
        type: changeType === "increment" ? "INCREMENT" : "DECREMENT",
        payload: { productId },
      });
      dispatch({
        type: changeType === "decrement" ? "DECREMENT" : "INCREMENT",
        payload: { productId },
      });
      dispatch({
        type: changeType === "REMOVE_FROM_CART",
        payload: { productId },
      });
      return;
    }
  };

  const addItem = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const incrementItem = useCallback(
    (productId) => {
      const currentItem = state.cartItems.find(
        (item) => item.productId === productId
      );
      if (currentItem && authedUser?.userId) {
        updateCartItemQuantity(
          productId,
          authedUser.userId,
          currentItem.quantity + 1
        );
      }
    },
    [updateCartItemQuantity, state.cartItems, authedUser]
  );
  // const incrementItem = useCallback((productId) => {
  //   const currentItem = state.cartItems.find(
  //     item => item.productId === productId
  //   );

  //   if (currentItem) {
  //     updateCartItemQuantity(
  //       productId,
  //       currentItem.quantity + 1
  //     );
  //   }
  // }, [state.cartItems, updateCartItemQuantity]);
  // const decrementItem = (productId) => {
  // dispatch({ type: "DECREMENT", payload: { productId } });
  // };
  const decrementItem = useCallback(
    (productId) => {
      const currentItem = state.cartItems.find(
        (item) => item.productId === productId
      );
      if (currentItem && authedUser?.userId) {
        updateCartItemQuantity(
          productId,
          authedUser.userId,
          currentItem.quantity - 1
        );
      }
    },
    [updateCartItemQuantity, state.cartItems, authedUser]
  );
  // const removeItem = useCallback((productId) => {
  //     const currentItem = state.cartItems.find(
  //       item => item.productId === productId
  //     );

  //     if (currentItem === 0) {
  //       dispatch({ type: "REMOVE_FROM_CART", payload: { productId } })
  //     }
  //   }, [state.cartItems, updateCartItemQuantity]);
  const removeCartItem = async (productId,userId)=> {
    try {
      const response = await axios.delete(
        `http://localhost:3004/api/remove/${userId}`,
       {
          
          withCredentials: true,
        }
      );
      // console.log(
      //   "Authorization Token:",
      //   authedUser?.token || localStorage.getItem("token")
      // );
      const rawCartItems = response.data.cartItems || [];
      // console.log("fetched cart", rawCartItems);
   
            const consolidatedCartItems = consolidateCartItems(rawCartItems);
      // const updatedCartItems = response.data.cartItems;
      dispatch({
        type: "REMOVE_FROM_CART",
        payload:{ productId},
      });

      console.log("Cart items after removal:", rawCartItems);
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // const removeFromCart =useCallback((productId) => {
  //   dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
  // )}
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
        removeCartItem,
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
