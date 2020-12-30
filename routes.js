const { Router, response } = require('express');
const UserController = require('./controllers/user');

const routes = Router();

const userController = new UserController();

routes.get('/', userController.getAll);
routes.post('/', userController.createUser);
routes.delete('/:id', userController.deleteUser);
routes.put('/:id', userController.updateUser);

module.exports = routes;