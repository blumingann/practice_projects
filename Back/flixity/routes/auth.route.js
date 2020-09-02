
const _ = require('lodash')
const User = require('../models/user.model');
const express = require('express');
const { compare } = require('bcrypt');
const auth = require('../middleware/auth')


const router = express.Router();

router.post('/', async (req, res, next) => {

  const user = await User.findOne({ email: req.body.email });


  if (!user) {
    return res.status(404).json({
      error: 'No se encuentra ningún usuario con ese email',
    });
  }
  // chequear password con .compare() de bcrypt
  const match = await compare(req.body.password, user.password);
  if (!match) {
    return res.status(400).json({
      error: 'El password no es correcto',
    });
  }

  // Crear Token

  const token = user.generateAuthToken();

  res.status(200).json({
    message: 'Usuario logeado correctamente',
    token: token
  });
});

// Display currently logged user

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('email isAdmin');
  res.send(user);
})


module.exports = router;