import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
   const [authedUser, setAuthedUser] = useState(null);
  
  
  
  const initialUser = {
    //if there is a usernamr in local storafe it get username if no usernamr defaults to null
    username: localStorage.getItem("username") || "",
    token: localStorage.getItem("token") || null,
  };
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
 

  return (
    <UserContext.Provider value={{ authedUser, setAuthedUser }}>
      {children}
    </UserContext.Provider>
  );
};


