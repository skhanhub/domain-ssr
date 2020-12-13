const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  givenName: { type: String, required: false },
  surname: { type: String, required: false },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  houseNumber: { type: String, required: false },
  street: { type: String, required: false },
  suburb: { type: String, required: false },
  state: { type: String, required: false },
  postcode: { type: String, required: false },
  country: { type: String, required: false },
});

const Comment = mongoose.model('User', userSchema);

module.exports = Comment;
