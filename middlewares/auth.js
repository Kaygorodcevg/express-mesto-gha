const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return new UnauthorizedError('Необходима авторизация');
  }

  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return new UnauthorizedError('Необходима авторизация');
  }
  req.user = payload;
  return next();
};
