import React, { useEffect, useContext, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/cartContext";
const ProtectedAdminRoute = () => {
  const navigate = useNavigate();
  const { authedUser, setAuthedUser } = useContext(UserContext);

  const { fetchCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const handleConfirmLogin = async ({ cartItems }) => {
    try {
      const loginResponse = await axios.post(
        "http://localhost:3004/api/login",
        credentials,
        {
          withCredentials: true,
        }
      );

      console.log("res", loginResponse.data);
      const user = loginResponse.data.found;
      const authToken = loginResponse.data.found.token;
      setCart(loginResponse.data.found.cartItems);

      setAuthedUser(user);
      localStorage.setItem("role", user.role);
      localStorage.setItem("token", authToken);
      localStorage.setItem("userId", user.userId);
      localStorage.setItem("username", user.username);
      localStorage.setItem("cartId", user.cartId);
      localStorage.setItem("_id", user._id);
      localStorage.setItem("cartItems", JSON.stringify(user.cartItems || []));

      localStorage.setItem("wishlist", JSON.stringify(user.wishlist || []));
      console.log("user", user);
      const userId = user.userId;
      dispatch({
        type: "UPDATE_CART",
        payload: { cartItems },
      });

      fetchCart();
    } catch (error) {
      console.error("Error during login:", error);
      setError("Login failed. Please check your credentials and try again.");
    }
    alert("User Logged In");
    navigate("/auth");
  };
  
  useEffect(() => {
    console.log("Performing auth check...");
    axios
      .get("http://localhost:3004/api/admin-authCheck", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.msg === "valid token") {
          setAuthedUser({
            username: res.data.username,
            userId: res.data.userId,
            token: res.data.token,
            cartItems: res.data.cartItems,
            role: res.data.role,
          });
          console.log("Authenticated user:", res.data);
        } else {
          console.log("Invalid token, redirecting to login...");
          navigate("/login");
        }
      })
      //hanlde errors
      .catch((err) => {
        console.error("Error during auth check:", err);
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate, setAuthedUser]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return <Outlet />;
};

export default ProtectedAdminRoute;
