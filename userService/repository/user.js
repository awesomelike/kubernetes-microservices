const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuid },
  username: { type: String },
  email: { type: String },
  password: { type: String, hide: false, select: false },
  firstName: { type: String, hide: false },
  lastName: { type: String, hide: false },
  phoneNumber: { type: String, hide: false },
}, {
  timestamps: {},
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

let model;
try {
  model = mongoose.model('User');
} catch (error) {
  model = mongoose.model('User', userSchema);
}

module.exports = model;
