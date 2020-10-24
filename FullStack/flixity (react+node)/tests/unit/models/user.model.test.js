const mongoose = require('mongoose');
const User = require('../../../models/user.model')
const jwt = require('jsonwebtoken');
const config = require('config');

describe('user.generateAuthToken', () => {
  it('should generate a valid JWT', () => {

    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true
    }
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get('SECRET_KEY'));

    expect(decoded).toMatchObject(payload)
  });
});