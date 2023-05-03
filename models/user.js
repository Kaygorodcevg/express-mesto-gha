const isEmail = require('validator/lib/isEmail');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return /^https?:\/\/(www.)?(\d?[a-z-]+\.)+\/?\S*/mig.test(v);
      },
      message: 'Неправильный формат',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isEmail,
      message: 'Неправильный формат',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  // statics: {
  //   findUserByCredentials(email, password) {
  //     return this.findOne({ email })
  //       .then((user) => {
  //         if (!user) {
  //           return Promise.reject(new Error('Неправильные почта или пароль'));
  //         }
  //         return bcrypt.compare(password, user.password)
  //           .then((matched) => {
  //             if (!matched) {
  //               return Promise.reject(new Error('Неправильные почта или пароль'));
  //             }
  //             return user;
  //           });
  //       });
  //   },
  // },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
