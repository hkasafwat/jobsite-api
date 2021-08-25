const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

exports.getUserProfile = async function(req, res) {
 const { id } = req.body;

 const user = await User.findOne({ _id: id });

 res.status(200).json(user);
}

exports.getUserSettings = async function(req, res) {
  const { id } = req.body;

  const user = await User.findOne({ _id: id});
}

exports.editUserProfile = async function(req, res) {
  const { email, firstName, lastName, Location, phoneNumber, professionalTitle, bio, cv } = req.body;
 
  const user = await User.findOne({ _id: id });
 
  res.status(200).json(user);
 }
 
 exports.editUserSettings = async function(req, res) {
   const { email, newPassword, confirmedNewPassword, oldPassword } = req.body;
 
   const user = await User.findOne({ _id: id});
 }