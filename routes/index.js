const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

const NOT_FOUND = 404;

router.use('/users', usersRouter);

router.use('/cards', cardsRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Вы обращаетесь по несуществующему Роуту' });
});

module.exports = router;
