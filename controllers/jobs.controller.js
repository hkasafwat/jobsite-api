const Jobs = require("../models/jobs.model");
const fields = [
  "title",
  "subtitle",
  "type",
  "description",
  "company_name",
  "company_logo",
  "company_url",
  "company_email",
  "city",
  "salary",
  "max_salary",
  "salary_timeframe",
  "benefits",
  "currency",
  "apply_email",
  "apply_url",
];

exports.createJob = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      type,
      description,
      company_name,
      company_logo,
      company_url,
      company_email,
      city,
      salary,
      max_salary,
      salary_timeframe,
      benefits,
      currency,
      apply_email,
      apply_url,
    } = req.body;

    fields.forEach((item) => {
      if (!req.body[item]) {
        req.body[item] = " ";
      }
    });

    const job = await Jobs.create({
      title,
      subtitle,
      type,
      description,
      company_name,
      company_logo,
      company_url,
      company_email: company_email ? company_email.toLowerCase() : "",
      city,
      salary,
      max_salary,
      salary_timeframe,
      benefits,
      currency,
      apply_email: apply_email ? apply_email.toLowerCase() : "",
      apply_url,
    });

    res.status(201).json(job);
  } catch (err) {
    console.log(err);
  }
};

exports.editJob = async (req, res) => {
  const {
    id,
    title,
    subtitle,
    type,
    description,
    company_name,
    company_logo,
    company_url,
    company_email,
    city,
    salary,
    max_salary,
    salary_timeframe,
    benefits,
    currency,
    apply_email,
    apply_url,
  } = req.body;

  let job = await Jobs.findById(id);

  console.log(job);
};

exports.deleteJob = async (req, res) => {};

exports.listJob = async (req, res) => {
  try {
    const { id } = req.body;

    let job = await Jobs.findById(id);
  } catch (err) {
    console.log(err);
  }
};

exports.listJobs = async (req, res) => {
  try {
    let jobs = await Jobs.find();
    res.status(201).json(jobs);
  } catch (err) {
    console.log(err);
  }
};
