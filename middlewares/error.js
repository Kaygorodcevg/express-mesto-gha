const {
  CastError,
  DocumentNotFoundError,
  ValidationError,
} = require('mongoose').Error;

const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
} = require('../utils/errors');
const UnauthorizedError = require('../utils/UnauthorizedError');
const ForbiddenError = require('../utils/ForbiddenError');
const NotFoundError = require('../utils/NotFoundError');

module.exports = ((err, res, next) => {
  if (err instanceof CastError) {
    return res.status(BAD_REQUEST).send({ message: 'Запрашиваемая информация не найдена' });
  }
  if (err instanceof DocumentNotFoundError) {
    return res.status(NOT_FOUND).send({ message: 'Запрашиваемая информация не найдена' });
  }
  if (err instanceof ValidationError) {
    return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
  }
  if (err instanceof UnauthorizedError) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  if (err instanceof ForbiddenError) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  if (err.code === 11000) {
    return res.status(CONFLICT).send({
      message: 'Указанный email уже зарегистрирован.',
    });
  }
  res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });

  return next();
});
