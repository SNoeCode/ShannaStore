const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  paymentMethod: { type: String, enum: ["Credit Card", "PayPal", "Stripe"], required: true },
  transactionId: { type: String, required: true },
  amount: { type: Number, required: true },
  taxes: { type: Number, default: 0 },
  status: { type: String, enum: ["Pending", "Completed", "Refunded"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;