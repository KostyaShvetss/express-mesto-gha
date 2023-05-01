const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');
const errors = require('../utils/errors');

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name, about, avatar, email, password: hash,
    });
  })
    .then(() => res.status(201).send({
      data: {
        name, about, avatar, email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errors.BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(errors.INTERNTAL_SERVER_ERROR).send({ message: 'Произошла ошибка.' });
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          res.send(401);
        }
        const token = jsonwebtoken.sign({ _id: user._id }, 'secret-key', {
          expiresIn: '7d',
        });
        return res.send({ token });
      });
    })
    .catch((err) => next(err));
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(errors.NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errors.BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else if (err.message === 'NotFound') {
        res.status(err.NOT_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        next(err);
      }
    });
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
