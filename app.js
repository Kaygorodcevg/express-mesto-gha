const express = require('express');
const mongoose = require('mongoose');
const mainRouter = require('./routes');

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

app.use('/', mainRouter);

app.listen(PORT);
