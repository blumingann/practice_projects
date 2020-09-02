const { Schema, model } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  rentals: [{
    type: ObjectId,
    ref: 'Rental'
  }]
});

module.exports = model('Customer', customerSchema);

