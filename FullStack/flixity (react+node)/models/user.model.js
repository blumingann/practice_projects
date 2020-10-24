const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 256,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: isEmail,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
  const jwtPayload = { _id: this._id, email: this.email, isAdmin: this.isAdmin, name: this.name };

  const token = jwt.sign(jwtPayload, config.get('SECRET_KEY'))

  return token;
}


module.exports = model('User', userSchema);