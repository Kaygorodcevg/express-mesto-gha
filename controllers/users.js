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

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
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
  updateUserInfo(req, res, name, about);
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  updateUserInfo(req, res, avatar);
};
