const User = require('../repository/user');
const auth = require('../auth');

module.exports = {
  login: async (call, callback) => {
    const { request } = call;
    let user = await User.findOne({ email: request.email });
    if (!user) {
      return callback({ code: 'USER_NOT_FOUND' });
    }
    user = user.toObject();
    user = { ...user, token: auth.makeToken({ id: user.id, email: user.email }) };
    return callback(null, user);
  },
  register: async (call, callback) => {
    const { request } = call;
    const user = await User.create(request);
    callback(null, user);
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
