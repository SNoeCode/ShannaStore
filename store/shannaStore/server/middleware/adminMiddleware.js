const jwt = require("jsonwebtoken");
const express = require("express");
// const app = express();
// app.use(express.json());
const Admin = require('../models/admin.Model')
//  const isAdmin = async (req, res, next) => {
//   try {
//     const admin = await Admin.findById(req.body.role);
//     if (admin.role !== "admin") {
//       return res.status(401).send({
//         success: false,
//         message: msg === "validated",
//       });
//     } else {
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(401).send({
//       success: false,
//       error,
//       message: "Error in admin middelware",
//     });
//   }
// };

const adminAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(adminToken, process.env.ADMIN_KEY)
    req.admin = decoded; // Attach decoded user info to request
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ msg: "Unauthorized: Invalid token" });
  }
};
module.exports = {adminAuth};
