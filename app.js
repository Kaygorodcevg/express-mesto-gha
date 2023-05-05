const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const mainRouter = require('./routes');
const err = require('./middlewares/error');

const app = express();
const { PORT = 3005 } = process.env;

app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/', mainRouter);
app.use(errors());
app.use(err);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
