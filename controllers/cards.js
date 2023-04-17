const Card = require('../models/card');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const InternalServerError = require('../errors/InternalServerError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(next)
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании карточки.'))
      } else {
        next(new InternalServerError('Произошла ошибка'));
      }
    });
}

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.id)
    .then(card => {
      if (!card) {
        throw new NotFound('Карточка с указанным _id не найдена.')
      }
      res.send(card)
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании карточки.'))
      } else {
        next(new InternalServerError('Произошла ошибка'));
      }
    })
    .catch(err => next(err))
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then(card => {
      if (!card) {
        throw new NotFound('Передан несуществующий _id карточки.');
      }
      res.send({ data: card })
    })
    .catch(err => {
      if (err.name === "CastError") {
        next(new BadRequest('Переданы некорректные данные для постановки/снятии лайка.'))
      } else {
        next(new InternalServerError('Произошла ошибка'))
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
        throw new NotFound('Передан несуществующий _id карточки.');
      }
      res.send({ data: card })
    })
    .catch(err => {
      if (err.name === "CastError") {
        next(new BadRequest('Переданы некорректные данные для постановки/снятии лайка.'))
      } else {
        next(new InternalServerError('Произошла ошибка'))
      }
    })
}
