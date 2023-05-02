const Card = require('../models/card');
const { errorsHandler } = require('../utils/errosHandler');
const {
  NOT_FOUND, CREATED,
} = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch((err) => errorsHandler(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED).send({ card }))
    .catch((err) => errorsHandler(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove({ _id: req.params.cardId, owner: req.user._id })
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
      } else {
        res.send({ card });
      }
    })
    .catch((err) => errorsHandler(err, res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => card.populate(['owner', 'likes']))
    .then((likes) => res.send({ data: likes }))
    .catch((err) => errorsHandler(err, res));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => card.populate(['owner', 'likes']))
    .then((likes) => res.send({ data: likes }))
    .catch((err) => errorsHandler(err, res));
};
