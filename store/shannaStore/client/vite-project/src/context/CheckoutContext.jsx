import React, { useContext,createContext, useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import { clearCart} from '../context/cartContext'
export const CheckoutContext = createContext();

const stripePromise = loadStripe("pk_test_51QWv9VRxNQOqFOVtrZx9X951EILq2pk4SeZkkT3TJBAUwzeKbO1Jrx0MhFCAi5a2YKniefSOvdqXHVLByVNw4TOq008Du2pw7q");

export const CheckoutProvider = ({ children }) => {
  const [clientSecret, setClientSecret] = useState(null);
// const {clearCart} = useContext(cartContext)
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        if (!clientSecret) {
          const response = await fetch("http://localhost:3004/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
          const data = await response.json();
          setClientSecret(data.clientSecret);
   
        }
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    createPaymentIntent();
  }, [clientSecret]);

  if (!clientSecret) return <p>Loading payment session...</p>;



  return (
    clientSecret && (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutContext.Provider value={{ clientSecret }}>
          {children}
        </CheckoutContext.Provider>
      </Elements>
    )
  );
};