const { Router } = require('express');
const postService = require('../grpc/postService');
const auth = require('../middlewares/auth');

const router = Router();

router.post('/create', auth, (req, res) => {
  const user = req.session;
  postService.create({
    title: req.body.title,
    body: req.body.body,
    userId: user.id
  }, (e, r) => {
    if (e) {
      return res.status(500).json(e);
    }
    console.log(r);
    res.status(200).json(r);
  })
});

module.exports = router;
