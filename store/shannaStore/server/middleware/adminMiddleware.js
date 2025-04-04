const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
app.use(express.json());

app.use(cookieParser())

const Admin = require('../models/admin.Model')

// const adminAuth = (req, res, next) => {
//   const adminToken = req.cookies.adminToken;

//   if (!adminToken) {
//       return res.status(401).json({ msg: "Unauthorized: No token provided" });
//   }

//   try {
//       const adminDecoded = jwt.verify(adminToken, process.env.ADMIN_KEY);
//       req.admin = adminDecoded; // Attach admin info to request
//       console.log("Admin authenticated:", adminDecoded);
//       return res.json({ msg: "validated", admin: adminDecoded, adminToken });
//     } catch (err) {
//     next();
//       console.error("Token verification failed:", err);
//       return res.status(401).json({ msg: "Unauthorized: Invalid token" });
//   }
// };

const adminAuth = (req, res, next) => {
 
 
  const adminToken = req.cookies.adminToken || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  console.log("Received token:", adminToken); // Debugging
  
  if (!adminToken) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  
  try {
    const adminDecoded = jwt.verify(adminToken, process.env.ADMIN_KEY);
    req.admin = adminDecoded; // Attach admin info to request
      console.log("Admin authenticated:", adminDecoded);

      next(); // ✅ Pass execution to the next middleware
    } catch (err) {
      console.error("Token verification failed:", err);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };
  module.exports = {adminAuth};
  // const adminToken = req.cookies.adminToken || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

 // if (!adminToken) {
 //     return res.status(401).json({ message: "Unauthorized: No token provided" });
 // }
