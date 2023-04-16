const Card = require('../models/card');

// переделать ошибки !!!!!!!!!!
// const BAD_REQUEST = {
//   status: 400,
//   message: "Произошла ошибка."
// }

// const INTERNAL_SERVER_ERROR = {
//   status: 500,
//   message: "Переданы некорректные данные при создании пользователя."
// }

// const NOT_FOUND = {
//   status: 404,
//   message: "Пользователь по указанному _id не найден."
// }

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(next)
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link })
    .then((card) => {
      res.status(201).send(card)
    })
    .catch((err) => next(err));
}

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.id)
    .then(card => res.send(card))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }))
    .catch(err => next(err))
}
