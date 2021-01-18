const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');
const mongooseHidden = require('mongoose-hidden');

mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
  _id: { type: String, default: uuid },
  title: { type: String, default: 'this is post title' },
  body: { type: String, default: 'this is post body' },
  userId: { type: String },
}, {
  timestamps: {},
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

postSchema.plugin(mongooseHidden);

let model;
try {
  model = mongoose.model('Post');
} catch (error) {
  model = mongoose.model('Post', postSchema);
}

module.exports = model;
