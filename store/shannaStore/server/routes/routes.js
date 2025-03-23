const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Cart = require("../models/cart.Model");
const User = require("../models/user.Model");

const {
  fetchCart,
  removeCartItem,
  addToCart,
  saveCart,
  updateCartItems,
  Signup,
  Login,
  AuthCheck,
  Logout,
  Google,
} = require("../controllers/user.Controller");
const { auth, MiddleWare } = require("../middleware/middleware");


  router.post("/api/signup", Signup);
  router.get("/api/cart/:userId", auth, fetchCart);

  router.post("/api/:userId/addToCart", MiddleWare, addToCart);


  router.post("/login", Login);
  router.post("/logout", MiddleWare, Logout);
  // router.post("/api/:userId/saveCart", MiddleWare, saveCart);
  // router.get("/user/auth", auth, AuthCheck);

router.get("/authcheck", auth, AuthCheck);
  router.put("/cart/update/:userId", auth, updateCartItems);

  router.delete("/remove/:userId", auth, removeCartItem);

  // router.get('/api/admin', adminAuth, isAdmin)
  // router.post("/api/admin-login", AdminLogin);

module.exports = router;
