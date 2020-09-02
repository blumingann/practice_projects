const Genre = require('../models/genre.model');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth') // Authorization middleware with token
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');

router.get('/', async (req, res, next) => {

  const genres = await Genre.find().lean().sort(' id');
  res.status(200).json(genres);

});

router.get('/:id', validateObjectId, async (req, res) => {

  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.post('/', auth, async (req, res, next) => {

  const newGenre = await Genre.create(req.body)

  res.status(201).json(newGenre);

});

router.put('/:id', auth, async (req, res, next) => {

  const genreId = req.params.id;
  const updatePayload = req.body;

  const updatedDoc = await Genre.findByIdAndUpdate(genreId, updatePayload, {
    new: true,
    runValidators: true
  })
    .lean();

  if (genreId) {
    res.status(200).json(updatedDoc)
  } else {
    res.status(404).json('The genre with the given ID was not found.');
  }

});

router.delete('/:id', [auth, admin], async (req, res) => {

  const genreId = req.params.id;
  const removeDoc = await Genre.findByIdAndRemove(genreId)
    .lean();

  if (genreId) {
    res.status(200).json('The document was deleted')
  } else {
    res.status(404).json('The genre with the given ID was not found.');
  }

});

module.exports = router; 