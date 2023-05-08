const { Joi, celebrate } = require('celebrate');

const urlRegex = require('../utils/constants');

module.exports.getUserByIdValidation = celebrate({
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
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
    avatar: Joi.string().regex(urlRegex).required(),
  }),
});

module.exports.findCardByIdValidation = celebrate({
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
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
