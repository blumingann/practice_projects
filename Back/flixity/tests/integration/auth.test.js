const request = require('supertest');
const User = require('../../models/user.model');
const Genre = require('../../models/genre.model');

let server;
describe('auth middleware', () => {
  beforeEach(() => { server = require('../../index'); })
  afterEach(async () => {
    await server.close();
    await Genre.remove({});
  })

  let token;
  let name;

  const exe = async () => {
    return await request(server)
      .post('/api/genres')
      .set('x-auth-token', token)
      .send({ name: 'genre1' })
  }

  beforeEach(() => {
    token = new User().generateAuthToken();
    name = 'genre1'
  })

  it('should return 401 if no token is provided', async () => {
    token = '';

    const res = await exe();

    expect(res.status).toBe(401);

  });

  it('should return 400 if token is invalid', async () => {
    token = 'a';

    const res = await exe();

    expect(res.status).toBe(400);

  });

  it('should return 201 if token is valid', async () => {
    const res = await exe();

    expect(res.status).toBe(201);

  });
});