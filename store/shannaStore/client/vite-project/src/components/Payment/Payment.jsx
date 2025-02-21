import React, { useState } from "react";
import "./Payment.css";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="payment-container">
      <h3>Payment Methods</h3>
      <div>
        <input
          type="radio"
          id="creditCard"
          name="paymentMethod"
          value="Credit Card"
          onChange={handlePaymentChange}
        />
        <label htmlFor="creditCard">Credit Card</label>
      </div>
      <div>
        <input
          type="radio"
          id="paypal"
          name="paymentMethod"
          value="PayPal"
          onChange={handlePaymentChange}
        />
        <label htmlFor="paypal">PayPal</label>
      </div>
      <p>Selected Method: {paymentMethod}</p>
    </div>
  );
};

export default Payment;
