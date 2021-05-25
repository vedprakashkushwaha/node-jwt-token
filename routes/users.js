const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Users} = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await Users.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {

  let user = await Users.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new Users(_.pick(req.body, ['name', 'email', 'password', 'role']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router; 
