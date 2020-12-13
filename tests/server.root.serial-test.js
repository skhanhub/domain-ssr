const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../src/server');

describe('Test the root route', () => {
  afterEach(async () => {
    await mongoose.connection.collections.users.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  it('Should load the home page', async () => {
    // Arrange
    expect.assertions(1);

    // Act
    const result = await request(server).get('/');

    // Assert
    expect(result.status).toEqual(200);
  });
}); // end describe
