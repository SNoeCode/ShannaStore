const Payment = require("../models/payment.Model");
const Customer = require("../models/customer.Model");


const createPayment = async (req, res) => {
    try {
      const { customerId, orderId, paymentMethod, amount, taxes, transactionId } = req.body;
  
      const newPayment = new Payment({ customerId, orderId, paymentMethod, amount, taxes, transactionId });
      await newPayment.save();
  
      await Customer.findByIdAndUpdate(customerId, { $push: { payments: newPayment._id } });
  
      res.status(201).json({ message: "Payment processed", payment: newPayment });
    } catch (error) {
      res.status(500).json({ error: "Error processing payment" });
    }
  };
  module.exports = { createPayment }