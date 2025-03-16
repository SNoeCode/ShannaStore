const mongoose = require("mongoose");
const Cart = require("../models/cart.Model");
const User = require("../models/user.Model");
const {
  getCart,
  updateCartItem,
  clearCart,
} = require("../controllers/cart.controller");
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
  CartUpdate,
  Google,
} = require("../controllers/user.Controller");
const { auth, MiddleWare,isAdmin } = require("../middleware/middleware");

module.exports = (app) => {
  app.post("/api/signup", Signup);
  app.get("/api/cart/:userId", auth, fetchCart);
 
  app.post("/api/:userId/addToCart", MiddleWare, addToCart);

  
  app.post("/api/login", Login);
  app.post("/api/logout", MiddleWare, Logout);
  app.post("/api/:userId/saveCart", MiddleWare, saveCart);
  app.get("/api/user-authCheck", MiddleWare, AuthCheck);
  app.get("/api/admin-authCheck",isAdmin,MiddleWare, AuthCheck);
  

  app.put("/api/cart/update/:userId", auth, updateCartItems);

  app.delete("/api/remove/:userId", auth, removeCartItem);


};
