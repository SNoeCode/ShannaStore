const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { adminLogin, isAdmin } = require("../controllers/admin.controller");


const { auth, MiddleWare, adminAuth,isAuth } = require("../middleware/middleware");

module.exports = (app) => {
router.get('/admin', adminAuth, isAdmin)
router.post("/admin/login", adminLogin);
}