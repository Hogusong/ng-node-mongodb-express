const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'my_secret_code_is_secret');
    next();
  } catch(error) {
    res.status(401).json({ message: 'Failed authentication'});
  }
}