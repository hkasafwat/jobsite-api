const express = require('express');
const router = express.Router();
const jobs_controller = require('../controllers/jobs.controller');

router.get("/", jobs_controller.listJobs);
router.post("/post-job", jobs_controller.createJob);
router.post("/delete-job", jobs_controller.deleteJob);
router.post("/edit-job", jobs_controller.editJob);
router.post("/retrieve-job", jobs_controller.listJob);

module.exports = router;