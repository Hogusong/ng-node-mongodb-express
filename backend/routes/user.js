const express = require('express');
const bcrypt =  require('bcrypt');

const router = express.Router();

const USER = require('../models/user');

router.post('/api/signup', (req, res, next) => {
  const password = bcrypt.hash(req.body.password, 10).then(hash => hash);
  if (password) {
    const user = new USER({
      email: req.body.email,  password: password
    });
    user.save().then(result => {
      res.status(201).json({
        message: 'Signup successfully.',
        id: result._id
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
  }
})


module.exports = router;
