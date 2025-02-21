const express = require("express");
const mongoose = require("mongoose");
const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/routes");
const User = require("./controllers/user.Controller");
require("dotenv").config();
const app = express();
const port = process.env.port || 5000;
const serviceAccount = require("./firebaseServiceAccountKey.json");
const jwt = require("jsonwebtoken");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    methods: "GET, POST, PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

app.options("/auth/login", (req, res) => {
  res.status(204).send();
});
app.use(cookieParser());
router(app);
app.post("/api/google", async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email, name, picture } = decodedToken;

    let user = await User.findOne({ googleId: uid });
    if (!user) {
      user = new User({
        googleId: uid,
        username: name,
        email: email,
        photoURL: picture,
      });
      await user.save();
    }

    const authToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({ user, token: authToken });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    res.status(401).json({ error: "Invalid Google token" });
  }
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("connected");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
