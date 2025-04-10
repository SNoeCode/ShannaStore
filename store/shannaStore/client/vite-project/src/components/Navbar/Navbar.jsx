import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { getProducts, getCategories } from "../../config/api.js";
import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { CartContext } from "../../context/cartContext";
import { UserContext } from "../../context/UserContext";
import { AdminContext } from "../../context/AdminContext";

// import consolidateCartItems from '/src/utils/consolidateCartItems.js';
const Navbar = () => {
  const { state, cartItems = [], addItem, fetchCart, toggleCart, dispatch, clearCart } =
    useContext(CartContext);
  const { authedUser, setAuthedUser, updatedAuthedUser } =
    useContext(UserContext);
  const { userAdmin, setUserAdmin } =
    useContext(AdminContext);
  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");
  // const cartQuantity = cartItems
  // ? cartItems.reduce((total, item) => total + item.quantity, 0)
  // : 0;
  // useEffect(() => {
  //   fetchCart();
  // }, []);
  const cartQuantity = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + (item.quantity || 0), 0)
    : 0;
  useEffect(() => {
    // if (authedUser?.user?.cartItems) {
    if (authedUser?.user?.cartItems) {

      console.log("Setting cart from login response:", authedUser.user.cartItems);
      dispatch({
        type: "UPDATE_CART",
        payload: { cartItems: authedUser.user.cartItems },
      });

      // Save to localStorage for persistence
      localStorage.setItem("cartItems", JSON.stringify(authedUser.user.cartItems));
    }
  }, [authedUser]);


  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const cartQuantity = cartItems ? cartItems.length : 0;
  const [products, setProducts] = useState([]);
  const username = localStorage.getItem("username");
  const isUserSignedIn = localStorage.getItem("token");
  const isAdminSignedIn = localStorage.getItem("adminToken");
  const adminUsername = localStorage.getItem("adminUsername");
  const userId = localStorage.getItem('userId')
  useEffect(() => {
    fetchCart();
  }, [authedUser]);
  console.log("Cart Items in Navbar:", cartItems);

  console.log("Cart Quantity:", cartQuantity);


  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  }, [state.cartItems]);


  const navigate = useNavigate();

  const handleSignedOut = async () => {
    try {
      const token = localStorage.getItem("token");
      // 
      // const token = authedUser?.token || localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage. User is already signed out.");
        setAuthedUser(null);
        navigate("/login");
        return;
      }

      // const userId = localStorage.getItem("userId");
      const response = await axios.post(
        `http://localhost:3004/api/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(
        "Before logout state:",
        JSON.parse(JSON.stringify(cartItems))
      );
      localStorage.setItem("cartItems", cartItems);
      clearCart();

      console.log("Logout successful:", response.data);

      localStorage.removeItem("cartItems");
      localStorage.removeItem("_id");
      localStorage.removeItem("username");

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      setAuthedUser(null);

      alert("User Logged Out!");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  const handleAdminLogout = async () => {


    try {
      const adminToken = localStorage.getItem("adminToken");
      if (!adminToken) {
        console.error("No token found in localStorage. User is already signed out.");
        setUserAdmin(null);
        navigate("/");
        return;
      }


      const response = await axios.post(
        `http://localhost:3004/api/admin-logout`,
        {},

        {
          withCredentials: true,
        }
      );



      console.log("Logout successful:", response.data);


      localStorage.removeItem("adminUsername");
      localStorage.removeItem("adminId");
      localStorage.removeItem("adminToken");

      setUserAdmin(null);

      alert("User Logged Out!");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
    getProducts().then((res) => {
      setLoading(true);
      setProducts(res.data);
    });
  }, []);

  const handleSaveCart = () => {
    handleConfirm(setCart);
  };
  const handleSearchClick = (id) => {
    navigate(`/product-detail/${id}`);
  };
  const handleSearchSubmit = () => {
    navigate(`/categories?query=${searchTerm}`);
  };
  const handleNavigation = (path) => {
    navigate(path);
  };
  const Toggle = (path) => {
    navigate('/shopping-cart');
  };
  return (
    <>
      <div className="container-navbar">
        <nav className="navbar">
          <ul className="navbar-links">
            <li className="house-chimney">
              <i
                className="fas fa-house-chimney fa-2x"
                onClick={() => navigate("/")}
              ></i>
            </li>
            <li className="dropdown">
              <button className="dropdown-btn">Categories</button>
              <div className="dropdown-content">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleNavigation(`/categories/${category}`)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </li>

            <li className="contact-li">
              <button onClick={() => handleNavigation("/contact-us")}>
                Contact Us
              </button>
            </li>


            <div className="searchbar-container">
              <SearchBar />
              <button className="searchbar-btn">Search</button>
            </div>
            <ul>
              {isUserSignedIn && username ? (
                <>
                  <span>
                    <li>Hi, {username}</li>
                    <li className="auth-li">
                      <Link to="/auth/account">Account</Link>
                    </li>

                    <li className="signout-btn-li">
                      <button className="signout-btn" onClick={handleSignedOut}>
                        Sign Out
                      </button>
                    </li>
                  </span>
                </>
              ) : (
                <>
                  <div className="sign-div">
<span className="span-login">

                    <Link to="/signup">
                      <li className="signup-li">Signup</li>
                    </Link>
                  {/* </div>
                  <div className="login-div"> */}
                      <Link to="/login">
                      <li className="login-li">Login</li>
                    </Link>
                  </span>
                  </div>
</>
              )}
            </ul>
            {isAdminSignedIn && adminUsername ? (
              <>
                <span>
                  <li className="admin-login-li">Hi, admin</li>
                  <Link to="/admin/admin-dashboard">Admin Dashboard</Link>


                  <li>
                    <button className="admin-logout-btn" onClick={handleAdminLogout}>
                      Logout
                    </button>
                  </li>
                </span>
              </>
            ) : (
              <>
                <div className="admin-login">

                  {/* <button onClick={handleNavigation('admin-login')}> */}
                  <button>

                    <Link to="admin-login">
                      <li className="admin-login-li">Admin</li>
                    </Link>

                  </button>
                </div>
              </>
            )}
            <li className="shopping-cart">
              <i className="fas fa-cart-shopping fa-2x" onClick={toggleCart}>
                <span className="badge">{cartQuantity}</span>
              </i>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default Navbar;
