const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');

const USER = require('../models/user');

exports.createUser = (req, res, next) => {
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
      res.status(500).json({ message: 'Email is not valid. Try another.' });
    });
  });
};

exports.login = (req, res, next) => {
  let user;
  USER.findOne({ email: req.body.email }).then(data => {
    user = data;
    if (!user) {
      return res.status(401).json({ message: 'Email is not valid. Try another.' });
    }
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({ message: 'Password is not matched. Try another.'});
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
    return res.status(401).json({ message: 'Not found user. Try another.'});
  })
}

