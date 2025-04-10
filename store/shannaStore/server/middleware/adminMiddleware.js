const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
app.use(express.json());

app.use(cookieParser())

const Admin = require('../models/admin.Model')



const adminAuth = (req, res, next) => {
 
 
  const adminToken = req.cookies.adminToken || req.cookies.admintoken || 
  (req.headers.authorization && req.headers.authorization.split(" ")[1]);

console.log("Received token in middleware:", adminToken); 

if (!adminToken) {
  return res.status(401).json({ message: "Unauthorized: No token provided" });
}

  try {
    const adminDecoded = jwt.verify(adminToken, process.env.ADMIN_KEY);
    req.admin = adminDecoded; 
      console.log("Admin authenticated:", adminDecoded);

      next();
    } catch (err) {
      console.error("Token verification failed:", err);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };
  module.exports = {adminAuth};
 