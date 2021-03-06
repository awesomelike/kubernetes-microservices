const mongoose = require('mongoose');

const db = mongoose.connection;
db.on('error', () => {
  console.error('mongo db error in connection');
});
db.once('open', () => {
  console.error('mongo db connection established');
});

class Database {
  constructor() {
    // eslint-disable-next-line max-len
    this.dbURI = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_SERVER}`;
    console.log('DB_URI', this.dbURI);
    mongoose.Promise = global.Promise;
  }

  connect() {
    return mongoose.connect(this.dbURI, {
      autoIndex: false,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    }, (error) => {
      if (error) {
        console.log('MongoDB Connection error:', error);
        process.exit(1);
      }
    });
  }
}

module.exports = Database;
