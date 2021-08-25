const Jobs = require("../models/jobs.model");
const slugify = require("slugify");

const fields = [
  "title",
  "slug",
  "type",
  "description",
  "company_name",
  "company_logo",
  "company_url",
  "company_email",
  "work_location",
  "job_location",
  "salary",
  "max_salary",
  "salary_timeframe",
  "benefits",
  "currency",
  "apply_method",
  "apply_email",
  "apply_url",
];

exports.createJob = async (req, res) => {
  try {
    const {
      title,
      type,
      description,
      company_name,
      company_logo,
      company_url,
      work_location,
      job_location,
      min_wage,
      max_wage,
      salary_timeframe,
      benefits,
      currency,
      apply_method,
      apply_email,
      apply_url,
    } = req.body;

    let randomNumber = Math.floor(Math.random() * 100 * 15);
    const slug = slugify(`${title} at ${company_name} ${randomNumber}`);

    let errors = [];
    fields.forEach((item) => {
      if (!req.body[item]) {
        switch (item) {
          case "title":
            if (!title) {
              errors.push({ title: "Job Title Must Be Provided" });
            }
            break;
          case "company_name":
            if (!company_name) {
              errors.push({ company_name: "Company Name Must Be Provided" });
            }
            break;
          case "job_location":
            if (!job_location) {
              errors.push({ job_location: "Job Location Must Be Provided" });
            }
            break;
          case "apply_method":
            if (!apply_method) {
              errors.push({ apply_method: "Apply Method Must Be Provided" });
            }
            break;
          default:
            req.body[item] = " ";
            break;
        }
      }
    });

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const job = await Jobs.create({
      title,
      slug,
      type,
      description,
      company_name,
      company_logo,
      company_url,
      work_location,
      job_location,
      min_wage,
      max_wage,
      salary_timeframe,
      benefits,
      currency,
      apply_method,
      apply_email: apply_email ? apply_email.toLowerCase() : "",
      apply_url,
    });

    res.status(201).json(job);
  } catch (err) {
    console.log(err);
  }
};

exports.editJob = async (req, res) => {
  try {
    const {
      title,
      slug,
      type,
      description,
      company_name,
      company_logo,
      company_url,
      work_location,
      job_location,
      min_wage,
      max_wage,
      salary_timeframe,
      benefits,
      currency,
      apply_method,
      apply_email,
      apply_url,
    } = req.body;

    let randomNumber = Math.floor(Math.random() * 100 * 15);
    const newSlug = slugify(`${title} at ${company_name} ${randomNumber}`);
    
    let job = await Jobs.updateOne(
      { slug: slug },
      {
        $set: {
          title: title,
          slug: newSlug,
          type: type,
          description: description,
          company_name: company_name,
          company_logo: company_logo,
          company_url: company_url,
          work_location: work_location,
          job_location: job_location,
          min_wage: min_wage,
          max_wage: max_wage,
          salary_timeframe: salary_timeframe,
          benefits: benefits,
          currency: currency,
          apply_method: apply_method,
          apply_email: apply_email,
          apply_url: apply_url,
        },
      }
    );

    res.status(200).json({ slug: newSlug })
  } catch (err) {
    console.log(err);
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const { slug } = req.body;

    let deletedJob = await Jobs.deleteOne({ slug: slug });

    if (deletedJob.n == 0) {
      res
        .status(400)
        .json({ error: "Delete unsuccessful, record does not exist" });
    } else {
      res.status(200).json({ success: "Post has been deleted" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.listJob = async (req, res) => {
  try {
    const { slug } = req.body;

    let job = await Jobs.findOne({ slug: slug }).exec();

    res.status(200).json(job);
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
