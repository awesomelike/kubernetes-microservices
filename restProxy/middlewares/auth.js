const userService = require('../grpc/userService');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization;
  if (!token) {
    return res.sendStatus(401);
  }
  userService.auth({
    token
  }, (e, r) => {
    if (e) {
      console.log(e);
      return res.sendStatus(401);
    }
    console.log('Auth success:', r);
    req.session = r;
    next();
  })
};