const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const mainRouter = require('./routes');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use('/', mainRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
