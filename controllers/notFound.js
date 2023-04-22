const { NOT_FOUND } = require('../utils/errors');

module.exports.notFound = (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Запрашиваемая страница не найдена' });
};
