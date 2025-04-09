const User = require("../models/user.Model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Cart = require("../models/cart.Model");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.Model");

const adminLogin = (req, res) => {
    console.log("adminlogin", req.body);

    const {admin_username,admin_password} = req.body
    if (!admin_username || !admin_password) {
        console.error("Missing username or password");
        return res.status(400).json({ message: "Missing username or password" });
    }
    if (admin_username === process.env.ADMIN_USERNAME) {
      
    Admin.findOne({admin_username: admin_username} )
        .then((admin) => {
            if (!admin) {
                console.log("Admin not found");
                return res.status(401).json({ message: "Admin not found" });
            }
            const isAdminPasswordValid = bcrypt.compareSync(
                admin_password,
               process.env.ADMIN_PASSWORD,
            );
            const adminToken = jwt.sign(
                { admin_username: admin.admin_username, adminId: admin.adminId, role: admin.role, adminId: admin.adminId },
                process.env.ADMIN_KEY,
                { expiresIn: "30d" }
        );
    console.log("ADMINTOKEN", adminToken);
    res.cookie("admintoken", adminToken, {
            httpOnly: true,
            maxAge: 3600000,
        })
        .status(200)
        .json({
            message: "validated",
            adminToken,
            admin: {
                adminId: admin.adminId,
                admin_username: admin.admin_username,
             
                admin_email: admin.admin_email,
                role: admin.admin_role,
            },
        });
    console.log({
        adminToken,
        adminId: admin.adminId,
        admin_username: admin.admin_username,
     
        admin_email: admin.admin_email,
        role: admin.admin_role,
    })
})
        .catch((error) => {
            console.error("Login error:", error);
            res.status(500).json({ msg: "Login failed" });
        });
};


}
const adminLogout = async (req, res) => {
    console.log(req.body);
    console.log("Cookies received in logout:", req.cookies);

    try {
   
    const adminToken = req.cookies.adminToken || req.cookies.admintoken;
    if (!adminToken) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
      res.clearCookie("adminToken", {
        httpOnly: true,
        secure: true,
      });
  
      console.log("User logged out successfully");
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Logout failed" });
    }
  };



const isAdmin = async (req, res, next) => {
    try {
        const adminToken = req.cookies.adminToken || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

        console.log("Admin token received:", adminToken);

        if (!adminToken) {
            console.log("No admin token provided.");
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const adminDecoded = jwt.verify(adminToken, process.env.ADMIN_KEY);
        console.log("Admin decoded:", adminDecoded);

        if (!adminDecoded.admin_username) {
            return res.status(401).json({ message: "Invalid token: No admin_username found" });
        }

        req.admin = adminDecoded;
        console.log("Admin validated successfully.");

        return res.status(200).json({
            message: "validated",
            adminDecoded,
        });
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};



module.exports = { adminLogin, isAdmin,adminLogout }

