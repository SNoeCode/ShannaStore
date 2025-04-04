const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({

  admin_username: {
    type: String,
    unique: true,
    required: true,
  },
  admin_email: {
    type: String,
    unique: true,
  },
  admin_password: {
    type: String,
    required: true,
  },
  admin_role: {
    type: String,
    enum: ["admin", "user"],
    default: "admin",
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
  },
  

});
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
