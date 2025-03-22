import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { getProducts, getCategories } from "../../config/api.js";
import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { CartContext } from "../../context/cartContext";
import { UserContext } from "../../context/UserContext";
// import consolidateCartItems from '/src/utils/consolidateCartItems.js';
const Navbar = () => {
  const { cartItems, addItem, setCartItems, toggleCart, dispatch, clearCart } =
    useContext(CartContext);
  const { authedUser, setAuthedUser, updatedAuthedUser } =
    useContext(UserContext);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [products, setProducts] = useState([]);
  const username = localStorage.getItem("username");
  const isUserSignedIn = localStorage.getItem("token");
  // const cartQuantity = cartItems ? cartItems.length : 0;

  console.log("Cart Items in Navbar:", cartItems);
  const cartQuantity = cartItems
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;
  console.log("Cart Quantity:", cartQuantity);

  const navigate = useNavigate();

  const handleSignedOut = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
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

  return (
    <>
      <div className="container-navbar">
        <nav className="navbar">
          <ul className="navbar-links">
            <li>
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

            <li>
              <button onClick={() => handleNavigation("/contact-us")}>
                Contact Us
              </button>
            </li>

         
            <div className="searchbar-container">
              <SearchBar />
              <button>Search</button>
            </div>
            <ul>
              {isUserSignedIn && username ? (
                <>
                  <span>
                    <li>Hi, {username}</li>
                    <li>
                      <Link to="/auth/account">Account</Link>
                    </li>

                    <li>
                      <button className="signout-btn" onClick={handleSignedOut}>
                        Sign Out
                      </button>
                    </li>
                  </span>
                </>
              ) : (
                <>
                  <Link to="/signup">
                    <li>Signup</li>
                  </Link>
                  <Link to="/login">
                    <li>Login</li>
                  </Link>
                </>
              )}
            </ul>
            <li>
              <Link to="admin-login">
              <button onClick={() => handleNavigation("/admin-login")}>Admin</button>              
              </Link>
            </li>
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
