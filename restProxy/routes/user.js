const { Router } = require('express');
const userService = require('../grpc/userService');

const router = Router();

router.post('/register', (req, res) => {
  userService.register(req.body, (e, r) => {
    if (e) {
      return res.status(500).json(e);
    }
    console.log(r);
    res.status(200).json(r);
  })
});

router.post('/login', (req, res) => {
  userService.login(req.body, (e, r) => {
    if (e) {
      return res.status(500).json(e);
    }
    console.log(r);
    res.status(200).json(r);
  })
});

module.exports = router;
