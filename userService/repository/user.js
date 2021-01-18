const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');
const mongooseHidden = require('mongoose-hidden');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuid },
  email: { type: String },
  password: { type: String, hide: false, select: true },
  name: { type: String, hide: false },
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

userSchema.plugin(mongooseHidden);

let model;
try {
  model = mongoose.model('User');
} catch (error) {
  model = mongoose.model('User', userSchema);
}

module.exports = model;
