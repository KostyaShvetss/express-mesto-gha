const User = require('../models/user');
const errors = require('../utils/errors');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errors.BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(errors.INTERNTAL_SERVER_ERROR).send({ message: 'Произошла ошибка.' });
      }
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

module.exports.getUserById = (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(errors.NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.' });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errors.BAD_REQUEST).send({ message: 'Переданы некорректные данные пользователя.' });
      } else {
        res.status(errors.INTERNTAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(errors.NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(errors.BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else {
        res.status(errors.INTERNTAL_SERVER_ERROR).send({ message: 'Произошла ошибка.' });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((newAvatar) => {
      res.send(newAvatar);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(errors.BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      } else {
        res.status(errors.INTERNTAL_SERVER_ERROR).send({ message: 'Произошла ошибка.' });
      }
    });
};
