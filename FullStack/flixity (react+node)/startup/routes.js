const express = require('express')

const genresRouter = require('../routes/genres.route')
const customersRouter = require('../routes/customers.route')
const moviesRouter = require('../routes/movies.route')
const rentalsRouter = require('../routes/rentals.route')
const returnRouter = require('../routes/returns.route')
const userRouter = require('../routes/user.route')
const authRouter = require('../routes/auth.route')

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/genres', genresRouter)
  app.use('/api/customers', customersRouter)
  app.use('/api/movies', moviesRouter)
  app.use('/api/rentals', rentalsRouter)
  app.use('/api/returns', returnRouter)
  app.use('/api/register', userRouter)
  app.use('/api/login', authRouter)
}