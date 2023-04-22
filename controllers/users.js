const User = require('../models/user');
const { errorsHandler } = require('../utils/errosHandler');
const { NOT_FOUND } = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => errorsHandler(err, res));
};

module.exports.getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res
          .status(NOT_FOUND)
          .send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.send({ data: user });
      }
    })
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
  updateUserInfo(req, res, req.body);
};

module.exports.updateAvatar = (req, res) => {
  updateUserInfo(req, res, req.body);
};
// module.exports.updateUser = (req, res) => {
//   const { name, about } = req.body;

//   User.findByIdAndUpdate(req.user._id, { name, about }, {
//     new: true, // обработчик then получит на вход обновлённую запись
//     runValidators: true, // данные будут валидированы перед изменением
//   })
//     .orFail()
//     .then((userData) => res.send({ data: userData }))
//     .catch((err) => errorsHandler(err, res));
// };

// module.exports.updateAvatar = (req, res) => {
//   const { avatar } = req.body;

//   User.findByIdAndUpdate(req.user._id, { avatar }, {
//     new: true,
//     runValidators: true,
//   })
//     .then((user) => {
//       if (!user) {
//         res
//           .status(NOT_FOUND)
//           .send({ message: 'Запрашиваемый пользователь не найден' });
//       } else {
//         res.send({ data: user });
//       }
//     })
//     .catch((err) => errorsHandler(err, res));
// };
