const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const router = express.Router();
const auth_controller = require('../controllers/auth.controller');


router.post('/createNewUser', (req, res) => {
  const token = generateAccessToken({ username: req.body.username });
  res.json(token);
})

router.post("/register", auth_controller.register);

router.post("/login", auth_controller.login);

module.exports = router;