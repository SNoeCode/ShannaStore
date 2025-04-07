import React, { useContext } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { CheckoutContext } from "../../context/CheckoutContext";
// import Checkout from "./Checkout";
import './CheckoutForm.css'
const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { clientSecret } = useContext(CheckoutContext); // ✅ Retrieve session from context

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            console.log("Stripe is not initialized");
            return;
        }
        try {
            const result = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    // return_url: "http://localhost:5173/order-success", 
                    return_url: "http://localhost:5173/auth/account",
                    payment_method_data: { type: "card" },


                },
            })
            if (error) {
                console.error("Payment error:", error.message);
            } else {
                console.log("Payment successful!", paymentIntent);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        }

    }

        return (
            <>

                <div className="payment-container">

                    <form onSubmit={handleSubmit}>
                        {clientSecret ? <p>Ready to pay</p> : <p>Loading payment session...</p>}
                        <PaymentElement />
                        <button type="submit" disabled={!stripe || !clientSecret}>Submit Payment</button> {/* ✅ Add submit button */}
                    </form>

                </div>

            </>
        );
    };

    export default CheckoutForm;
