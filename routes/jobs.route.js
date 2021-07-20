const express = require('express');
const router = express.Router();
const jobs_controller = require('../controllers/jobs.controller');

router.get("/", jobs_controller.listJobs);
router.post("/post-job", jobs_controller.createJob);
router.post("/edit-job", jobs_controller.editJob);

module.exports = router;