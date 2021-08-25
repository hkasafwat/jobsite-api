const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');

router.post("/profile", user_controller.getUserProfile);

module.exports = router;