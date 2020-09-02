const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
  },
  socket: {
    type: mongoose.Schema.Types.String,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
