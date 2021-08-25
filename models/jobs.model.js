const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
  title: { type: String, default: null },
  subtitle: { type: String, default: null },
  slug: { type: String, default: null },
  type: { type: String, default: null },
  description: { type: String, default: null },
  company_name: { type: String, default: null },
  company_logo: { type: String, default: null },
  company_url: { type: String, default: null },
  company_email: { type: String, sparse: true },
  job_location: { type: String, default: null },
  work_location: { type: String, default: null },
  min_wage: { type: Number, default: null },
  max_wage: { type: Number, default: null },
  salary_timeframe: { type: String, default: null },
  benefits: { type: String, default: null },
  currency: { type: String, default: null },
  apply_method: { type: String, default: null },
  apply_email: { type: String, default: null },
  apply_url: { type: String, default: null },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("jobs", jobsSchema);
