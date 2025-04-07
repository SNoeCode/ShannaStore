import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { StrictMode } from "react";
import "./index.css";

import { CartProvider } from "./context/cartContext";
import { AdminProvider } from "./context/AdminContext.jsx";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter } from "react-router-dom";
// import { CheckoutProvider } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
// "pk_test_51QWv9VRxNQOqFOVtrZx9X951EILq2pk4SeZkkT3TJBAUwzeKbO1Jrx0MhFCAi5a2YKniefSOvdqXHVLByVNw4TOq008Du2pw7q"); 
// const stripeOptions = {
//   locale: "en", 
// };



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <AdminProvider>
      <UserProvider>
        <CartProvider>
          {/* <CheckoutProvider stripe={stripePromise}> */}


            <BrowserRouter>
              <App />
            </BrowserRouter>
          {/* </CheckoutProvider> */}
        </CartProvider>
      </UserProvider>
    </AdminProvider>
  </StrictMode>
);
