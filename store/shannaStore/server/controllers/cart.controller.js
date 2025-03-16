const User = require("../models/user.Model");
const mongoose = require("mongoose");
const Cart = require("../models/cart.Model");

const addToCart = async (req, res) => {
  try {
    const {
      productId,
      title,
      price,
      description,
      category,
      image,
      quantity = 1,
    } = req.body;
    const userId = req.user.userId;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingItemIndex = user.cartItems.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      user.cartItems[existingItemIndex].quantity += quantity;
    } else {
      user.cartItems.push({
        productId: new mongoose.Types.ObjectId(productId),
        title,
        name: title,
        price,
        category,
        description,
        image,
        quantity,
      });
    }

    await user.save();

    res.status(200).json({
      message: "Item added to cart",
      cartItems: user.cartItems,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      cartItems: user.cartItems || [],
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const updateCartItem = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const itemIndex = user.cartItems.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    user.cartItems[itemIndex].quantity = quantity;

    await user.save();

    res.status(200).json({
      message: "Cart item updated",
      cartItems: user.cartItems,
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.params;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cartItems = user.cartItems.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();

    res.status(200).json({
      message: "Item removed from cart",
      cartItems: user.cartItems,
    });
  } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cartItems = [];

    await user.save();

    res.status(200).json({
      message: "Cart cleared",
      cartItems: [],
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
