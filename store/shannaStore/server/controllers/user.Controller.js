const User = require("../models/user.Model");
const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Cart = require("../models/cart.Model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { ObjectId } = require("mongoose");

const Signup = (req, res) => {
  console.log("Registration hit", req.body);
  const { username, password } = req.body;
  const cartItems = req.body.cartItems || [];
  if (!username || !password) {
    return res.status(400).json({ msg: "Username and password required" });
  }

  User.findOne({ username: username })
    .then((user) => {
      if (user) {
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
          res.status(201).json({
            msg: "User created successfully",
            username: created.username,
            id: created._id,
            name: created.name,
            email: created.email,
            role: created.role,

            password: hashedPassword,
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
      return res.status(404).json({ message: "User not user" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// const Logout = async (req, res) => {
//   console.log(req.body);

//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized: No token provided" });
//     }

//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: true,
//     });

//     console.log("User logged out successfully");
//     res.status(200).json({ message: "Logout successful" });
//   } catch (error) {
//     console.error("Logout error:", error);
//     res.status(500).json({ message: "Logout failed" });
//   }
// };



const Logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    res.clearCookie("token", { httpOnly: true, secure: true });
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
    .then((user) => {
      if (!user) {
        console.log("User not found");
        return res.status(401).json({ message: "User not found" });
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        console.log("Good Login");

        const token = jwt.sign(
          { username: user.username, id: user._id, userId: user.userId, cartItems: user.cartItems },
          process.env.SECRET_KEY,
          { expiresIn: "30d" }
        );
        console.log("TOKEN", token);

        res
          .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // send over HTTPS in production
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
          })
          .status(200)

          .json({
            msg: "good login",
            token,
            user: {
              userId: user.userId,
              username: user.username,
              id: user._id,
              email: user.email,
              cartItems: user.cartItems || [],
              wishlist: user.wishlist || [],
              role: user.role || "user",
            },
            //  token:token,
          });
        console.log({
          token,
          userId: user.userId,
          username: user.username,
          _id: user._id,
          email: user.email,
          cartItems: user.cartItems,
          role: user.role,
          wishlist: user.wishlist,
        });
      } else {
        console.log("Bad Login");
        res.status(400).json({ msg: "Invalid credentials" });
      }
    })
    .catch((error) => {
      console.error("Login error:", error);
      res.status(500).json({ msg: "Login failed" });
    });
};
const AuthCheck = (req, res) => {

  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ msg: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded token:", decoded);
    if (!decoded.username) {
      return res.status(401).json({ msg: "Unauthorized: Bad token" });
    }
    req.user = decoded; // Attach decoded user info to request
    return res.json({ msg: "valid token", decoded });
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ msg: "Unauthorized: Invalid token" });
  }
}


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
  console.log("Request Body:", req.body); 
  const { productId, title, price, description, category, image, quantity } = req.body;
  const { userId } = req.params; 
 
  try {
 
    const user = await User.findOne({userId:req.params.userId});
   
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  

    
   
//     const itemIndex = user.cartItems.findIndex(item => item.productId.toString() === productId.toString());

//     console.log("Checking if product exists in cart:", productId, "Index:", itemIndex);
//     if (itemIndex !== -1) {
//       console.log("Comparing cart item:", user.cartItems[itemIndex].productId.toString(), "with incoming product:", productId.toString());
//       user.cartItems[itemIndex].quantity += quantity;
//     } else {
    
//       user.cartItems.push({

//     productId: productId.toString(),
// title,
//         price,
//         description,
//         category,
//         image,
//         quantity,
//       });
//     }

   
//     await user.save();
    
  
//     return res.json({ message: "Item added/updated in cart", cart: user.cartItems });
//   } catch (error) {
//     console.error("Error in addToCart:", error);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
const productIdObj = mongoose.Types.ObjectId.isValid(productId)
? new mongoose.Types.ObjectId(productId)
: productId;

const itemIndex = user.cartItems.findIndex((item) => {
if (item.productId && typeof item.productId.equals === "function") {
  return item.productId.equals(productIdObj);
}
return item.productId.toString() === productIdObj.toString();
});

console.log("Checking if product exists in cart:", productId, "Index:", itemIndex);

if (itemIndex !== -1) {
user.cartItems[itemIndex].quantity += quantity;
} else {
user.cartItems.push({
  productId: productIdObj,
  title,
  price,
  description,
  category,
  image,
  quantity,
});
}

await user.save();
return res.json({ message: "Item added/updated in cart", cart: user.cartItems });
} catch (error) {
console.error("Error in addToCart:", error);
return res.status(500).json({ message: "Server error", error: error.message });
}
};

// const updateCartItems = async (req, res) => {
//   console.log("Update Cart Items Request:", req.body);
  
//   console.log("Incoming update request...");
//   console.log("Request body:", req.body);
//   console.log("Request params:", req.params);

//   const { userId } = req.params;
//   const { productId, quantity } = req.body;
 

//   try {
  
//     const user = await User.findOne({userId});


//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // const itemIndex = user.cartItems.findIndex(
//     //   (item) => item.productId.toString() === productId
//     // );
//     const productIdObj = mongoose.Types.ObjectId.isValid(productId)
//   ? new mongoose.Types.ObjectId(productId)
//   : productId; // Use the correct format if valid

// const itemIndex = user.cartItems.findIndex(
//   (item) => item.productId.equals(productIdObj)
// );
// if (itemIndex !== -1) {
//   user.cartItems[itemIndex].quantity += quantity;
// } else {
//   user.cartItems.push({ productId: productIdObj, quantity });
// }

    // if (itemIndex !== -1) {
    //   user.cartItems[itemIndex].quantity = quantity;
    // } else {
    //   user.cartItems.push({ productId, quantity }); // ✅ Only add if it doesn’t exist
    // }


//     user.cartItems[itemIndex].quantity = quantity;

//     await user.save();
//     console.log("Cart updated successfully:", user.cartItems);

//     res.status(200).json({
//       message: "Cart item updated",
//       cartItems: user.cartItems || [],
//     });

//   } catch (error) {
//     console.error("Error updating cart item:", error);
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };


const updateCartItems = async (req, res) => {
  console.log("Update Cart Items Request:", req.body);
  console.log("Incoming update request...");
  console.log("Request body:", req.body);
  console.log("Request params:", req.params);

  const { productId, quantity } = req.body;
  const { userId } = req.params; // from the URL

  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // To make sure the product comparison works, use equals if possible,
    // Otherwise, compare strings.
    const productIdObj = mongoose.Types.ObjectId.isValid(productId)
      ? new mongoose.Types.ObjectId(productId)
      : productId;
      
    const itemIndex = user.cartItems.findIndex((item) => {
      if (item.productId && typeof item.productId.equals === "function") {
        // Compare as ObjectId objects
        return item.productId.equals(productIdObj);
      }
      // Fallback: compare as strings
      return item.productId.toString() === productIdObj.toString();
    });

    console.log("Checking if product exists in cart:", productId, "Index:", itemIndex);

    if (itemIndex !== -1) {
      user.cartItems[itemIndex].quantity = Number(quantity); // update quantity
    } else {
      // Only add the item if not found; note that you may want to convert if needed.
      user.cartItems.push({
        productId: productIdObj,
        quantity: Number(quantity),
      });
    }

    await user.save();
    console.log("Cart updated successfully:", user.cartItems);
    return res.status(200).json({
      message: "Cart item updated",
      cartItems: user.cartItems || [],
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
const fetchCart = async (req, res) => {
  console.log("fetch cart", req.body)
  // console.log("fetch cart", cartItems)

  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId }).populate(
      "cartItems.productId"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItems = user.cartItems || [];
    res.json({ cartItems });

    console.log("cartItems", user.cartItems);
  } catch (err) {
    console.error("Error fetching cart items:", err);
    res.status(500).json({ message: "Server error" });
  }
};



const removeCartItem = (req, res) => {
  console.log("Delete HIT", req.params);
  console.log("Authenticated User:", req.user);
  console.log("Backend Delete Request:", req.params);
  console.log("User ID received:", req.params.userId);
  console.log("Product ID received:", req.params.productId);
  User.findOneAndUpdate(
    
  


    { userId: new mongoose.Types.ObjectId(req.params.userId)  },

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

 