const Order = require("../models/order.Model");
const Customer = require("../models/customer.Model");

const createOrder = async (req, res) => {
  try {
    const { customerId, orderSummary, totalCost, shippingAddress } = req.body;


    const newOrder = new Order({ customerId, orderSummary, totalCost, shippingAddress });
    await newOrder.save();


   
    await Customer.findByIdAndUpdate(customerId, { $push: { orders: newOrder._id } });

    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ error: "Error processing order" });
  }
};
module.exports = {createOrder}