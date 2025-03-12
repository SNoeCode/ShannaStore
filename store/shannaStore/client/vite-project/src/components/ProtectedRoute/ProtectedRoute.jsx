
import React, { useEffect, useContext,useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/cartContext";
const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { authedUser, setAuthedUser } = useContext(UserContext);
  
  const { fetchCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Performing auth check...");
    axios.get("http://localhost:3004/api/authCheck", { withCredentials: true })
      .then((res) => {
      
        if (res.data.msg === "valid token") {
         
          setAuthedUser({
            username: res.data.username,
            userId: res.data.userId,
            token: res.data.token,
            cartItems: res.data.cartItems,

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
      }).finally(() => {
      
        setLoading(false);
      })
  }, [navigate, setAuthedUser]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
  
   <Outlet/>
 
  );
};

export default ProtectedRoute