const jsonwebtoken = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    res.status(401).send('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jsonwebtoken.verify(token, 'secret-key');
  } catch (err) {
    return next(err);
  }
  req.user = payload;
  return next();
};
