const mongoose = require('mongoose');
const request = require('supertest');

const server = require('../src/server');

describe('Test the submit route', () => {
  afterEach(async () => {
    await mongoose.connection.collections.users.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  it('Should update an entire user document', async () => {
    // Arrange
    expect.assertions(4);
    const givenName = 'Andrew';
    const surname = 'Fairfax';
    const data = `givenName=${givenName}&surname=${surname}&email=sam.fairfax%40fairfaxmedia.com.au&phone=0292822833&houseNumber=100&street=Harris+Street&suburb=Pyrmont&state=NSW&postcode=2009&country=Australia`;

    // Act
    const result = await request(server)
      .post('/submit')
      .send(data)
      .expect('Content-Type', /json/);

    // Assert
    expect(result.status).toEqual(200);
    expect(result.body._id).toBeDefined();
    expect(result.body.givenName).toEqual(givenName);
    expect(result.body.surname).toEqual(surname);
  });
}); // end describe
