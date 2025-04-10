import React, { useContext } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { CheckoutContext } from "../../context/CheckoutContext";
import { loadStripe } from "@stripe/stripe-js";
// import Checkout from "./Checkout";
import './CheckoutForm.css'
const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { clientSecret } = useContext(CheckoutContext); // ✅ Retrieve session from context

    const handleSubmit = async (event) => {
         const stripe = useStripe();
            const elements = useElements();
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
                return
            }
       
        console.log("Payment successful!", paymentIntent.id);

        const userId = localStorage.getItem("userId"); 
        const customerId = `CUSTOMER_${Date.now()}`; 
        
        const orderSummary = cartItems.map((item) => ({
          productId: item.productId,
          productName: item.title,
          price: item.price,
          quantity: item.quantity,
        }));
           const orderData = {
                  customerId,
                  userId,
                  fullName,
                  email,
                  phoneNumber,
                  shippingAddress,
                  billingAddress,
                  paymentMethod: "Stripe",
                  totalAmount: cartTotal,
                  taxes: cartTotal * 0.08, 
                  
                  transactionId: paymentIntent.id,
                  orderSummary,
                };
            
              
                const response = await axios.post(`http://localhost:3004/api/orders`, orderData);
                
                console.log("Order placed:", response.data);
                alert("Order placed successfully!");
            
            
                const customerOrders = await axios.get(`http://localhost:3004/api/orders/${customerId}`);
                console.log("Customer Orders:", customerOrders.data);
                
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
                        <button type="submit" disabled={!stripe || !clientSecret}>Submit Payment</button> 
                    </form>

                </div>

            </>
        );
    };

    export default CheckoutForm;
