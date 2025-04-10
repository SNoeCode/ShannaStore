const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  orderSummary: [
    {
      productId: { type: String, required: true },
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      title: String,
      name: String,
      
      category: { type: String, required: true },
      description: { type: String },
      image: {
        type: String
      },
    },
  ],
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  totalCost: { type: Number, required: true },
  paymentDetails: {
    paymentMethod: { type: String, enum: ["Credit Card", "PayPal", "Stripe"], required: true },
    taxes: { type: Number, default: 0 },
    transactionId: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Completed", "Refunded"], default: "Pending" },
  },
  status: { type: String, enum: ["Processing", "Shipped", "Delivered", "Cancelled"], default: "Processing" },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;