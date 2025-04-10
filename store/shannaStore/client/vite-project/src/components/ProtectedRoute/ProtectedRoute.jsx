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
  const token = localStorage.getItem("token");

useEffect(() => {
  console.log("Performing auth check...");

  axios.get("http://localhost:3004/api/authCheck", { headers: { Authorization: `Bearer ${token}` }, 
    withCredentials: true,
  })

    .then((res) => {
      console.log("Auth check response:", res.data);
      if (res.data.msg === "valid token") {
        // Preserve cart items by merging existing ones if cart is empty
        const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        const newCartItems = res.data.user?.cartItems && res.data.user?.cartItems.length > 0 
          ? res.data.user?.cartItems 
          : storedCart;

        setAuthedUser({
          username: res.data.user?.username,
          userId: res.data.user?.userId,
          token: res.data.user?.token,
          id: res.data.user?._id,
          cartItems: newCartItems,
        });

        dispatch({
          type: "UPDATE_CART",
          payload: { cartItems: newCartItems },
        });

        if (res.data.user?.userId) {
          localStorage.setItem("userId", res.data.user?.userId); // Store the user ID properly
        }
        
        localStorage.setItem("cartItems", JSON.stringify(newCartItems));
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

export default ProtectedRoute;