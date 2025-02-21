 const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require('cookie-parser');

const verifyJWT = (req, res, next) => {

  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });


  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden: Invalid token' });
    req.user = decoded; 
    next(); 
  });
};


module.exports = verifyJWT

