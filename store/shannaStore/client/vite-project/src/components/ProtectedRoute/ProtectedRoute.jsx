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
      if (res.data.msg === "valid token") {
        // Preserve cart items by merging existing ones if cart is empty
        const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        const newCartItems = res.data.cartItems && res.data.cartItems.length > 0 
          ? res.data.cartItems 
          : storedCart;

        setAuthedUser({
          username: res.data.username,
          userId: res.data.userId,
          token: res.data.token,
          id: res.data._id,
          cartItems: newCartItems,
        });

        dispatch({
          type: "UPDATE_CART",
          payload: { cartItems: newCartItems },
        });

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