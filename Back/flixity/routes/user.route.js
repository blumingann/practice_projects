const _ = require('lodash')
const User = require('../models/user.model');
const express = require('express');
const { hash } = require('bcrypt');
const router = express.Router();

router.post('/', async (req, res, next) => {

  let findUser = await User.findOne({ email: req.body.email });
  if (findUser) return res.status(400).json('User already registered');

  const passwordHash = await hash(req.body.password, 10);

  user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: passwordHash,
  });

  const token = user.generateAuthToken();

  res.header('x-auth-token', token).status(200).json(_.pick(user, ['_id', 'name', 'email']));

});

module.exports = router;