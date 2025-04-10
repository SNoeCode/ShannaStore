const cartReducer = (state, action) => {

  
  switch (action.type) {
    case "TOGGLE_CART":
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
      case "SET_CART":
  return {
    ...state,
    cartItems: action.payload,
  };
      case "SET_CART_ITEMS":
        return {
          ...state,
          cartItems: action.payload,
          loading: false,
          error: null
        };
        case "UPDATE_CART_ITEM_QUANTITY":
          return {
            ...state,
            cartItems: state.cartItems.map((item) => 
              item.productId === action.payload.productId
                ? { ...item, quantity: action.payload.quantity }
                : item
            ),
             };
   
   
      case "UPDATE_CART":
        console.log("Updating cart with items:", action.payload.cartItems);
        return {
          ...state,
          cartItems: action.payload.cartItems,
        };
      
      
        case "ADD_ITEM": {
          const existingItemIndex = state.cartItems.findIndex(
            (item) => item.productId === action.payload.productId
          );
        
          if (existingItemIndex !== -1) {
            return {
              ...state,
              cartItems: state.cartItems.map((item, index) =>
                index === existingItemIndex
                  ? { ...item, quantity: item.quantity + action.payload.quantity }
                  : item
              ),
            };
          } else {
            return {
              ...state,
              cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
            };
          }
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
                product.productId === action.payload.productId
              ? { ...product, quantity: Math.max(product.quantity - 1, 1) }
              : product
            ),
          };
          case "SET_LOADING":
            return {
              ...state,
              loading: action.payload,
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
            
        