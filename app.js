const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '643bb3a5ac6b9a7fcc2eb7b8',
  };
  next();
});

app.use('/', userRoute);
app.use('/', cardsRoute);

// app.post('/', (req, res) => {
//   res.send(req.body);
// });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
