import React, { useContext } from "react";
import { CheckoutContext } from "../../context/CheckoutContext"; 

const OrderSummary = () => {
  const { clientSecret } = useContext(CheckoutContext);

  return (
    <div>
      <h2>Order Summary</h2>
      <p>Client Secret: {clientSecret}</p> 
    </div>
  );
};

export default OrderSummary;