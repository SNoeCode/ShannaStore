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
  const { updateAuthedUser } = useContext(UserContext);
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const { saveCartToBackend, setCart } = useContext(CartContext);
  const [username, setUsername] = useState("");
  const [authedUser, setAuthedUser] = useState(null);
  const [password, setPassword] = useState("");
  const [userInputValue, setUserInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [userData, setUserData] = useState({});

  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  // const [cart, setCart] = useState([]);

  // const handleSaveCart = () => {
  //   handleConfirm(setCart);
  // };

  const navigate = useNavigate();

  useEffect(() => {
    if (username && password) {
      setError("");
    }
  }, [username, password]);
//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     const username = localStorage.getItem("username");
//     const token = localStorage.getItem("token");
//     const productId = localStorage.getItem("productId");
//     const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//     const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
// const _id = localStorage.getItem("_id");
//     if (userId && username) {
//       setAuthedUser({
//         userId,
//         _id,
//         username,
//         token,
//         productId,
//         cartItems,
//         wishlist,
//       });
//     }
//   }, [setAuthedUser]);
  useEffect(() => {
    console.log("authedUser changed:", authedUser);
  }, [authedUser]);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLogin = (e) => {
    console.log("login", e.target.value);
    setLogin((prev) => {
      console.log("prev", prev);
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };
  const handleLogin1 = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  
  const handleConfirm = async ({ token, setToken }) => {
    const verificationCode = "just example";
    if (userInputValue !== verificationCode) return;
  const response =
    axios({
      method: "post",
      url: "http://localhost:3004/api/login",
      data:login,
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    })
      .then((response) => {
        console.log("res", response.data);
localStorage.setItem("token", response.data.token);
setUserData(response.data)
    setAuthedUser({
      _id: response.data.found._id,
      userId: response.data.found.userId,
      username: response.data.found.username,
      cartId: response.data.found.cartId,
      token: response.data.found.token,
      cartItems: response.data.found.cartItems || [],
      wishlist: response.data.found.wishlist || []
    });

    localStorage.setItem("userId", response.data.found.userId);
    localStorage.setItem("username",  response.data.found.username);
    localStorage.setItem("cartId",   response.data.found.cartId);
    localStorage.setItem("token",  response.data.found.token);
localStorage.setItem("_id",  response.data.found._id);
    localStorage.setItem("cartItems", JSON.stringify(response.data.found.cartItems || []));
    localStorage.setItem("wishlist", JSON.stringify(response.data.found.wishlist|| []));
        if (response.data.msg === "good login") {

          navigate("/account");
        } else {
          alert("BAD LOGIN");
        }
      })
      .catch((error) => console.log(error));
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

          <form className="user-login-form" onSubmit={handleLogin1}>
            <div className="user-form-group">
              <label>Username: </label>
              <input
                id="username"
                type="text"
                // onChange={(e) => setUsername(e.target.value)}
                onChange={(e) => handleLogin(e)}
                required
                // value={username}
              />
            </div>
            <div className="user-form-group">
              <label>Password: </label>
              <input
                id="password"
                type="password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                onChange={(e) => handleLogin(e)}
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
                  onClick={handleConfirm}
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
      </div>
    </>
  );
};

export default Login;
