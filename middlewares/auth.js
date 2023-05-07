const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/UnauthorizedError');

// module.exports = (req, res, next) => {
//   const token = req.cookies.jwt;

//   if (!token) {
//     return next(new UnauthorizedError('Необходима авторизация'));
//   }

//   let payload;

//   try {
//     payload = jwt.verify(token, 'some-secret-key');
//   } catch (err) {
//     return next(new UnauthorizedError('Необходима авторизация'));
//   }

//   req.user = payload;

//   return next();
// };
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'oksana-have-secrets');
  } catch (err) {
    throw new UnauthorizedError('Переданы неверные данные');
  }

  req.user = payload;

  next();
};
