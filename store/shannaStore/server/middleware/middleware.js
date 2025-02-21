const jwt = require("jsonwebtoken");

const MiddleWare = (req, res, next) => {
  if (!req.headers.cookie) {
    console.log("NO COOKIE");
    res.json({ msg: "no coookie" });
  } else {
    console.log("$$$$", req.headers.cookie.split("="));
    const split = req.headers.cookie.split("=");
    console.log("SPILT", split[1]);

    const decoded = jwt.verify(split[1], process.env.SECRET_KEY);
    console.log("decoded", decoded);

    req.user = decoded;
    if (!decoded.username) {
      res.json({ msg: "bad token" });
    } else {
      res.json({ msg: "valid token" });
    }
    next();
  }
};

module.exports = MiddleWare;
