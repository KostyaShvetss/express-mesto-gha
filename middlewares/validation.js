const { Joi, celebrate } = require('celebrate');

const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

module.exports.getUserByIdValidation = celebrate({
  params: Joi.object({
    id: Joi.string().length(24).required(),
  }),
});

module.exports.updateUserInfoValidation = celebrate({
  body: Joi.object({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.updateUserAvatarValidation = celebrate({
  body: Joi.object({
    avatar: Joi.string().regex(urlRegex),
  }),
});

module.exports.findCardByIdValidation = celebrate({
  params: Joi.object({
    id: Joi.string().length(24).required(),
  }),
});

module.exports.createCardValidation = celebrate({
  body: Joi.object({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().regex(urlRegex).required(),
  }),
});

module.exports.createUserValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  }),
});

module.exports.loginValidation = celebrate({
  body: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  }),
});
