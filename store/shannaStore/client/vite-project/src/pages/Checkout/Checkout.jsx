import React, { useEffect, useContext, useState } from "react";

import "./Checkout.css";
import { CartContext } from '../../context/cartContext'

const Checkout = () => {



  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [expiration, setExpiration] = useState("");
  const [shippingAddress, setShippingAddress] = useState({});
  const [billingAddress, setBillingAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");

  const { cartTotal } = useContext(CartContext);
  const handleShippingChange = (event) => {
    const { name, value } = event.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleBillingChange = (event) => {
    const { name, value } = event.target;
    setBillingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const orderData = {
      fullName,
      email,
      phoneNumber,
      shippingAddress,
      billingAddress,
      paymentMethod,
      creditCard,
      expiration,
    }


    console.log("Order submitted:", orderData);
    alert("Order placed successfully!");
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-header">Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">

        <div><strong>Total:</strong> ${cartTotal}</div>
        <h3 className="form-section-header">Shipping Address</h3>
        <input
          className="form-input"
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          className="form-input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="form-input"
          type="text"
          name="streetAddress"
          placeholder="Street Address"
          value={streetAddress}
          onChange={(e) => handleShippingChange(e)}
          required
        />
        <input
          className="form-input"
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />


        <h3 className="form-section-header">Billing Address</h3>
        <input
          className="form-input"
          type="text"
          name="streetAddress"
          placeholder="Street Address"
          value={billingAddress.streetAddress || ""}
          onChange={(e) => handleBillingChange(e)}
          required
        />
        <input
          className="form-input"
          type="text"
          name="city"
          placeholder="City"
          value={billingAddress.city || ""}
          onChange={(e) => handleBillingChange(e)}
          required
        />
        <input
          className="form-input"
          type="text"
          name="state"
          placeholder="State"
          value={billingAddress.state || ""}
          onChange={(e) => handleBillingChange(e)}
          required
        />
        <input
          className="form-input"
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          value={billingAddress.zipCode || ""}
          onChange={(e) => handleBillingChange(e)}
          required
        />

       
      </form>
    </div>
  );
};

export default Checkout;
