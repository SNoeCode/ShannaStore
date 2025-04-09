require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const adminRouter = require("./routes/adminRoutes");

const Router = require("./routes/routes");

const app = express();
const port = process.env.port || 5000;
const jwt = require("jsonwebtoken");
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);
  console.log("Loaded STRIPE key:", process.env.STRIPE_SECRET_KEY);
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173", "http://localhost:5175"],
    methods: "GET, POST, PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);
Router(app)

app.post("/api/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000, // Amount in cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("connected");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
