const jwt = require('jsonwebtoken');
// const { UNAUTHORIZED } = require('../utils/errors');
const UnauthorizedError = require('../utils/UnauthorizedError');

// module.exports = (req, res, next) => {
//   const token = req.cookies.jwt;

//   if (!token) {
//     return next(new UnauthorizedError('Необходима авторизация'));
//     // return res
//     //   .status(UNAUTHORIZED)
//     //   .send({ message: 'Необходима авторизация' });
//   }

//   let payload;
//   try {
//     payload = jwt.verify(token, 'some-secret-key');
//   } catch (err) {
//     return next(new UnauthorizedError('Необходима авторизация'));
//     // return res
//     //   .status(UNAUTHORIZED)
//     //   .send({ message: 'Необходима авторизация' });
//   }

//   req.user = payload;
//   // console.log('Payload', payload);
//   return next();
// };

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
