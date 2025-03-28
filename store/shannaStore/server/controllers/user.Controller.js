const User = require("../models/user.Model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Cart = require("../models/cart.Model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { ObjectId } = require("mongoose");

const Signup = (req, res) => {
  console.log("Registration hit", req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "Username and password required" });
  }

  User.findOne({ username: username })
    .then((found) => {
      if (found) {
        console.log("Username TAKEN");
        return res.status(400).json({ msg: "Username already exists" });
      }
      const hashedPassword = bcrypt.hashSync(password, 10);
      console.log("HASH", hashedPassword);

      User.create({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        username: req.body.username,
        password: hashedPassword,
        userId: new mongoose.Types.ObjectId(),
        _id: new mongoose.Types.ObjectId(),
        cartItems: cartItems || [],
      })

        .then((created) => {
          console.log("User created:", created);


          const token = jwt.sign(
            { username: created.username, id: created._id },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
          )
          //sends success response
          res.status(201).json({
            msg: "User created successfully",
            username: created.username,
            id: created._id,
            token: token,
          })
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ msg: "Error creating user" });
        });
    })

}

const Google = (req, res) => {
  console.log(req.body);
};

const GetUsers = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById({ _id: userId }).populate(
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
    // if (!req.headers.authorization) {
    //   return res
    //     .status(401)
    //     .json({ message: "Unauthorized: No token provided" });
    // }
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
  const { cartItems } = req.body;
  User.findOne({ username: req.body.username })
    // User.findOne({_id: req.body._id})
    .then((found) => {
      if (!found) {
        console.log("User not found");
        return res.status(401).json({ message: "User not found" });
      }
      const isPasswordValid = bcrypt.compareSync(
        req.body.password,
        found.password
      );
      if (!isPasswordValid) {
        console.log("Bad login");
        return res.status(401).json({ message: "Bad login" });
      }
      const token = jwt.sign(
        { username: found.username, _id: found._id, userId: found.userId },
        process.env.SECRET_KEY,
        { expiresIn: "30d" }
      );
      console.log("TOKEN", token);
      res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 3600000,
        })
        .status(200)
        .json({
          message: "good login",
          token,
          found: {
            userId: found.userId,
            username: found.username,
            _id: found._id,
            email: found.email,
            cartItems: found.cartItems,
            wishlist: found.wishlist,
            role: found.role
          },
        });
      console.log({
        token,
        userId: found.userId,
        username: found.username,
        _id: found._id,
        email: found.email,
        cartItems: found.cartItems,
        role: found.role,
        wishlist: found.wishlist,
      });
    })
    .catch((error) => {
      console.error("Login error:", error);
      res.status(500).json({ msg: "Login failed" });
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

    User.findById({ username: decoded.username, _id: decoded._id, userId: decoded.userId })
      .then((found) => {
        console.log("found", found);
        res.json({ msg: "valid token", found, token });
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
    process.env.SECRET_KEY,
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
  console.log("Request Body:", req.body); //
  const { userId, _id } = req.params;
  const { productId, title, price, description, category, image, quantity } =
    req.body;

  try {
    const decodedUserId = req.user.userId;

    console.log(`Product ID: ${productId}`);
    console.log(`Decoded User ID: ${decodedUserId}`);
    if (!productId || quantity <= 0) {
      return res.status(400).json({ message: "Invalid product data" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingItem = user.cartItems.find(
      (item) => item.productId.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newProduct = {
        productId: new mongoose.Types.ObjectId(),
        title,
        price,
        description,
        category,
        image,
        quantity,
      };

      user.cartItems.push({
        title,
        name: title,
        price,
        category,
        description,
        productId: new mongoose.Types.ObjectId(),
        quantity,
        image,
      });
    }

    await user.save();
    return res.json({ message: "Item added to cart", cart: user.cartItems });
  } catch (error) {
    console.error("Error in addToCart:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};


const updateCartItems = async (req, res) => {
  console.log(req.body);
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Find the item in the cart
    const itemIndex = user.cartItems.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex !== -1) {

      //  if (itemIndex === -1) {
      user.cartItems[itemIndex].quantity = quantity;
    } else {

      user.cartItems.push({
        productId: new mongoose.Types.ObjectId(String(productId)),
        quantity,
        ...req.body,
      });
    }

    await user.save();

    console.log("Updated Cart Items:", user.cartItems);

    res.status(200).json({
      message: "Cart item updated",
      cartItems: user.cartItems,
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
}
const fetchCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ _id: userId }).populate(
      "cartItems.productId"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItems = user.cartItems || [];
    res.json({ cartItems });

    console.log("cartItems", cartItems);
  } catch (err) {
    console.error("Error fetching cart items:", err);
    res.status(500).json({ message: "Server error" });
  }
};



const removeCartItem = (req, res) => {
  console.log("Delete HIT", req.params);
  console.log("Authenticated User:", req.user);

  User.findOneAndUpdate(
    { _id: req.user },
    { $pull: { cartItems: { productId: req.params.productId } } },
    { new: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ msg: "User not found" });
      }
      console.log("Updated User:", updatedUser);
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error("Error deleting cart item:", err);
      res.status(500).json({ msg: "Internal server error" });
    });
};


module.exports = {
  addToCart,
  fetchCart,
  saveCart,
  Signup,
  Login,
  GetUsers,
  updateCartItems,
  AuthCheck,
  removeCartItem,
  Logout,
  Google,
};
