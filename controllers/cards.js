const Card = require('../models/card');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Запрашиваемая карточка не найдена' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
      } else {
        res.send({ likes: card.likes });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Запрашиваемая карточка не найдена' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
      } else {
        res.send({ likes: card.likes });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Запрашиваемая карточка не найдена' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};
