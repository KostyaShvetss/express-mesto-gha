const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  findCardByIdValidation,
  createCardValidation,
} = require('../middlewares/validation');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCardValidation, createCard); //
cardsRouter.delete('/:id', findCardByIdValidation, deleteCard); //
cardsRouter.put('/:id/likes', findCardByIdValidation, likeCard); //
cardsRouter.delete('/:id/likes', findCardByIdValidation, dislikeCard); //

module.exports = cardsRouter;
