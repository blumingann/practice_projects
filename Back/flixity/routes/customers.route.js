const Customer = require('../models/customer.model');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {

  const customers = await Customer.find().lean().sort('name');
  res.json(customers);

});

router.post('/', async (req, res, next) => {

  const newCustomer = await Customer.create(req.body);
  res.json(newCustomer);

});

router.put('/:_id', async (req, res, next) => {
  const customerId = req.params._id;
  const updatePayload = req.body;

  const updatedDoc = await Customer.findByIdAndUpdate(customerId, updatePayload, {
    new: true,
    runValidators: true
  })
    .lean();

  if (customerId) {
    res.json(updatedDoc)
  } else {
    res.status(404).json('The Customer with the given ID was not found.');
  }

});

router.delete('/:_id', async (req, res) => {

  const customerId = req.params._id;
  const removeDoc = await Customer.findByIdAndRemove(customerId)
    .lean();

  if (customerId) {
    res.json('The document was deleted')
  } else {
    res.status(404).json('The Customer with the given ID was not found.');
  }

});


module.exports = router; 