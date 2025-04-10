const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
app.use(express.json());

app.use(cookieParser())
const MiddleWare = (req, res, next) => {
 
  const token = req.cookies.token; 
  if (!token) {
    console.log("No token cookie provided");
    return res.status(401).json({ msg: "No cookie provided" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded.username || !decoded.id) {
      return res.status(401).json({ msg: "Bad token" });
    }
    req.user = decoded;
    console.log("Good login");
    next(); 
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};



const auth = (req, res, next) => {
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  console.log("Auth middleware – req.params before:", req.params);
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; 
    next(); 
    // console.log("Actual Middleware Auth middleware – req.params before:", req.params);
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ msg: "Unauthorized: Invalid token" });
  }
};


module.exports = {auth, MiddleWare};
