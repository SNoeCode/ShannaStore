import React, { useEffect, useContext, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/cartContext";
const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { authedUser, setAuthedUser } = useContext(UserContext);
  const {dispatch,cartItems } = useContext(CartContext);
  const [cart, setCart] = useState({});
  const { fetchCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const user = localStorage.getItem("user")

  useEffect(() => {
    console.log("Performing auth check...");
    axios
      .get("http://localhost:3004/api/user/auth", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.msg === "valid token") {
          console.log("authedLogin", res.data);
          setAuthedUser(res.data.user); // Use the response user data
          setCart(res.data.cartItems);  // Update cart
          dispatch({ type: "UPDATE_CART", payload: { cartItems: res.data.cartItems } });
        } else {
          console.log("Invalid token, redirecting...");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("Error during auth check:", err);
        navigate("/login"); 
      })
      .finally(() => setLoading(false));
    }, [setAuthedUser]);
    if (loading) {
      return <div>Loading...</div>;
    }
    return authedUser ? (
      <Outlet />
    ) : (
      <navigate to="/auth/account" replace />
    );
  };
      

export default ProtectedRoute;
