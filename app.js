const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const {
  createUserValidation,
  loginValidation,
} = require('./middlewares/validation');
const router = require('./routes');

mongoose.connect('mongodb://localhost:27017/mestodb');

const { createUser, login } = require('./controllers/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);
app.use(auth);

app.use(router);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(3000, () => {
  console.log('сервер запущен');
});
