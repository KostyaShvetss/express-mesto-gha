const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');
const router = require('./routes');

mongoose.connect('mongodb://localhost:27017/mestodb');

const { createUser, login } = require('./controllers/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);

app.use(router);

app.listen(3000, () => {
  console.log('сервер запущен');
});
