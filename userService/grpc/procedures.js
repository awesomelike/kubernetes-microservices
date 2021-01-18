const bcrypt = require('bcryptjs');
const User = require('../repository/user');
const auth = require('../auth');

module.exports = {
  login: async (call, callback) => {
    const { request } = call;
    let user = await User.findOne({ email: request.email });
    if (!user) {
      return callback({ code: 'USER_NOT_FOUND' });
    }
    console.log('FOUND_USER', user);
    if (!bcrypt.compareSync(request.password, user.password)) {
      callback({ code: 'UNAUTHORIZED' });
    }
    user = user.toObject();
    user = { ...user, token: auth.makeToken({ id: user.id, email: user.email }) };
    return callback(null, user);
  },
  register: async (call, callback) => {
    try {
      const { request } = call;
      console.log(request);
      if (await User.findOne({ email: request.email })) {
        return callback({ code: 'ALREADY_EXISTS' });
      }
      const data = {
        ...request,
        password: bcrypt.hashSync(request.password, bcrypt.genSaltSync()),
      };
      const user = await User.create(data);
      console.log(request);
      return callback(null, user);
    } catch (error) {
      console.log(error);
      callback({ code: 'INTERNAL_ERROR' });
    }
  },
  auth: async (call, callback) => {
    try {
      const { request } = call;
      const { token } = request;
      const user = await auth.verifyToken(token);
      if (user) {
        return callback(null, {
          id: user.id,
          email: user.email,
        });
      }
      return callback({
        code: 'UNAUTHORIZED',
      });
    } catch (error) {
      return callback({
        code: 'UNAUTHORIZED',
      });
    }
  },
};
