import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import axios from 'axios';
import "./AdminLogin.css"
import { AdminContext } from "../../context/AdminContext";

const AdminLogin = () => {
  const [adminCredentials, setAdminCredentials] = useState({
    admin_username: "",
    admin_password: "",
  });
  const { setUserAdmin } = useContext(AdminContext); 
  const navigate = useNavigate(); 

  
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3004/api/admin-login",
        adminCredentials,
        {
          withCredentials: true,
        }
      );

    
      if (response.data.admin.role === "admin") {
        setUserAdmin(response.data);
    const adminUsername= localStorage.setItem("adminUsername", response.data.adminUsername);
    const adminToken =    localStorage.setItem("adminToken", response.data.adminToken);   
      const adminRole =  localStorage.setItem("adminRole", response.data.role);
        navigate("/admin/"); 
      } else {
        alert("You are not authorized to access this page.");
      }
    } catch (error) {
      console.error("Error during admin login:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <div className="admin-login-container">
        <p>Welcome to Admin Login. Please enter your credentials to proceed.</p>
      </div>
      <form className="admin-login-form" onSubmit={(e)=>{handleAdminLogin(e)}}>
        <div className="admin-form-group">
          <label>Admin Username:</label>
          <input
            id="admin-username"
            type="text"
            value={adminCredentials.admin_username}
            onChange={(e) =>
              setAdminCredentials({ ...adminCredentials, admin_username: e.target.value })
            }
            required
          />
        </div>
        <div className="admin-form-group">
          <label>Admin Password:</label>
          <input
            id="admin-password"
            type="password"
            value={adminCredentials.admin_password}
            onChange={(e) =>
              setAdminCredentials({ ...adminCredentials, admin_password: e.target.value })
            }
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AdminLogin;
