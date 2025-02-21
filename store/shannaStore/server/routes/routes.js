const mongoose = require("mongoose");
const User = require("../models/user.Model");
const Cart = require("../models/cart.Model");
const Products = require("../models/product.Model");

const {
  addToCart,
  fetchCart,
  saveCart,
  Signup,
  Login,
  getUserId,
  GetUsers,
  AuthCheck,
  Logout,
  Google,
} = require("../controllers/user.Controller");
const MiddleWare = require("../middleware/middleware");
const verifyJWT = require("../middleware/authenticate");

module.exports = (app) => {
  app.post("/api/signup", Signup);
  app.post("/api/:userId/addToCart", MiddleWare, addToCart);
  app.get("/api/cart/:id", verifyJWT, fetchCart);
  app.get("/api/cart/:userId", verifyJWT, getUserId);
  app.post("/api/login", Login);
  app.post("/api/logout", verifyJWT, Logout);
  app.post("/api/cart/saveCart", verifyJWT, saveCart);
  app.get("/api/user/getUsers", verifyJWT, GetUsers);
  app.get("/authCheck", AuthCheck);
};
