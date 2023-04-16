const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(500).send({ message: 'Произошла ошибка' });
      } else {
        res.send({ data: card });
      }
    })
    .catch(() =>
      res.status(500).send({ message: 'Произошла ошибка на сервере' })
    );
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(500).send({ message: 'Произошла ошибка' });
      } else {
        res.send({ likes: card.likes });
      }
    })
    .catch(() =>
      res.status(500).send({ message: 'Произошла ошибка на сервере' })
    );
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(500).send({ message: 'Произошла ошибка' });
      } else {
        res.send({ likes: card.likes });
      }
    })
    .catch(() =>
      res.status(500).send({ message: 'Произошла ошибка на сервере' })
    );
};
