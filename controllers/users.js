const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { errorsHandler } = require('../utils/errosHandler');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => errorsHandler(err, res));
};

module.exports.getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => errorsHandler(err, res));
};

module.exports.getUserInfo = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => errorsHandler(err, res));
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => errorsHandler(err, res));
};

const updateUserInfo = (req, res, newData) => {
  User.findByIdAndUpdate(req.user._id, newData, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((userData) => res.send({ data: userData }))
    .catch((err) => errorsHandler(err, res));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  updateUserInfo(req, res, { name, about });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  updateUserInfo(req, res, { avatar });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.send({ message: 'Well done' });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};
