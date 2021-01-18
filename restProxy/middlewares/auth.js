const userService = require('../grpc/userService');

module.exports = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.sendStatus(401);
  }
  userService.auth({
    email: req.body.email,
    password: req.body.password
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