const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

exports.generateAccessToken = function (user_id) {
    return jwt.sign(user_id, process.env.TOKEN_SECRET, { expiresIn: '2h'} );
}

exports.register = async function( req, res) {
  try {
    const { first_name, last_name, email, password, user_type, company_name } = req.body;

    if(!( first_name && last_name && email && password && user_type)) {
      res.status(400).send("All input fields are required");
    }

    if(user_type == 'employer') {
      res.status(400).send("Company name is required")
    }

    const existingUser = await User.findOne({ email });

    if(existingUser) {
      return res.status(409).send("User Already exists with this email");
    }

    let encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      user_type,
      company_name,
      email: email.toLowerCase(),
      password: encryptedPassword
    });

    const token = exports.generateAccessToken({ user_id: user._id, email});

    user.token = token;

    res.status(201).json(user);
  }
  catch (err) {
    console.log(err);
  }
}

exports.login = async function(req, res) {
  try{
    const { email, password } = req.body;
    console.log(req.body)
    if(!(email && password)) {
      res.status(400).send("Please provide email and password");
    }

    const user = await User.findOne({ email });

    if( user && ( await bcrypt.compare(password, user.password))) {
      const token = exports.generateAccessToken({ user_id: user._id, email});

      user.token = token;
  
      res.status(200).json(user);
    }
    res.status(400).send("Invalid user credentials");
  }
  catch(err) {
    console.log(err)
  }
}