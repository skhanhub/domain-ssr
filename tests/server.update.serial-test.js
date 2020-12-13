const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../src/server');

describe('Test the update route', () => {
  afterEach(async () => {
    await mongoose.connection.collections.users.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  it('Should update a field of one user document', async () => {
    // Arrange
    expect.assertions(3);
    const givenName = 'Andrew';
    const data = `givenName=${givenName}`;

    // Act
    const result = await request(server)
      .post('/update')
      .send(data)
      .expect('Content-Type', /json/);

    // Assert
    expect(result.status).toEqual(200);
    expect(result.body._id).toBeDefined();
    expect(result.body.givenName).toEqual(givenName);
  });
}); // end describe
