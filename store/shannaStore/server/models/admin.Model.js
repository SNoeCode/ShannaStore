const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  // admin: {
  //   type: String,
  //   required: true,
  // },
  username: {
    type: String,
    unique: true,
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
    default: "admin",
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
  },
  // cartItems: [
  //     {
  //       title: String,
  //       name: String,
  //       price: { type: Number, required: true },
  //       category: { type: String, required: true },
  //       description: { type: String },
  //       productId: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  //       // productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true  },

  //       quantity: { type: Number, default: 1 },
  //       default:[]
  //     },
  //   ],
  //   wishlist: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Product",
  //       default: [],
  //     },
  //   ],

});
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
