import React, { useEffect, useContext,useState } from "react";
// import { CheckoutContext } from "../../context/CheckoutContext";
// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import { CheckoutProvider } from "../../context/CheckoutContext";
// import CheckoutForm from "./CheckoutForm";

import "./Checkout.css"; 
import {CartContext} from '../../context/cartContext'

const Checkout = () => {
  // const stripe = useStripe();
  // const elements = useElements();




  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [expiration, setExpiration] = useState("");
  const [shippingAddress, setShippingAddress] = useState({});
  const [billingAddress, setBillingAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  // const { createPaymentIntent, clientSecret } = useContext(CheckoutContext);
  // useEffect(() => {
  //   createPaymentIntent(); // ✅ Ensures clientSecret is generated before Stripe usage
  // }, []);


  // const { calculateTotal } = useContext(cartContext);
  const {  cartTotal } = useContext(CartContext);
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
    // if (!stripe || !elements) {
    //   console.log("Stripe is not initialized");
    //   return;
    // }

    // const result = await stripe.confirmPayment({
    //   elements,
    //   confirmParams: {
    //     return_url: "http://localhost:5173/order-success", 
    //   },
    // })

    console.log("Order submitted:", orderData);
    alert("Order placed successfully!");
  };
  
  return (
    <div className="checkout-container">
      <h2 className="checkout-header">Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        {/* Shipping Address */}
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

        {/* Billing Address */}
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

        {/* Payment Information */}
        {/* <h3 className="form-section-header">Payment Information</h3>
        <input
          className="form-input"
          type="text"
          name="creditCard"
          placeholder="Credit Card Number"
          value={creditCard}
          onChange={(e) => setCreditCard(e.target.value)}
          required
        /> */}
        {/* <input
          className="form-input"
          type="text"
          name="expiration"
          placeholder="Expiration Date (MM/YY)"
          value={expiration}
          onChange={(e) => setExpiration(e.target.value)}
          required
        /> */}
        {/* <select
          className="form-select"
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => handlePaymentChange(e)}
          required
        >
          <option value="">Select Payment Method</option>
          <option value="credit">Credit Card</option>
          <option value="paypal">PayPal</option>
        </select> */}
  {/* </form>
  <button className="form-button" type="submit">
  Place Order
  </button> */}
  </form>
</div>
  );
};

export default Checkout;
