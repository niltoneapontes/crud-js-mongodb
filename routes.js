const { Router } = require('express');
const UserController = require('./modules/user/controllers/userController');
const LanguagesController = require('./modules/languages/controllers/languagesController');

const routes = Router();

const userController = new UserController();
const languagesController = new LanguagesController();

routes.get('/', userController.getAll);
routes.post('/', userController.createUser);
routes.delete('/:id', userController.deleteUser);
routes.put('/:id', userController.updateUser);
routes.post('/login', userController.login);

routes.get('/languages/', languagesController.getLanguages);
routes.post('/languages/', languagesController.createLanguages);
routes.put('/languages/:id', languagesController.updateLanguages);

module.exports = routes;