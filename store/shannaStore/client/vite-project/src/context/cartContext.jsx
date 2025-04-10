import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useCallback,
  useState
} from "react";
import axios from "axios";
import cartReducer from "../context/cartReducer";
import { UserContext } from "../context/UserContext";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { setAuthedUser, authedUser } = useContext(UserContext);
  const [cartTotal, setCartTotal] = useState(0)
 
  const userId = authedUser?.userId || localStorage.getItem("userId");
  let savedCartItems = [];
  try {
    const raw = localStorage.getItem("cartItems");
    if (raw && raw !== "undefined") {
      savedCartItems = JSON.parse(raw);
    }
  } catch (e) {
    console.error("Failed to parse cartItems from localStorage:", e);
  }
 
  
  
  const initialState = {
    isCartOpen: false,
    cartItems: savedCartItems,
    loading: false,
    error: null,
  };



  const [state, dispatch] = useReducer(cartReducer, initialState);
  useEffect(() => {
    setCartTotal(calculateTotal(state.cartItems));
  }, [state.cartItems]);
  useEffect(() => {
    try {
      if (Array.isArray(state.cartItems) && state.cartItems.length > 0) {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    } catch (error) {
      console.error("Failed to save cartItems to localStorage:", error);
    }
  }, [state.cartItems]);
  
  const cartQuantity = Array.isArray(state.cartItems)
    ? state.cartItems.reduce((total, item) => total + (item.quantity || 0), 0)
    : 0;
    useEffect(() => {
   
  
    let savedCartItems = [];
    try {
      const raw = localStorage.getItem("cartItems");
      if (raw && raw !== "undefined") {
        savedCartItems = JSON.parse(raw);
      }
    } catch (e) {
      console.error("Failed to parse cartItems from localStorage:", e);
      localStorage.removeItem("cartItems"); // Clear corrupted storage
    }
      let parsedCart = [];
  
    if (savedCartItems && savedCartItems !== "undefined") {
      try {
        parsedCart = JSON.parse(savedCartItems);
        dispatch({ type: "UPDATE_CART", payload: { cartItems: parsedCart } });
      } catch (e) {
        console.error("Failed to parse cartItems:", e);
      }
    }
  }, []);
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("authedUser"));
      if (storedUser) {
        setAuthedUser(storedUser);
      }
    }, []);
  
    useEffect(() => {
      const savedCartItems = localStorage.getItem("cartItems");
      if (savedCartItems && savedCartItems !== "undefined") {
        dispatch({ type: "UPDATE_CART", payload: { cartItems: JSON.parse(savedCartItems) } });
      }
    }, []);
  const token = authedUser?.token || localStorage.getItem("token");
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        description: product.description,
        category: product.category,
      },
    });
  };
 
  const fetchCart = async () => {
    const token = authedUser?.token || localStorage.getItem("token");
  
  let userId = authedUser?.userId || localStorage.getItem("userId");

  
   
    if (!userId) {
      console.error("Invalid userId:", userId);
      return;
    }

    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await axios.get(
        `http://localhost:3004/api/cart/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
          withCredentials: true,
      }
      );
console.log("Sending request to backend...", { userId });

      dispatch({
        type: "UPDATE_CART",
        payload: {
          cartItems: Array.isArray(response.data.cartItems)
            ? response.data.cartItems
            : [],
        },
      });
      localStorage.setItem("cartItems", JSON.stringify(response.data.cartItems ||  []));
      console.log("Fetched cart items:", response.data.cartItems);  

    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };


  const addItem = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };


  const removeCartItem = async (productId, userId) => {
    console.log("Removing item:", productId, "User ID:", userId);
    console.log("Attempting to remove item:", productId);
    console.log("User ID before request:", authedUser?._id);
    if (!userId || typeof userId !== "string" || userId.length !== 24) {
      console.error("Invalid userId:", userId);
      return;
    }
  
    try {
      await axios.delete(`http://localhost:3004/api/remove/${userId}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  
  const handleIncrement = (productId) => {
    const currentItem = cartItems.find((item) => item.productId === productId);
    if (currentItem) {
      incrementItem(productId);
    }
  };



  const handleDecrement = (productId) => {
    const currentItem = cartItems.find((item) => item.productId === productId);
    if (currentItem) {
      decrementItem(productId); 
    }
  };
  


const updateCartItemQuantity = async (productId, quantity) => {
  if (!productId || isNaN(quantity) || quantity <= 0) {
    console.error("Invalid quantity:", quantity);
    return;
}

  
  const token = authedUser?.token || localStorage.getItem("token");
  console.log("User ID before making request:", userId);
  

  if (!userId || typeof userId !== "string" || userId.length !== 24) {
    console.error("Invalid userId:", userId);
    return;
  }
  const cleanedUserId = typeof userId === "string" ? userId : String(userId);
  console.log("Sending request to backend...", { productId, userId, quantity });

  try {
    if (quantity <= 1) {
      try {
        await removeCartItem(productId,quantity);
      } catch (err) {
        console.error("Error removing cart item:", err);
      }
      return;
    }
    const response = await axios.put(
      `http://localhost:3004/api/cart/update/${cleanedUserId}`,
      { productId, quantity},
      { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
    );
    console.log("PUT URL:", `http://localhost:3004/api/cart/update/${cleanedUserId}`);
    console.log("Backend response:", response.data);
    dispatch({
      type: "UPDATE_CART",
      payload: { cartItems: response.data.cartItems, quantity },
    });
    localStorage.setItem("cartItems", JSON.stringify(response.data.cartItems || []));
  } catch (error) {
    console.error("Error updating cart item in backend:", error.response?.data || error);
  }
};

 
  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  const incrementItem = (id) => {
    dispatch({ type: "INCREMENT", payload: id });
  };
  const decrementItem = (id) => {
    dispatch({ type: "DECREMENT", payload: id });
  };

  const calculateTotal = () => {
    return state.cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };
  console.log("cart total", calculateTotal())


  return (
    <CartContext.Provider
      value={{
        state,
        cartItems: state.cartItems,
        isCartOpen: state.isCartOpen,
        loading: state.loading,
        cartQuantity,
        addItem,
        incrementItem,
        decrementItem,
        clearCart,
        removeCartItem,
        updateCartItemQuantity,
        toggleCart,
        fetchCart,
        dispatch,
     
        cartTotal,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;