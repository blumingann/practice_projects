const { Schema, model } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;
const moment = require('moment');

const rentalSchema = new Schema({
  customer: {
    type: ObjectId,
    ref: 'Customer'
  },
  movie: {
    type: ObjectId,
    ref: 'Movie'
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0
  }
});

rentalSchema.statics.lookup = function (customerId, movieId) {
  return this.findOne({
    'customer._id': customerId,
    'movie._id': movieId,
  });
}

rentalSchema.methods.return = function () {
  this.dateReturned = new Date();

  const rentalDays = moment().diff(this.dateOut, 'days');
  this.rentalFee = rentalDays * this.movie.dailyRentalRate;
}

module.exports = model('Rental', rentalSchema);