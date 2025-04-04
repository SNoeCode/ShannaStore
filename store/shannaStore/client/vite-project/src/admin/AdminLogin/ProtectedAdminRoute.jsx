import React, { useEffect, useContext, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
const ProtectedAdminRoute = () => {
  const navigate = useNavigate();
  const { userAdmin,setUserAdmin } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  // const adminUser = localStorage.getItem("user")
const adminUsername = localStorage.getItem("adminUsername")
const adminToken = localStorage.getItem("adminToken")
// useEffect(() => {
//     console.log("Performing admin check...");
//     axios.get("http://localhost:3004/api/admin", {
//       headers: {
//          Authorization: `Bearer ${adminToken}`,
//         //  withCredentials: true,
//       }
//    })
//       .then((res) => {
//         if (res.data.msg === "validated") {
//           console.log("adminLogin", res.data);
//           console.log("adminDMINLogin", res.data/admin);

//           setUserAdmin({
//            adminId: res.data.admin.adminId,
//             adminUsername: res.data.admin.adminUsername,
//              adminToken: res.data.admin.adminToken,
//           }); 
        
//         } else {
//           console.log("Invalid token, redirecting...");
//           navigate("/admin-login");
//         }
//       })
//       .catch((err) => {
//         console.error("Error during admin login:", err);
//         navigate("/admin-login"); 
//       })
//       .finally(() => setLoading(false));
//     }, [setUserAdmin]);
useEffect(() => {
  const adminToken = localStorage.getItem("adminToken");
  console.log("Performing admin check...");
  console.log("Stored admin token:", localStorage.getItem("adminToken")); // Debugging
const response = 
  axios.get("http://localhost:3004/api/admin", {
      headers: {
          Authorization: `Bearer ${adminToken}`,},
           withCredentials: true,
      
          })
          .then((response) => {
    console.log("adminLogin", response.data)
      if (response.data.message === "validated") {
          // console.log("adminDMINLogin", response.data.admin);
          console.log("adminDMINLogin", response.data.adminDecoded);
          setUserAdmin({
            adminId: response.data.adminDecoded.adminId,
            adminUsername: response.data.adminDecoded.admin_username,
            adminToken: adminToken,
          });
  

          // setUserAdmin({
          //     adminId: response.data.adminId,
          //     adminUsername: response.data.adminUsername,
          //     adminToken: response.data.adminToken,
          // });

      } else {
          console.log("Invalid token, redirecting...");
          navigate("/login");
      }
  })
  .catch((err) => {
      console.error("Error during admin login:", err);
      navigate("/admin-login");
  })
  .finally(() => setLoading(false));
}, [setUserAdmin]);

    if (loading) {
      return <div>Loading...</div>;
    }
    return <Outlet />;

  };
      

export default ProtectedAdminRoute;
