import React, { createContext, useEffect, useState } from 'react';

export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [adminUser, setAdminUser] = useState(null);
    useEffect(() => {
        const adminId = localStorage.getItem("adminId") || null;
        const adminRole = localStorage.getItem("adminRole") || null;
        const adminUsername = localStorage.getItem("adminUsername") || null;
        const adminToken = localStorage.getItem("adminToken") || null;
    
        const user = {
          adminId,
          adminUsername,
          adminRole,
          adminToken,
        };
    
        setAdminUser(user);
        setAdmin(user);    
    
      
        if (user && user.adminToken) {
          localStorage.setItem("adminToken", user.adminToken);
        } else {
          localStorage.removeItem("adminToken");
        }
    
        localStorage.setItem("adminId", user.adminId || "");
        localStorage.setItem("adminUsername", user.adminUsername || "");
        localStorage.setItem("adminRole", user.adminRole || "");
      }, []);
    
      return (
        <AdminContext.Provider value={{ adminUser, admin, setAdmin }}>
          {children}
        </AdminContext.Provider>
    
);
};







