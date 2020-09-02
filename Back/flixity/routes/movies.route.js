const Movie = require('../models/movie.model');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res, next) => {

  const movie = await Movie.find().lean().sort(' id').populate("genres", "name");
  res.json(movie);

});

router.post('/', async (req, res, next) => {

  const newMovie = await Movie.create(req.body)

  const newMoviePop = await newMovie
    .populate('genre', '-_id name')
    .execPopulate();

  res.json(newMoviePop);

});

router.patch('/:_id', async (req, res, next) => {

  const movieId = req.params._id;
  const updatePayload = req.body;

  const updatedDoc = await Movie.findByIdAndUpdate(movieId, updatePayload, {
    new: true,
    runValidators: true
  })
    .lean();

  if (movieId) {
    res.json(updatedDoc)
  } else {
    res.status(404).json('The movie with the given ID was not found.');
  }

});

module.exports = router; 