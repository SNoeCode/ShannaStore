const mongoose = require("mongoose");
const Cart = require("../models/cart.Model");
const User = require("../models/user.Model");
const {
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cart.controller");
const {
  fetchCart,
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
const { auth, MiddleWare } = require("../middleware/middleware");
const verifyJWT = require("../middleware/authenticate");

module.exports = (app) => {
  app.post("/api/signup", Signup);
  app.get("/api/cart/:userId", auth, fetchCart);
 
  app.post("/api/:userId/addToCart", MiddleWare, addToCart);

  
  app.post("/api/login", Login);
  app.post("/api/logout", MiddleWare, Logout);
  app.post("/api/:userId/saveCart", MiddleWare, saveCart);
  app.get("/api/authCheck", MiddleWare, AuthCheck);
  

  app.put("/api/cart/update/:userId", auth, updateCartItems);

  app.delete("/api/remove/:productId", auth, removeCartItem);

  app.delete("/api/clear", auth, clearCart);
};
