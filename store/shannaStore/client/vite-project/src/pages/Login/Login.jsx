import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/cartContext";

import Captcha from "../../Image/clipart-captcha-code-1-512x512-61ae.png";

const Login = () => {
  const { authedUser, setAuthedUser } =
    useContext(UserContext);
  const { dispatch, fetchCart } = useContext(CartContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
 
  // const [authedUser, setAuthedUser] = useState(null);
  const [userInputValue, setUserInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  


    let cartItems = [];
    const storedCartItems = localStorage.getItem("cartItems");
    if (!storedCartItems && storedCartItems == "undefined") {
      try {
        cartItems = JSON.parse(storedCartItems);
        cartItems = Array.isArray(cartItems) ? cartItems : [];

      } catch (error) {
        console.error("Error parsing cartItems:", error);
      }
    }
    useEffect(() => {
      if (authedUser?.user?.cartItems && state.cartItems.length === 0) {
        console.log("Setting cart from login response:", authedUser.user.cartItems);
        dispatch({
          type: "UPDATE_CART",
          payload: { cartItems: authedUser.user.cartItems },
        });
    
        localStorage.setItem("cartItems", JSON.stringify(authedUser.user.cartItems));
      }
    }, [authedUser]);
    
    let wishlist = [];
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist && storedWishlist !== "undefined") {
      try {
        wishlist = JSON.parse(storedWishlist);
      } catch (error) {
        console.error("Error parsing wishlist:", error);
      }
    }


  const handleLogin = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    const verificationCode = "just example";
    if (userInputValue !== verificationCode) return;
  
      
    setCredentials((prev) => {
      console.log("prev", prev);
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  }
  const handleConfirmLogin = async ({ cartItems }) => {
    try {
      const response = await axios.post(
        "http://localhost:3004/api/login",
        credentials, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });


      setCart(response.data.cartItems);

  const userData = response.data.user;
  setAuthedUser({
    username: userData.username,
    token: response.data.token || "",
    id:userData._id,
    role: userData.role,
    userId: userData.userId,
    cartItems: userData.cartItems,
   productId: userData.productId
  });
  localStorage.setItem("username", userData.username);
  localStorage.setItem("token", response.data.token || "");


 
    localStorage.setItem("userId", userData.userId);
    // localStorage.setItem("username", user.username);
    localStorage.setItem("id", userData._id);
    localStorage.setItem("role", userData.role);
    localStorage.setItem("cartItems", JSON.stringify(userData.cartItems || []));
    localStorage.setItem("wishlist", JSON.stringify(userData.wislist || []));

    // Update cart context
    dispatch({ type: "UPDATE_CART", payload: { cartItems: userData.cartItems || [] } });
    fetchCart(); // Fetch updated cart

    alert("User Logged In");
    navigate("/auth/account"); // Redirect after login

  // } else {
  //   setError("Login failed. Please check your credentials.");
  
} catch (error) {
  console.error("Login error:", error);
  setError("Login failed. Please check your credentials and try again.");
}
};



  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUserInputValue("");
  };

  return (
    <>
      <div className="user-image-container">
        <div className="user-login-container">
          <h2
            style={{
              mt: "150px",
              color: "#C2181A",
              fontWeight: "500",
              fontSize: "20px",
            }}
          >
            <b>Welcome Back! Please Login!</b>
          </h2>

          <form className="user-login-form" onSubmit={handleLogin}>
            <div className="user-form-group">
              <label>Username:</label>
              <input
                id="username"
                type="text"
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
            </div>
            <div className="user-form-group">
              <label>Password:</label>
              <input
                id="password"
                type="password"
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                required
              />
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" className="user-login-button">
              Login
            </button>
            <p className="user-sign-up">
              No Account?
              <a
                href="/signup"
                onClick={() => navigate("/signup")}
                id="sign-up-hover"
              >
                <span>Sign up?</span>
              </a>
            </p>
           
            <div>
              <button type="button">Sign in with Google</button>
            </div>
          </form>
     
        </div>
        {isModalOpen && (
          <div className="user-modal">
            <div className="user-modal-content">
              <h2>Verification Required</h2>
              <h3>Please type in captcha to continue</h3>
              <label htmlFor="prompt-input">
                <div className="user-modal-img-container">
                  <img src={Captcha} alt="Captcha" />
                </div>
              </label>
              <input
                id="prompt-input"
                type="text"
                value={userInputValue}
                onChange={(e) => setUserInputValue(e.target.value)}
              />
              <div className="user-modal-buttons">
                <button
                  type="submit"
                  onClick={handleConfirmLogin}
                  className="user-confirm-button"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCloseModal}
                  className="user-cancel-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          
          </div>
        )}
        <div>
      
        </div>
      </div>
    </>
  );
};

export default Login;
