const {
  CastError,
  DocumentNotFoundError,
  ValidationError,
} = require('mongoose').Error;

const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('./errors');

module.exports.errorsHandler = (err, res) => {
  if (err instanceof CastError) {
    return res.status(BAD_REQUEST).send({ message: 'Запрашиваемая информация не найдена' });
  }
  if (err instanceof DocumentNotFoundError) {
    return res.status(NOT_FOUND).send({ message: 'Запрашиваемая информация не найдена' });
  }
  if (err instanceof ValidationError) {
    return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
  }
  return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
};
