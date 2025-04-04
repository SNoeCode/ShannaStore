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
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import Checkout from "./pages/Checkout/Checkout";
import Payment from "./components/Payment/Payment";
import ProtectedAdminRoute from './admin/AdminLogin/ProtectedAdminRoute';
import AdminLogin from "./admin/AdminLogin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard/AdminDashboard";

const App = () => {
  const [username, setUsername] = useState(null);
  const [authedUser, setAuthedUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") ?? null);
  const [cartItems, setCartItems] = useState([]);
  const role = useState(localStorage.getItem("role") ?? null);
  const isUserLoggedIn = !!localStorage.getItem("token");

  // const { useFetchCart } = useContext(CartContext);

  return (
    <>
    
        <Navbar />
        <ShoppingCart />
        <Routes>

          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<ProtectedAdminRoute />}>
            <Route path="admin-dashboard" element={<AdminDashboard />} />
          </Route>


          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="categories/:category" element={<CategoriesPage />} />
          <Route path="product-detail/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/*" element={<ProtectedRoute />}>
            <Route path="account" element={<Account />} />
            {/* <Route path="cart" element={<Cart />} /> */}

          </Route>
          <Route path="/auth/*" element={<ProtectedRoute />}>
          <Route path="payment" element={<Payment />} />

         
          </Route>
          <Route path="/auth/*" element={<ProtectedRoute />}>
            <Route path="my-cart" element={<Cart />} />
        
          </Route>
        
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
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
