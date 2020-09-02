const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Message', messageSchema);
