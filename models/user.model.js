const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  company_name: { type: String, default: null},
  user_type: { type: String },
  location: { type: String },
  phoneNumber: { type: Number },
  proTitle: { type: String },
  bio: { type: String },
  cv: { type: Buffer },
});

module.exports = mongoose.model("user", userSchema);
