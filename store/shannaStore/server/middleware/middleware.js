const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
app.use(express.json());
//Parses cookies into 'req.cookie instead of from the headers
app.use(cookieParser())
const MiddleWare = (req, res, next) => {
  // Use req.cookies if available
  const token = req.cookies.token; // Adjust 'token' to your cookie's name
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
    next(); // pass control to the next middleware
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};


//the differnece in these two is that middleware checks username and id, where auth does not
//i had to create auth bc they were gonna be in my users secured user page and they need authentication to know what toodo belonged to who 

const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Attach decoded user info to request
    return res.json({ msg: "valid token", user: decoded, token });
  } catch (err) {
    next();
    console.error("Token verification failed:", err);
    res.status(401).json({ msg: "Unauthorized: Invalid token" });
  }
};

module.exports = {auth, MiddleWare};
