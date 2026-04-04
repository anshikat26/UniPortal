const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  course: String,
  instituteId: {
    type: String,
    unique: true
  },
  dob: String,
  phone: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "student"
  }
});

module.exports = mongoose.model("User", userSchema);