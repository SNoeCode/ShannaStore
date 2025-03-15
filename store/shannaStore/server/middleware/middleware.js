const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
app.use(express.json());
const MiddleWare = (req, res, next) => {
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
  const token = req.cookies.token;
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
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
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
module.exports = {auth, MiddleWare,isAdmin};
