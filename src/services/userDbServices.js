const db = require('../models');

module.exports = {
  save: (filter, updatedDoc) =>
    db.User.findOneAndUpdate(filter, updatedDoc, {
      new: true,
      upsert: true, // Make this update into an upsert
      useFindAndModify: false,
    }),
  find: (filter) => db.User.findOne(filter),
};
