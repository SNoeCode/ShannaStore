import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Wishlist from "./pages/Wishlist/Wishlist";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import ContactUs from "./pages/ContactUs/ContactUs";
import Login from "./pages/Login/Login";
import Footer from "./components/Footer/Footer";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Account from "./pages/Account/Account";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import Cart from "./pages/Cart/Cart";
import { CartContext } from "./context/cartContext";
import { UserContext } from "./context/UserContext";

import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import Checkout from "./pages/Checkout/Checkout";
import Payment from "./components/Payment/Payment";

const App = () => {
  const [username, setUsername] = useState(null);
  const [authedUser, setAuthedUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("userToken") ?? null);
  const [cartItems, setCartItems] = useState([]);
  const { updateAuthedUser } = useContext(UserContext);
  const isUserLoggedIn = !!localStorage.getItem("token");

  // const { useFetchCart } = useContext(CartContext);



  return (
    <>
      <Navbar />
        <ShoppingCart />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setAuthedUser={authedUser} />} />
        <Route path="/" element={<Home />} />
        <Route path="categories/:category" element={<CategoriesPage />} />
        <Route path="product-detail/:id" element={<ProductDetails />} />
        <Route path="/account" element={<Account setAuthedUser={authedUser} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="cart" element={<ShoppingCart />} />
      </Routes>

      <div
        style={{
          // minHeight: "50vh",
          display: "flex",
          flexDirection: "column",
        }}
      />

      <Footer />
    </>
  );
};
export default App;
