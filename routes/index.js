const mainRouter = require('express').Router();
const auth = require('../middlewares/auth');

const users = require('./users');
const cards = require('./cards');
const notFound = require('./notFound');
const signIn = require('./signin');
const signUp = require('./signup');

mainRouter.use('/signin', signIn);
mainRouter.use('/signup', signUp);
mainRouter.use('/users', auth, users);
mainRouter.use('/cards', auth, cards);
mainRouter.use('*', notFound);

module.exports = mainRouter;
