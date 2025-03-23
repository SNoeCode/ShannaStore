const mongoose = require("mongoose");
const express = require("express");
const adminRouter = express.Router();
const { adminLogin, isAdmin } = require("../controllers/admin.controller");


const { adminAuth} = require("../middleware/adminMiddleware");

adminRouter.get('/admin', adminAuth, isAdmin)
adminRouter.post("/admin-login", adminLogin);
module.exports = adminRouter;