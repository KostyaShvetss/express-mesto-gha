const User = require('../models/user');

// переделать ошибки !!!!!!!!!!
const BAD_REQUEST = {
  status: 400,
  message: "Произошла ошибка."
}

const INTERNAL_SERVER_ERROR = {
  status: 500,
  message: "Переданы некорректные данные при создании пользователя."
}

const NOT_FOUND = {
  status: 404,
  message: "Пользователь по указанному _id не найден."
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST.status).send({ message: BAD_REQUEST.message });
      } else {
        res.status(INTERNAL_SERVER_ERROR.status).send({ message: INTERNAL_SERVER_ERROR.message })
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
      console.log('4:', user);
      if (!user) {
        res.status(NOT_FOUND.status).send({ message: NOT_FOUND.message })
      }
      res.send(user);
    })
    .catch(err => console.log(err))
  next();
}
