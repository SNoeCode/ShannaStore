import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [authedUser, setAuthedUser] = useState(null);
  const [updatedAuthedUser, setUpdatedAuthedUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

useEffect(() => {
  const userId = localStorage.getItem("userId") || null;
  const _id = localStorage.getItem("_id") || null;
  const role = localStorage.getItem("role") || null;

  const username = localStorage.getItem("username") || null;
  const token = localStorage.getItem("token") || null;
const cartItems = localStorage.getItem('cartItems')
  const updatedAuthedUser = {
    userId,
    _id,
    username,
    role,
    token,
    cartItems
  };

  setAuthedUser(updatedAuthedUser);

  if (updatedAuthedUser.token) {
    localStorage.setItem("token", updatedAuthedUser.token);
  } else {
    localStorage.removeItem("token");
  }
  
  localStorage.setItem("userId", updatedAuthedUser.userId || "");
  localStorage.setItem("_id", updatedAuthedUser._id || "");
  localStorage.setItem("username", updatedAuthedUser.username || "");
  localStorage.setItem("role", updatedAuthedUser.role || "");
 
  const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  setCartItems(savedCartItems);
}, []);
return (
  <UserContext.Provider value={{ authedUser, setAuthedUser, updatedAuthedUser }}>
    {children}
  </UserContext.Provider>
);
};
















