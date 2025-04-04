import React, { useEffect, useContext, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/cartContext";
const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { authedUser, setAuthedUser } = useContext(UserContext);
  const { dispatch, cartItems } = useContext(CartContext);
  const [cart, setCart] = useState({});
  const { fetchCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const user = localStorage.getItem("user")
  const token = localStorage.getItem("user.token");
   useEffect(() => {
    console.log("Performing auth check...");
    axios
      .get("http://localhost:3004/api/authCheck", 
       {
          withCredentials: true,
       })
    .then((res) => {
      if (res.data.msg === "valid token") {
        setAuthedUser({ 
          username: res.data.username,
          userId: res.data.userId,
          token: res.data.token, 
          id: res.data._id,
          cartItems: res.data.cartItems
        })
        setCart(res.data.userId)
        dispatch({ type: "UPDATE_CART", payload: { cartItems: res.data.cartItems || [] } });
      dispatch({ type: "SET_CART_ITEMS", payload:{ cartItems: res.data.cartItems || [] }});

        fetchCart();
        
        console.log("Authenticated user:", res.data); 
    } else {
        navigate("/login");
      }
    })
    .catch((error) => {
      console.error("Auth check error:", error);
      navigate("/login");
    })
    .finally(() => setLoading(false));
}, []);

if (loading) {
  return <div>Loading...</div>;
}
return <Outlet />;
}



// .then((res) => {
//   if (res.data.msg === "valid token") {
//     console.log("authedLogin", res.data);
//     setAuthedUser({
//       username: res.data.user.username,
//       userId: res.data.user.userId,
//       token: res.data.user.token, 
//       role: res.data.user.role, 
//     })// Update cart
//     dispatch({ type: "UPDATE_CART", payload: { cartItems: res.data.cartItems } });
//     navigate("/auth/account");
//     // setAuthedUser(res.data.user); // Use the response user data
//     // setCart(res.data.cartItems);
// fetchCart();
//   } else {
//     console.log("Invalid token, redirecting...");
//     navigate("/login");
//   }
//   })
//   .catch((err) => {
//     console.error("Error during auth check:", err);
//     navigate("/login"); 
//   })
//   .finally(() => setLoading(false));
// }, [setAuthedUser,navigate]);
// if (loading) {
//   return <div>Loading...</div>;
// }
// return (
//   <Outlet/>
// )
// return authedUser ? (
//   <Outlet />
// ) : (
//   <navigate to="account" replace />
// );
// };


export default ProtectedRoute;
