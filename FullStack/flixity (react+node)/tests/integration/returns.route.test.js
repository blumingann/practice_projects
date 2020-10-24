const moment = require('moment');
const request = require('supertest')
const Rental = require('../../models/rental.model');
const Movie = require('../../models/movie.model');
const User = require('../../models/user.model');
const mongoose = require('mongoose');

describe('/api/returns', () => {

  let server;
  let customerId;
  let movieId;
  let rental;
  let movie;
  let token;

  beforeEach(async () => {
    server = require('../../index');

    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();
    genreId = mongoose.Types.ObjectId();
    token = new User().generateAuthToken();

    movie = new Movie({
      _id: movieId,
      title: '12345',
      dailyRentalRate: 2,
      genre: genreId,
      numberInStock: 10
    });
    await movie.save();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: '12345',
        phone: '12345'
      },
      movie: {
        _id: movieId,
        title: '12345',
        dailyRentalRate: 2
      }
    });
    await rental.save();
  });

  afterEach(async () => {
    await server.close();
    await Rental.remove({});
    await Movie.remove({});
  });

  const exe = async () => {
    return await request(server)
      .post('/api/returns')
      .set('x-auth-token', token)
      .send({ customerId, movieId })
  }

  it('should return 401 if client is not logged in', async () => {
    token = '';

    const res = await exe();

    expect(res.status).toBe(401);
  });

  it('should return 404 if customerId is not provided', async () => {
    customerId = '';

    const res = await exe();

    expect(res.status).toBe(404);
  });

  it('should return 404 if movieId is not provided', async () => {
    movieId = '';

    const res = await exe();

    expect(res.status).toBe(404);
  });

  it('should return 404 if no rental found for the customer/movie', async () => {
    await Rental.remove({});

    const res = await exe();

    expect(res.status).toBe(404);
  });

  it('should return 404 if return is already processed', async () => {
    rental.dateReturned = new Date();

    await rental.save();

    const res = await exe();

    expect(res.status).toBe(404);
  });

});

