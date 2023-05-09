const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { postCard, cardId } = require('../middlewares/validation');

router.get('/', getCards);

router.post('/', postCard, createCard);

router.delete('/:cardId', cardId, deleteCard);

router.put('/:cardId/likes', cardId, likeCard);

router.delete('/:cardId/likes', cardId, dislikeCard);

module.exports = router;
