const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
app.use(express.json());
const User = require('../models/user.Model')

const cookieParser = require("cookie-parser");


const MiddleWare = (req, res, next) => {
  const token = req.cookies?.token;

  if (!req.headers.cookie) {
    console.log("NO COOKIE");
    return res.status(401).json({ msg: "No cookie provided" }); 
  } else {
    console.log("$$$$", req.headers.cookie.split("="));
    const split = req.headers.cookie.split("=");
    console.log("SPLIT", split[1]);

    let decoded;
    try {
      decoded = jwt.verify(split[1], process.env.SECRET_KEY);
      console.log("decoded", decoded);

      req.user = decoded;
      if (!decoded.username) {
        return res.status(401).json({ msg: "Bad token" }); 
      } else {
        console.log("good login");
        next(); 
      }
    } catch (err) {
      return res.status(401).json({ msg: "Invalid token" }); 
    }
  }
};
const auth = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ msg: "Unauthorized: Invalid token" });
  }
};
 const isAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.body.role);
    if (admin.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};

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
module.exports = {auth,adminAuth, MiddleWare,isAdmin};
