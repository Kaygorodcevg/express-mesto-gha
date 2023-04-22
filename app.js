const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const { NOT_FOUND } = require('./utils/errors');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '643bb3a5ac6b9a7fcc2eb7b8',
  };
  next();
});

app.use('/users', userRoute);
app.use('/cards', cardsRoute);
app.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Запрашиваемая страница не найдена' });
});

app.listen(PORT);
