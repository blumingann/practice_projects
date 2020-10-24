const Movie = require('../models/movie.model');
const Genre = require('../models/genre.model');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth') // Authorization middleware with token
const admin = require('../middleware/admin')
const validateObjectId = require('../middleware/validateObjectId')

router.get("/", async (req, res) => {
  const movies = await Movie.find()
    .select("-__v")
    .sort("name")
    .populate('genre', '-_id -__v')

  res.send(movies);
});

router.post('/', auth, async (req, res, next) => {

  const newMovie = await Movie.create(req.body)

  const newMoviePop = await newMovie
    .populate('genre', '-_id name')
    .execPopulate();

  res.json(newMoviePop);

});

router.put('/:_id', [auth, admin], async (req, res, next) => {

  const movieId = req.params._id;
  const updatePayload = req.body;

  const updatedDoc = await Movie.findByIdAndUpdate(movieId, updatePayload, {
    new: true,
    runValidators: true
  })
    .lean().populate('genre', '-_id name');

  if (movieId) {
    res.json(updatedDoc)
  } else {
    res.status(404).json('The movie with the given ID was not found.');
  }

});

router.delete("/:id", auth, async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const movie = await Movie.findById(req.params.id).select("-__v");

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  const moviePop = await movie
    .populate('genre', '-_id -__v')
    .execPopulate();
  res.send(moviePop);
});

module.exports = router;