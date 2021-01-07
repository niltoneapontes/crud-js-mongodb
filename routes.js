const { Router } = require('express');
const UserController = require('./modules/user/controllers/userController');
const LanguagesController = require('./modules/languages/controllers/languagesController');
const ensureAuthenticated = require('./middlewares/ensureAuthenticated');

const routes = Router();

const userController = new UserController();
const languagesController = new LanguagesController();

routes.get('/', userController.getAll);
routes.post('/', ensureAuthenticated, userController.createUser);
routes.delete('/:id', ensureAuthenticated, userController.deleteUser);
routes.put('/:id', ensureAuthenticated, userController.updateUser);
routes.post('/login', userController.login);

routes.get('/languages/', languagesController.getLanguages);
routes.post('/languages/', ensureAuthenticated, languagesController.createLanguages);
routes.put('/languages/:id', ensureAuthenticated, languagesController.updateLanguages);

module.exports = routes;