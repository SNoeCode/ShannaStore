

// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const Admin = require('../models/admin.Model'); // Adjust this path as needed


// const connectDB = async () => {
//     try {
//         const mongoURI = 'mongodb://localhost:27017/store'; // MongoDB connection string directly
//         await mongoose.connect(mongoURI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("Database connected. Seeding Admin...");
//         await seedAdmin();
//     } catch (error) {
//         console.error("Database connection error:", error);
//         process.exit(1);
//     }
// };

// const seedAdmin = async () => {
//     try {
//         const existingAdmin = await Admin.findOne({ role: 'admin' });
//         if (existingAdmin) {
//             console.log("Admin user already exists.");
//             return;
//         }

       
//         const username = 'admin';
//         const email = 'admin@example.com';
//         const password = 'securepassword';

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const admin = new Admin({
//             username,
//             email,
//             password: hashedPassword,
//             role: 'admin',
//             adminId: new mongoose.Types.ObjectId(),
//         });

//         await admin.save();
//         console.log("Admin user created successfully.");
//     } catch (error) {
//         console.error("Error creating admin user:", error);
//     } finally {
//         mongoose.connection.close();
//     }
// };

require("dotenv").config();

console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("ADMIN_USERNAME:", process.env.ADMIN_USERNAME);
console.log("ADMIN_PASSWORD:", process.env.ADMIN_PASSWORD);
console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
console.log("ADMIN_KEY:", process.env.ADMIN_KEY);

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/admin.Model"); // adjust path if needed

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
    console.log("✅ Admin user seeded to MongoDB.");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Failed to seed admin:", err);
    mongoose.connection.close();
  }
};

seedAdmin();
// connectDB();

// require("dotenv").config(); // Load environment variables from .env

// const mongoose = require("mongoose");
// const Admin = require("./models/Admin"); // Adjust path if needed
// const bcrypt = require("bcrypt"); // Secure password storage

// const seedAdmin = async () => {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/store",{
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         });
        
        
//       // Hash the admin password before storing it
//     const isAdminPasswordValid =  bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

//     const admin = new Admin({
//       admin_username: process.env.ADMIN_USERNAME,
//       admin_email: process.env.ADMIN_EMAIL,
//       admin_password: isAdminPasswordValid, // Store the hashed password
//       admin_role: "admin",
//     });

//     await admin.save();
//     console.log("Admin user created successfully!");

//     mongoose.connection.close();
//   } catch (error) {
//     console.error("Error seeding admin:", error);
//     mongoose.connection.close();
//   }
// };

// seedAdmin();