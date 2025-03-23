const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({

  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
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
