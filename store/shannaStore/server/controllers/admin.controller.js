const User = require("../models/user.Model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Cart = require("../models/cart.Model");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.Model");

const adminLogin = (req, res) => {
    console.log("adminlogin", req.body);
    if (!req.body.username || !req.body.password) {
        console.error("Missing username or password");
        return res.status(400).json({ message: "Missing username or password" });
    }
    Admin.findOne({username: req.body.username} )
        .then((admin) => {
            if (!admin) {
                console.log("Admin not found");
                return res.status(401).json({ message: "Admin not found" });
            }
            const isAdminPasswordValid = bcrypt.compareSync(
                req.body.password,
               admin.password
            );
            if (!isAdminPasswordValid) {
                console.log("Bad login");
                return res.status(401).json({ message: "Bad Admin login" });
            }
            const adminToken = jwt.sign(
                { username: admin.username, adminId: admin.adminId, role: admin.role },
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
                username: admin.username,
                // _id: _id,
                email: admin.email,
                role: admin.role,
            },
        });
    console.log({
        adminToken,
        adminId: admin.adminId,
        username: admin.username,
        // _id: admin._id,
        email: admin.email,
        role: admin.role,
    })
})
        .catch((error) => {
            console.error("Login error:", error);
            res.status(500).json({ msg: "Login failed" });
        });
};




const isAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.body);
        if (admin.role !== "admin") {
            return res.status(401).send({
                success: false,
                message: msg === "validated",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middelware",
        });
    }
};

module.exports = { adminLogin, isAdmin }