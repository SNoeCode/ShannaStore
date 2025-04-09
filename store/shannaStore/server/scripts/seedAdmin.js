require("dotenv").config();

console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("ADMIN_USERNAME:", process.env.ADMIN_USERNAME);
console.log("ADMIN_PASSWORD:", process.env.ADMIN_PASSWORD);
console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
console.log("ADMIN_KEY:", process.env.ADMIN_KEY);

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("../models/admin.Model"); // adjust path if needed

const MONGO_URI = "mongodb://localhost:27017/store"; // your local DB
const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existingAdmin = await Admin.findOne({
      admin_username: process.env.ADMIN_USERNAME,
    });

    if (existingAdmin) {
      console.log("Admin user already exists. Skipping seed.");
      return mongoose.connection.close();
    }

    const isAdminPasswordValid =  await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const admin = new Admin({
      admin_username: process.env.ADMIN_USERNAME,
      admin_email: process.env.ADMIN_EMAIL,
      admin_password: isAdminPasswordValid,
      admin_role: "admin",
    });

    await admin.save();
    console.log("Admin user seeded to MongoDB.");
    mongoose.connection.close();
  } catch (err) {
    console.error("Failed to seed admin:", err);
    mongoose.connection.close();
  }
};

seedAdmin();
