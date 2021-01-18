const jwt = require('jsonwebtoken');

const makeToken = (data) => jwt
  .sign(data, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

const verifyToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return reject(err);
    }
    return resolve(user);
  });
});

module.exports = { makeToken, verifyToken };
