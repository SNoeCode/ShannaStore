import React, { createContext, useEffect, useState } from 'react';

export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [userAdmin, setUserAdmin] = useState(null);
    const adminToken = localStorage.getItem("adminToken") || "";
    const adminUsername = localStorage.getItem("adminUsername") || "";
    useEffect(() => {
        const adminId = localStorage.getItem("adminId") || null;
        const adminRole = localStorage.getItem("adminRole") || null;
        const adminUsername = localStorage.getItem("adminUsername") || null;
        const adminToken = localStorage.getItem("adminToken") || null;

        const adminData = {
            adminUsername: adminUsername,
            adminRole: adminRole,
            adminToken: adminToken,
        };

        setAdmin(adminData);
        setUserAdmin(adminData)
        if (adminToken) {
            localStorage.setItem("adminToken", adminToken);
        } else {
            localStorage.removeItem("adminToken");
        }

        localStorage.setItem("adminId", adminId || "");
        localStorage.setItem("adminUsername", adminUsername || "");
        localStorage.setItem("adminRole", adminRole || "");

    }, []);

    return (
        <AdminContext.Provider value={{ setUserAdmin, userAdmin, setAdmin,admin }}>
            {children}
        </AdminContext.Provider>
    );
};



