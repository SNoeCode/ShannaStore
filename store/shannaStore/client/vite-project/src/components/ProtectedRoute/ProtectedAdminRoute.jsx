import React, { useEffect, useContext, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { AdminContext } from "../../context/adminContext";
const ProtectedAdminRoute = () => {
  const navigate = useNavigate();
  const {admin, setAdmin } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  const adminUser = localStorage.getItem("user")

  useEffect(() => {
    console.log("Performing admin check...");
    axios
      .get("http://localhost:3004/admin", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.msg === "validated" && res.data.role === "admin") {
          console.log("authedLogin", res.data);
          setAdmin(res.data.admin); 
        
        } else {
          console.log("Invalid token, redirecting...");
          navigate("admin/login");
        }
      })
      .catch((err) => {
        console.error("Error during admin login:", err);
        navigate("/admin/login"); 
      })
      .finally(() => setLoading(false));
    }, [setAuthedUser]);
    if (loading) {
      return <div>Loading...</div>;
    }
    return admin ? (
      <Outlet />
    ) : (
      <navigate to="dashboard"/>
    );
  };
      

export default ProtectedAdminRoute;
