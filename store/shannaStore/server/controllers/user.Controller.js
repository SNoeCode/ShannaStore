const User = require("../models/user.Model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Signup = (req, res) => {
  console.log("Registration hit", req.body);
  const { name, username, email, password, cartItems } = req.body;
  User.findOne({ username: req.body.username })
    .then((found) => {
      console.log("found", found);
      if (!found) {
        console.log("Unique Username");
        const hash = bcrypt.hashSync(req.body.password, 10);
        console.log("HASH", hash);

        const newUser = new User({
          username: req.body.username,
          password: hash,
          userId: new mongoose.Types.ObjectId(),
          password: hashedPassword,
          userId: new mongoose.Types.ObjectId(),
          _id: new mongoose.Types.ObjectId(),
          cartItems: cartItems || [],
        });

        User.create(newUser).then((created) => {
          console.log("created", created);
        });
      } else {
        console.log("Username TAKEN");
      }
    })
    .catch((err) => console.log(err));
};

//
const getUserId = (req, res) => {
  const paramUserId = req.params.userId;

  if (paramUserId !== tokenUserId) {
    console.log(
      `user id in the token(${tokenUserId}) does not match the one in the url(${paramUserId})`
    );
    return res.status(401).json({ message: "Unauthorized operation" });
  }

  res.json({ cartData: "Some cart data" });
};

const Google = (req, res) => {
  console.log(req.body);
};
const GetUsers = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).populate(
      "cartItems.productId wishlist"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const Logout = async (req, res) => {
  console.log(req.body);

  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
    });

    console.log("User logged out successfully");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Logout failed" });
  }
};

const Login = (req, res) => {
  console.log("login", req.body);
  User.findOne({ username: req.body.username })
    .then((found) => {
      console.log("found", found);
      if (!found) {
        console.log("User not found");
        return res.status(401).json({ message: "User not found" });
      }
      const isPasswordValid = bcrypt.compareSync(
        req.body.password,
        found.password
      );
      if (isPasswordValid) {
        const token = jwt.sign(
          { username: found.username, _id: found._id, userId: found.userId },
          process.env.SECRET_KEY,
          {
            expiresIn: "30d",
          }
        );
        console.log("TOKEN", token);
        res
          .cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000,
          })
          .json({ msg: "good login", found });
      } else {
        console.log("Bad Login");
        res.json({ msg: "Bad LOGIN" });
      }
      let cart = User.findById(found.userId);
      if (!user.userId || !user.cartItems) {
        cart = new User({
          username: newUser.username,

          userId: newUser.userId,

          cartItems: newUser.cartItems || [],
        });
        cart.save();
      }
      User.updateOne({ userId: found.userId }, { cartItems: found.cartItems });
    })
    .catch((error) => {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    });
  res
    .status(200)
    .json({
      message: "Login successful",
      token,
      user: {
        userId: found.userId,
        username: found.username,
        _id: found.id,
        email: found.email,
        cartItems: found.cartItems,
        wishlist: found.wishlist,
        productId: found.productId,
      },
    })

    .catch((error) => {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    });
};

const AuthCheck = (req, res) => {
  console.log("AUTH CHECK, cookies:", req.cookies);
  if (!req.cookies || !req.cookies.token) {
    console.log("no cookie");

    return res.json({ message: "no cookie" });
  } else {
    const token = req.cookies.token;
    console.log("token:", token);

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      return res.json({ msg: "bad token" });
    }
    console.log("decoded:", decoded);

    User.findById(decoded._id)
      .then((found) => {
        console.log("found", found);
        res.json({ message: "valid token", found });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Server error" });
      });
    console.log("AUTH CHECK finished");
  }
};

const saveCart = (req, res) => {
  const { userId, cartItems } = req.body;

  const token = jwt.sign(
    { userId: userId, cartItems: cartItems },
    process.env.JWT_SECRET,
    { expiresIn: "90d" }
  );
  console.log("Token generated:", token);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",

    maxAge: 3600000,
  });
  res.json({ message: "Logged in successfully" });

  console.log("token", token);
  User.findOneAndUpdate(
    { userId },
    { cartItems },
    { productId },
    { upsert: true, new: true }
  )
    .then((updatedCart) => res.json({ message: "Cart saved", updatedCart }))
    .catch((error) =>
      res.status(500).json({ message: "Error saving cart", error })
    );
};
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity required" });
    }

    let cart = await User.findOne({ userId });

    if (!cart) {
      cart = new User({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const fetchCart = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Fetching cart for user:", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const user = await User.findById(userId).populate("cartItems.productId");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.cartItems);
  } catch (err) {
    console.error("Error retrieving cart:", err);
    res
      .status(500)
      .json({ message: "Error retrieving cart", error: err.message });
  }
};
module.exports = {
  addToCart,
  fetchCart,
  saveCart,
  Signup,
  Login,
  GetUsers,
  // getCart,
  AuthCheck,
  getUserId,
  Logout,
  Google,
};
