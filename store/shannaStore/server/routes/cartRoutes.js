// const mongoose = require("mongoose");
// const express = require("express");
// const router = express.Router();



// const {
//   fetchCart,
//   removeCartItem,
//   addToCart,
//   saveCart,
//   updateCartItems,
  
// } = require("../controllers/user.Controller");
// const { auth, MiddleWare, adminAuth } = require("../middleware/middleware");

// module.exports = (app) => {
 
//   router.get("/cart/:userId", auth, fetchCart);

//   router.post("/api/:userId/addToCart", MiddleWare, addToCart);



//   router.post("/api/:userId/saveCart", MiddleWare, saveCart);
//   router.get("/api/user/auth", MiddleWare, AuthCheck);


//   router.put("/cart/update/:userId", auth, updateCartItems);

//   router.delete("/remove/:userId", auth, removeCartItem);

 

// };