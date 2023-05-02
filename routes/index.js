const mainRouter = require('express').Router();
const auth = require('../middlewares/auth');

const users = require('./users');
const cards = require('./cards');
const notFound = require('./notFound');
const signIn = require('./signin');
const signUp = require('./signup');

mainRouter.use('/signin', auth, signIn);
mainRouter.use('/signup', auth, signUp);
mainRouter.use('/users', users);
mainRouter.use('/cards', cards);
mainRouter.use('*', notFound);

module.exports = mainRouter;
