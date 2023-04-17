const Card = require('../models/card');
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNTAL_SERVER_ERROR = 500;

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(next)
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: "Переданы некорректные данные при создании карточки." })
      } else {
        res.status(INTERNTAL_SERVER_ERROR).send({ message: "Произошла ошибка" })
      }
    });
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .then(card => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: "Карточка с указанным _id не найдена." })
      }
      res.send(card)
    })
    .catch(err => {
      if (err.name === 'ValidationError' || err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Переданы некорректные данные при удалении карточки." })
      } else {
        res.status(INTERNTAL_SERVER_ERROR).send({ message: "Произошла ошибка." })
      }
    })
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then(card => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: "Передан несуществующий _id карточки." });
      }
      res.send({ data: card })
    })
    .catch(err => {
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Переданы некорректные данные для постановки/снятии лайка." });
      } else {
        res.status(INTERNTAL_SERVER_ERROR).send({ message: "Произошла ошибка." })
      }
    })
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then(card => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: "Передан несуществующий _id карточки." });
      }
      res.send({ data: card })
    })
    .catch(err => {
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Переданы некорректные данные для постановки/снятии лайка." });
      } else {
        res.status(INTERNTAL_SERVER_ERROR).send({ message: "Произошла ошибка." })
      }
    })
}
