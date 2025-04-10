const User = require("../models/user.Model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Cart = require("../models/cart.Model");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.Model");
const Customer = require('../models/customer.Model')
const getCustomers = async (req,res) => {

        try {
          const customers = await Customer.find();
          res.json(customers);
        } catch (error) {
          res.status(500).json({ error: "Error fetching customers" });
        }
    
   const updateCustomer = async (customerId, updates) => {
        try {
          const updatedCustomer = await Customer.findByIdAndUpdate(
            customerId,
            { $set: updates },
            { new: true, runValidators: true }
          );
      
          return updatedCustomer;
        } catch (error) {
          console.error("Error updating customer:", error);
        }
      };
      
   const   createCustomer = async (req, res) => {
        try {
          const { name, email, phone, city, state, zip } = req.body;
      
          const newCustomer = new Customer({ name, email, phone, city, state, zip });
          await newCustomer.save();
      
          res.status(201).json(newCustomer);
        } catch (error) {
          res.status(400).json({ error: "Error registering user" });
        }
      };
      
//     const { userId } = req.params;
//     const customers = await Customer.findOne({userId});
//     console.log("All Customers:", customers);
// };

// getCustomers();
// const fetchCustomers = async (req, res) => {
//     console.log("fetch customers", req.body)
    
  
//     const { customerId } = req.params;
  
//     try {
//     Customer.findOne({customerId}).populate(
// //         "cartItems.productId"
//         "orders.orderId",
// //          "payments".paymentId,


//       );
  
//       if (!customer) {
//         return res.status(404).json({ message: "Customer not found" });
//       }
  
  
  
//     const orders = Customer.orders || [];
//     res.json({ orders });
//       console.log("orders",customer.orders);
//     } catch (err) {
//       console.error("Error fetching orders items:", err);
//       res.status(500).json({ message: "Server error" });
//     }
//   };
}
const addCustomer = async () => {
//     const newCustomer = new Customer({
//       name: "Alice Johnson",
//       email: "alice.johnson@example.com",
//       phone: "555-1234",
//       city: "Los Angeles",
//       state: "CA",
//       zip: "90001",
//     });
  
//     await newCustomer.save();
//     console.log("Customer added:", newCustomer);
  
  
//   addCustomer();



}
module.exports = { getCustomers,addCustomer }










// import { CheckoutContext } from "../../context/CheckoutContext";

// import axios from "axios";
// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

// // import Checkout from "./Checkout";
// import React, { useContext } from "react";
// import './CheckoutForm.css'
// const CheckoutForm = () => {
//     const handleSubmit = async (event) => {
//     const stripe = useStripe();
//     const elements = useElements();
    
//     event.preventDefault();
    
//     if (!stripe || !elements) {
//           const { clientSecret } = useContext(CheckoutContext); 
          

//         console.error("Stripe is not initialized");
//         return;
//       }
    
//       try {
      
//         const { paymentIntent, error } = await stripe.confirmPayment({
//           elements,
//           confirmParams: {
//             return_url: "http://localhost:5173/auth/account",
//             payment_method_data: { type: "card" },
//           },
//         });
    
//         if (error) {
//           console.error("Payment error:", error.message);
//           return;
//         }
//           console.log("Payment successful!", paymentIntent.id);
    
//         const userId = localStorage.getItem("userId"); 
//         const customerId = `CUSTOMER_${Date.now()}`; 
        
//         const orderSummary = cartItems.map((item) => ({
//           productId: item.productId,
//           productName: item.title,
//           price: item.price,
//           quantity: item.quantity,
//         }));
    
//         const orderData = {
//           customerId,
//           userId,
//           fullName,
//           email,
//           phoneNumber,
//           shippingAddress,
//           billingAddress,
//           paymentMethod: "Stripe",
//           totalAmount: cartTotal,
//           taxes: cartTotal * 0.08, 
          
//           transactionId: paymentIntent.id,
//           orderSummary,
//         };
    
      
//         const response = await axios.post(`http://localhost:3004/api/orders`, orderData);
        
//         console.log("Order placed:", response.data);
//         alert("Order placed successfully!");
    
    
//         const customerOrders = await axios.get(`http://localhost:3004/api/orders/${customerId}`);
//         console.log("Customer Orders:", customerOrders.data);
        
//       } catch (err) {
//         console.error("Unexpected error:", err);
//       }
//     };
//     return (
//         <>
//             <div className="payment-container">

//                 <form onSubmit={handleSubmit}>
//                     {clientSecret ? <p>Ready to pay</p> : <p>Loading payment session...</p>}
//                     <PaymentElement />
//                     <button type="submit" disabled={!stripe || !clientSecret}>Submit Payment</button> 
//                 </form>

//             </div>


//         </>
//     );
// };

// export default CheckoutForm;
// // //             <div className="payment-container">

// //                 <form onSubmit={handleSubmit}>
// //                     {clientSecret ? <p>Ready to pay</p> : <p>Loading payment session...</p>}
// //                     <PaymentElement />
// //                     <button type="submit" disabled={!stripe || !clientSecret}>Submit Payment</button> {/* ✅ Add submit button */}
// //                 </form>

// //             </div>