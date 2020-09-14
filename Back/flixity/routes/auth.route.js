
const _ = require('lodash')
const User = require('../models/user.model');
const express = require('express');
const { compare } = require('bcrypt');
const auth = require('../middleware/auth')


const router = express.Router();

router.post('/', async (req, res, next) => {

  let user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send('No user registered with the given username');

  const validPassword = await compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid password.');

  // Crear Token

  const token = user.generateAuthToken();

  res.status(200).send(token);
});

// Display currently logged user

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send({ id: user._id, name: user.name, email: user.email });
});


module.exports = router;