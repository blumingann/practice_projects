const Rental = require('../models/rental.model');
const Customer = require('../models/customer.model');
const Movie = require('../models/movie.model');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {

  const rentals = await Rental.find().sort('-dateOut');
  res.json(rentals);

});

router.post('/', async (req, res, next) => {

  const customer = await Customer.findById(req.body.customer);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movie);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  const newRental = await Rental.create(req.body)

  movie.numberInStock--;
  movie.save();

  const newRentalPop = await newRental
    .populate('movie', '-_id title numberInStock')
    .populate('customer', '-_id name isGold')
    .execPopulate();


  res.json(newRentalPop);

});



module.exports = router; 