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
const { auth, MiddleWare, adminAuth } = require("../middleware/middleware");


  router.post("/api/signup", Signup);
  router.get("/api/cart/:userId", auth, fetchCart);

  router.post("/api/:userId/addToCart", MiddleWare, addToCart);


  router.post("/login", Login);
  router.post("/api/logout", MiddleWare, Logout);
  router.post("/api/:userId/saveCart", MiddleWare, saveCart);
  router.get("/user/auth", MiddleWare, AuthCheck);


  router.put("/api/cart/update/:userId", auth, updateCartItems);

  router.delete("/api/remove/:userId", auth, removeCartItem);

  // router.get('/api/admin', adminAuth, isAdmin)
  // router.post("/api/admin-login", AdminLogin);

module.exports = router;
