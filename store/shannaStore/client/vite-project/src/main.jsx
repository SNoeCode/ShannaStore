import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { StrictMode } from "react";
import "./index.css";

import { CartProvider } from "./context/cartContext";

import { UserProvider } from "./context/UserContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  </StrictMode>
);
