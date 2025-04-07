import React from "react";
import { CheckoutProvider } from "../../context/CheckoutContext";
import Checkout from "./Checkout"; 
import CheckoutForm from "./CheckoutForm";

const CheckoutPage = () => {
  return (
    <CheckoutProvider>  
      <h2>Checkout</h2>
      <Checkout />
      <CheckoutForm />
    </CheckoutProvider>
  );
};

export default CheckoutPage;