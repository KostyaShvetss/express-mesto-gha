const Card = require('../models/card');
const errors = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => {
      res.status(errors.INTERNTAL_SERVER_ERROR).send({ message: 'Произошла ошибка.' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errors.BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки.' });
      } else {
        res.status(errors.INTERNTAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(errors.NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      if (card.owner.toString() === req.user._id) {
        Card.deleteOne({ _id: req.params.id }).then(res.send(card));
      } else {
        res.status(400).send({ message: 'Это не ваша карточка' });
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(errors.NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errors.BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
      } else {
        res.status(errors.INTERNTAL_SERVER_ERROR).send({ message: 'Произошла ошибка.' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(errors.NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errors.BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
      } else {
        res.status(errors.INTERNTAL_SERVER_ERROR).send({ message: 'Произошла ошибка.' });
      }
    });
};
