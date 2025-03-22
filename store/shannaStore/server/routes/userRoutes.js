// const mongoose = require("mongoose");
// const express = require("express");
// const router = express.Router();



// const {
//   fetchCart,
//   removeCartItem,
//   addToCart,
//   saveCart,
//   updateCartItems,
//   Signup,
//   Login,
//   AuthCheck,
//   Logout,
//   Google,
// } = require("../controllers/user.Controller");
// const { auth, MiddleWare, adminAuth } = require("../middleware/middleware");

// module.exports = (app) => {
//   router.post("/user/signup", Signup);
//   router.post("/user/login", Login);
//   router.post("/user/logout/:id", MiddleWare, Logout);
//   router.get("/user/auth", MiddleWare, AuthCheck);



// //   router.get("/api/cart/:userId", auth, fetchCart);

// //   router.post("/api/:userId/addToCart", MiddleWare, addToCart);


// //   router.post("/api/:userId/saveCart", MiddleWare, saveCart);


// //   router.put("/api/cart/update/:userId", auth, updateCartItems);

// //   router.delete("/api/remove/:userId", auth, removeCartItem);

 

// };// Load environment variables
require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin.Model'); // Adjust this path as needed

// Connect to MongoDB
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) throw new Error("MONGO_URI is not defined in the .env file.");

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected. Seeding Admin...");
        await seedAdmin();
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};

// Seed Admin User
const seedAdmin = async () => {
    try {
        const existingAdmin = await Admin.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log("Admin user already exists.");
            return;
        }

        // Load admin credentials from environment variables
        const username = process.env.ADMIN_USERNAME;
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        if (!username || !email || !password) {
            console.error("Missing admin credentials. Check your .env file.");
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the admin user
        const admin = new Admin({
            username,
            email,
            password: hashedPassword,
            role: 'admin',
            adminId: new mongoose.Types.ObjectId(),
        });

        await admin.save();
        console.log("Admin user created successfully.");
    } catch (error) {
        console.error("Error creating admin user:", error);
    } finally {
        mongoose.connection.close();
    }
};

// Start the script
connectDB();