const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  googleId: { type: String },
  username: {
    type: String,
    required: true,

  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
  },
  cartItems: [
    {
      title: String,
      name: String,
      price: { type: Number, required: true },
      category: { type: String, required: true },
      description: { type: String },
      image: {
        type: String
      },
    
      productId: { type: String, required: true },
      quantity: { type: Number, default: 1 },
      default: []
    },
  ],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: [],
    },
  ],

});
const User = mongoose.model("User", UserSchema);
module.exports = User;
