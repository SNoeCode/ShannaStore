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
      .get("http://localhost:3004/api/authCheck", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.msg === "valid token") {
          console.log("authedLogin", res.data);
          setAuthedUser(res.data.user); // Use the response user data
          setCart(res.data.user.cartItems);  // Update cart
          dispatch({ type: "UPDATE_CART", payload: { cartItems: res.data.cartItems } });
          navigate("account");
      
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
      <navigate to="account" replace />
    );
  };
      

export default ProtectedRoute;
