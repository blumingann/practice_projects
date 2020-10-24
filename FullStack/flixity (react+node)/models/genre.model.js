
const { Schema, model } = require('mongoose');

const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
})

module.exports = model('Genre', genreSchema);
