import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/cartContext";
import {
  FacebookButton,
  FacebookLoginButton,
} from "../../components/FacebookButton/FacebookButton";
import Captcha from "../../Image/clipart-captcha-code-1-512x512-61ae.png";

const Login = () => {
  const { authedUser, setAuthedUser, updatedAuthedUser } =
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

  const token = localStorage.getItem("token");
  // useEffect(() => {
  //   if (authedUser?.userId && authedUser.token) {
  //     fetchCart(authedUser.userId, authedUser.token);
  //   }
  // }, [authedUser]);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const productId = localStorage.getItem("productId");
    const _id = localStorage.getItem("_id");
    const role = localStorage.getItem("role");

    let cartItems = [];
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems && storedCartItems !== "undefined") {
      try {
        cartItems = JSON.parse(storedCartItems);
      } catch (error) {
        console.error("Error parsing cartItems:", error);
      }
    }

    let wishlist = [];
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist && storedWishlist !== "undefined") {
      try {
        wishlist = JSON.parse(storedWishlist);
      } catch (error) {
        console.error("Error parsing wishlist:", error);
      }
    }

    if (userId && username) {
      setAuthedUser({
        userId,
        role,
        _id,
        username,
        token,
        productId,
        cartItems,
        wishlist,
      });
    }
  }, []);

  // useEffect(() => {
  //   console.log("authedUser changed:", authedUser);
  // }, [authedUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    const verificationCode = "just example";
    if (userInputValue !== verificationCode) return;
  };
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
    navigate("/auth/");
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
            <FacebookButton />
            <div>
              <button type="button">Sign in with Google</button>
            </div>
          </form>
          <FacebookLoginButton />
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
