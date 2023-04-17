const User = require('../models/user');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const InternalServerError = require('../errors/InternalServerError');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Переданы некорректные данные при создании пользователя.');
      } else {
        throw new InternalServerError('Произошла ошибка');
      }
    })
}

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next)
}

module.exports.getUserById = (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь по указанному _id не найден.');
      }
      res.send(user);
    })
    .catch(err => {
      if (err.name === "CastError") {
        next(new BadRequest('Переданы некорректные данные пользователя.'))
      }
      else {
        next(new InternalServerError('Произошла ошибка'))
      }
    })
  next();
}

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь с указанным _id не найден.')
      } else {
        res.status(200).send(user)
      }
    })
    .catch(err => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные при обновлении профиля.'));
      } else {
        next(new InternalServerError('Произошла ошибка'))
      }
    })
}

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((avatar) => {
      res.status(200).send(avatar)
    })
    .catch(err => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные при обновлении аватара.'));
      } else {
        next(new InternalServerError('Произошла ошибка'))
      }
    })
}
