const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/users');
const { REGULAR_EXPRESSION } = require('../utils/errors');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(REGULAR_EXPRESSION),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

module.exports = router;
