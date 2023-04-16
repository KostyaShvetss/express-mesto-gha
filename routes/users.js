const usersRouter = require('express').Router();
const { createUser, getUsers, getUserById } = require('../controllers/users')

usersRouter.post('/', createUser);
usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);

module.exports = usersRouter;
