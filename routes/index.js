const mainRouter = require('express').Router();
const users = require('./users');
const cards = require('./cards');
const notFound = require('./notFound');

mainRouter.use('/users', users);
mainRouter.use('/cards', cards);
mainRouter.use('*', notFound);

module.exports = mainRouter;
