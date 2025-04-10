

require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
// const router = express.Router();
const Admin = require("../models/admin.Model");
const Cart = require("../models/cart.Model");
const User = require("../models/user.Model");
const Order = require("../models/order.Model");
const Payment = require('../models/payment.Model')
const Customer = require('../models/customer.Model')
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

// const orderController = require("../controllers/orderController");


const { auth, MiddleWare } = require("../middleware/middleware");
const {getCustomers,addCustomer} = require('../controllers/customer.controller')
const {createOrder} = require('../controllers/order.controller')
const {createPayment} = require('../controllers/payment.controller')
module.exports = (app) => {
  app.post("/api/signup", Signup);
  app.post("/api/login", Login);
  app.get("/api/authCheck", auth, AuthCheck);
  app.post("/api/logout", auth, Logout);
  app.get("/api/cart/:userId", auth, fetchCart);
  app.post("/api/:userId/addToCart", auth, addToCart);
  app.put("/api/cart/update/:userId",auth, updateCartItems);
  app.delete("/api/remove/:userId/:productId", auth, removeCartItem);
  
  app.get("/api/admin", adminAuth, isAdmin);
  app.post("/api/admin-login", adminLogin);
  app.post("/api/admin-logout", adminLogout);


  app.post("/api/customers/:customersId", async (req, res) => {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
});
app.patch("/:customerId", async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.customerId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: "Error updating customer data" });
  }
});
app.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }


  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

 
    await Customer.findOneAndUpdate(
      { userId: paymentIntent.metadata.userId },
      { $push: { payments: paymentIntent.id } }
    );

    console.log("Payment success:", paymentIntent.id);
  } else if (event.type === "payment_intent.payment_failed") {
    console.log("Payment failed for:", event.data.object.id);
  }

  res.json({ received: true });
});


app.post("/api/orders", createOrder);
app.get("/api/orders/:customerId", async (req, res) => {
  const orders = await Order.find({ customerId: req.params.customerId });
  res.json(orders);
});
app.post("/api/create-payment", createPayment);
app.get("/api/payment/:customerId", async (req, res) => {
  const payments = await Payment.find({ customerId: req.params.customerId });
  res.json(payments);
});



}

