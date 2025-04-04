import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
   const [authedUser, setAuthedUser] = useState(null);
  
  
  
  // const initialUser = {
  //   //if there is a usernamr in local storafe it get username if no usernamr defaults to null
  //   username: localStorage.getItem("username") || "",
  //   token: localStorage.getItem("token") || null,
  // };
  // const [authedUser, setAuthedUser] = useState(initialUser);
  //whhen compound mounts(loads) it sync state with local storage
    useEffect(() => {
  
    const storedUsername = localStorage.getItem("username") || "";
    const storedToken = localStorage.getItem("token") || null;
    const storedUserId = localStorage.getItem("userId") || null;
    const storedId = localStorage.getItem("id") || null;
    const storedRole = localStorage.getItem("role") || null;
    // const username = localStorage.getItem("user.username") || null;
    // const token = localStorage.getItem("user.token") || null;
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
   
    //updates states with loccal storafw
    setAuthedUser({
      username: storedUsername,
      token: storedToken,
     userId: storedUserId, 
     cartItems: storedCartItems,
     role: storedRole,
     id: storedId
    });
  }, []);
  // useEffect(() => {
  //   // Retrieve user data from localStorage
  //   const userId = localStorage.getItem("user.userId") || null;
  //   const _id = localStorage.getItem("user._id") || null;
  //   const role = localStorage.getItem("user.role") || null;
  //   const username = localStorage.getItem("user.username") || null;
  //   const token = localStorage.getItem("user.token") || null;
  //   const cartItems = JSON.parse(localStorage.getItem("user.cartItems") || "[]");

  //   // Create user object
  //   const user = {
  //     userId,
  //     _id,
  //     username,
  //     role,
  //     token,
  //     cartItems,
  //   };

  //   // Update the context with user data
  //   setAuthedUser(user);

  //   // Update localStorage if necessary
  //   if (user.token) {
  //     localStorage.setItem("token", user.token);
  //   } else {
  //     localStorage.removeItem("token");
  //   }

  //   localStorage.setItem("userId", user.userId || "");
  //   localStorage.setItem("_id", user._id || "");
  //   localStorage.setItem("username", user.username || "");
  //   localStorage.setItem("role", user.role || "");
  //   localStorage.setItem("cartItems", JSON.stringify(user.cartItems || []));
  // }, []);

  return (
    <UserContext.Provider value={{ authedUser, setAuthedUser }}>
      {children}
    </UserContext.Provider>
  );
};




// import React, { createContext, useEffect, useState } from 'react';

// export const UserContext = createContext(null);

// export const UserProvider = ({ children }) => {
//   const [authedUser, setAuthedUser] = useState(null);
//   const [updatedAuthedUser, setUpdatedAuthedUser] = useState(null);
//   const [cartItems, setCartItems] = useState([]);

// useEffect(() => {
//   const userId = localStorage.getItem("userId") || null;
//   const _id = localStorage.getItem("_id") || null;
//   const role = localStorage.getItem("role") || null;

//   const username = localStorage.getItem("username") || null;
//   const token = localStorage.getItem("token") || null;
// const cartItems = localStorage.getItem('cartItems')
//   const updatedAuthedUser = {
//     userId,
//     _id,
//     username,
//     role,
//     token,
//     cartItems
//   };

//   setAuthedUser(updatedAuthedUser);

//   if (updatedAuthedUser.token) {
//     localStorage.setItem("token", updatedAuthedUser.token);
//   } else {
//     localStorage.removeItem("token");
//   }
  
//   localStorage.setItem("userId", updatedAuthedUser.userId || "");
//   localStorage.setItem("_id", updatedAuthedUser._id || "");
//   localStorage.setItem("username", updatedAuthedUser.username || "");
//   localStorage.setItem("role", updatedAuthedUser.role || "");
 
//   const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//   setCartItems(savedCartItems);
// }, []);
// return (
//   <UserContext.Provider value={{ authedUser, setAuthedUser, updatedAuthedUser }}>
//     {children}
//   </UserContext.Provider>
// );
// };
















