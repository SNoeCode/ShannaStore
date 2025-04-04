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

  app.post("/api/:userId/addToCart", MiddleWare, addToCart);


  app.post("/api/login", Login);
  app.post("/api/logout", auth, Logout);
  // app.post("/api/:userId/saveCart", MiddleWare, saveCart);
  // app.get("/user/auth", auth, AuthCheck);

app.get("/api/authCheck", auth, AuthCheck);
  app.put("/api/cart/update/:userId", MiddleWare, updateCartItems);

  app.post("/api/admin-logout", adminLogout);
  app.delete("/api/remove/:userId", auth, removeCartItem);
  // app.get("/api/admin", adminAuth, isAdmin);
  app.get("/api/admin", adminAuth, isAdmin);


  // app.get('/api/admin', adminAuth, isAdmin)
  // app.get('/api/admin', async (req, res) => {
  //   const { username, password } = req.body;
  
  //   if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
  //     const token = jwt.sign({ admin_username: username }, process.env.ADMIN_KEY, {
  //       expiresIn: "1d"
  //     });
  
  //     res.cookie("adminToken", token, {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === "production",
  //       sameSite: "strict",
  //     });
  
  //     return res.status(200).json({ msg: "Admin logged in", token });
  //   } else {
  //     return res.status(401).json({ msg: "Invalid credentials" });
  //   }
  // });
  app.post("/api/admin-login", adminLogin);
  // app.post("/api/admin-logout", auth, adminLogout);

}
// module.exports = router;
