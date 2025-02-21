const cartReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_CART":
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    case "UPDATE_CART":
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };
    case "ADD_ITEM": {
      const newCartItem = action.payload.product;
      if (!newCartItem) {
        console.error("Invalid product payload");
        return state;
      }

      const existingItemIndex = state.cartItems.findIndex(
        (product) => product.productId === newCartItem.productId
      );

      let updatedCartItems;
      if (existingItemIndex !== -1) {
      
        updatedCartItems = state.cartItems.map((product, index) =>
          index === existingItemIndex
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      } else {
   
        updatedCartItems = [...state.cartItems, { ...newCartItem, quantity: 1 }];
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product.productId !== action.payload.productId
        ),
      };
    case "INCREMENT":
      return {
        ...state,
        cartItems: state.cartItems.map((product) =>
          product.productId === action.payload.productId
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
      };
    case "DECREMENT":
      return {
        ...state,
        cartItems: state.cartItems.map((product) =>
          item.productId === action.payload.productId
            ? { ...product, quantity: product.quantity - 1 }
            : product
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
