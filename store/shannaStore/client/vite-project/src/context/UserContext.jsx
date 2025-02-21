// UserContext.jsx
import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
  const [authedUser, setAuthedUser] = useState({
    userId: null,
    _id: null,
    username: null,
    token: null,
  });
  const [user, setUser] = useState(null);

  const updateAuthedUser = (authedUser) => {
    if (!authedUser) { 
        setAuthedUser({
             userId: null,
             _id: null,
             username: null,
             token: null
        });
        localStorage.removeItem("token");
        localStorage.setItem("userId", "");
        localStorage.setItem("_id", "");
        localStorage.setItem("username", "");
        return; 
    }

    const updatedUser = {
        userId: authedUser.userId || null,
        _id: authedUser._id || authedUser.id || null,
        username: authedUser.username || null,
        token: authedUser.token || null,
    };

    setAuthedUser(updatedUser);

    if (updatedUser.token) {
        localStorage.setItem("token", updatedUser.token);
    } else {
        localStorage.removeItem("token");
    }

    localStorage.setItem("userId", updatedUser.userId || "");
    localStorage.setItem("_id", updatedUser._id || "");
    localStorage.setItem("username", updatedUser.username || "");
};

  return (
    <UserContext.Provider value={{ authedUser, updateAuthedUser }}>
      {children}
    </UserContext.Provider>
  );
};


