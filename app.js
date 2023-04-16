const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes');
const mongoose = require('mongoose');

app.listen(3000, () => {
  console.log('сервер запущен');
})
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '643c0964df6849fe30ac3795'
  };
  next();
})
// const {PORT = 3000, MONGO_URL = "mongodb://localhost:27017/mestodb"} = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
