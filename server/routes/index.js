const router = require('express').Router();
const Dummy = require('../db/dummy');

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await Dummy.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await Dummy.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    const user = await Dummy.findByToken(req.headers.authorization);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
