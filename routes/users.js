const usersRouter = require('express').Router();
const {
  createUser,
  getUsers,
  getUserById,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');
const {
  getUserByIdValidation,
  updateUserInfoValidation,
  updateUserAvatarValidation,
} = require('../middlewares/validation');

usersRouter.post('/', createUser);
usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);

usersRouter.get('/:id', getUserByIdValidation, getUserById);
usersRouter.patch('/me', updateUserInfoValidation, updateUserInfo);
usersRouter.patch('/me/avatar', updateUserAvatarValidation, updateUserAvatar);

module.exports = usersRouter;
