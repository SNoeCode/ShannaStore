

require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
// const router = express.Router();
const Admin = require("../models/admin.Model");
const Cart = require("../models/cart.Model");
const User = require("../models/user.Model");
const { adminLogin, isAdmin,adminLogout } = require("../controllers/admin.controller");
 const {adminAuth} = require("../middleware/adminMiddleware");
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

module.exports = (app) => {
  app.post("/api/signup", Signup);
  app.get("/api/cart/:userId", auth, fetchCart);

  app.post("/api/:userId/addToCart", auth, addToCart);


  app.post("/api/login", Login);
  app.post("/api/logout", auth, Logout);
  // app.post("/api/:userId/saveCart", MiddleWare, saveCart);
  // app.get("/user/auth", auth, AuthCheck);

app.get("/api/authCheck", auth, AuthCheck);
  app.put("/api/cart/update/:userId",auth, updateCartItems);

  app.post("/api/admin-logout", adminLogout);
  app.delete("/api/remove/:userId/:productId", auth, removeCartItem);
  
  app.get("/api/admin", adminAuth, isAdmin);


  app.post("/api/admin-login", adminLogin);

  // app.post("/api/create-payment-intent", async (req, res) => {
  //   try {
  //     const paymentIntent = await stripe.paymentIntents.create({
  //       amount: 5000, // $50.00
  //       currency: "usd",
  //       payment_method_types: ["card"],
  //     });
  
  //     res.json({ clientSecret: paymentIntent.client_secret });
  //   } catch (error) {
  //     console.error("Stripe Error:", error);
  //     res.status(500).json({ error: error.message });
  //   }
  // });
  // app.post('/api/create-payment-intent', async (req, res) => {
  //   try {
  //     const { amount, currency } = req.body;
  
  //     // Validate input (example)
  //     if (!amount || !currency) {
  //       return res.status(400).send({ error: 'Amount and currency are required.' });
  //     }
  //     if (amount <= 0) {
  //       return res.status(400).send({ error: 'Invalid amount.' });
  //     }
  
  //     const paymentIntent = await stripe.paymentIntents.create({
  //       amount,
  //       currency,
  //     });
  
  //     res.send({ clientSecret: paymentIntent.client_secret });
  //   } catch (error) {
  //     console.error('Error creating payment intent:', error);
  //     res.status(500).send({ error: 'Failed to create payment intent.' });
  //   }
  // });
}

