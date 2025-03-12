const express = require("express");
const mongoose = require("mongoose");
const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/routes");
const User = require("./controllers/user.Controller");
const Cart = require('./controllers/cart.controller')
require("dotenv").config();
const app = express();
const port = process.env.port || 5000;
const serviceAccount = require("./firebaseServiceAccountKey.json");
const jwt = require("jsonwebtoken");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173","http://localhost:5175"],
    methods: "GET, POST, PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

app.options("/auth/login", (req, res) => {
  res.status(204).send();
});
app.use(cookieParser());
router(app);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("connected");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
