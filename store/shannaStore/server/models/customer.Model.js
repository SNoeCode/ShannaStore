const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
name: { type: String, required: true },
email: { type: String, required: true, unique: true },


  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  

  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],

  payments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;

