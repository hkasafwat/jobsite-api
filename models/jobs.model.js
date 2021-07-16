const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
  title: { type: String, default: null },
  subtitle: { type: String, default: null },
  description: { type: String, default: null },
  company_name: { type: String, unique: true },
  company_avatar: { type: String },
  city: { type: String },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("jobs", jobsSchema);