const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../utils/errors');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }

  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }
  // console.log('Payload:', payload);
  req.user = payload;

  return next();
};
