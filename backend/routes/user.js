const express = require('express');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const USER = require('../models/user');

router.post('/api/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new USER({
      email: req.body.email,  password: hash
    });
    user.save().then(result => {
      res.status(201).json({
        message: 'Signup successfully.',
        user: result
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
  });
});

router.post('/api/login', (req, res, next) => {
  let user;
  USER.findOne({ email: req.body.email }).then(data => {
    user = data;
    if (!user) {
      return res.status(401).json({ message: 'Auth failed.'});
    }
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({ message: 'Auth failed.'});
    }
    const token = jwt.sign(
      { email: user.email, userId: user._id },
      'my_secret_code_is_secret',
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,  expiresIn: 3600, userId: user._id
    });
  })
  .catch(err => {
    return res.status(401).json({ message: 'Auth failed.'});
  })
})

module.exports = router;
