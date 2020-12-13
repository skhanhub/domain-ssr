const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;

const userDbServices = require('../../src/services/userDbServices');

describe('Tests for userDbServices', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    await mongoose.connection.collections.users.deleteMany();
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it('Should create a new document or update an existing document', async () => {
    // Arrange
    const _id = null;
    const filter = {
      _id,
    };
    const doc = {
      givenName: 'Andrew',
    };
    // Arc
    const dbModel = await userDbServices.save(filter, doc);
    // Assert
    expect(dbModel._id).toBeDefined();
    expect(dbModel.givenName).toEqual(doc.givenName);
    expect(dbModel.surName).toBeUndefined();
  });

  it('Should return null as there are no doc in the db', async () => {
    // Arrange
    const reqId = ObjectId();
    const filter = {
      _id: reqId,
    };
    // Arc
    const dbModel = await userDbServices.find(filter);
    // Assert
    expect(dbModel).toBeNull();
  });

  it('Should return a doc', async () => {
    // Arrange
    const doc = {
      givenName: 'Andrew',
    };
    // Arc
    const savedDoc = await userDbServices.save({}, doc);
    const filter = {
      _id: savedDoc._id,
    };
    const dbModel = await userDbServices.find(filter);
    // Assert
    expect(savedDoc._id).toEqual(dbModel._id);
  });
});
