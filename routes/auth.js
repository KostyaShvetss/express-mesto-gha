const authRouter = require('express').Router();
const { login, createUser } = require('../controllers/users');
const {
  createUserValidation,
  loginValidation,
} = require('../middlewares/validation');

authRouter.post('/signin', loginValidation, login);
authRouter.post('/signup', createUserValidation, createUser);

module.exports = authRouter;
