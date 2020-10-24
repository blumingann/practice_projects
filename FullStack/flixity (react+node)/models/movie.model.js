const { Schema, model } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;


const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  genre: {
    type: ObjectId,
    ref: "Genre",
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
})

module.exports = model('Movie', movieSchema);