const { Router } = require('express');
const UserController = require('./modules/user/controllers/userController');
const MessagesController = require('./modules/messages/controllers/messagesController');
const LanguagesController = require('./modules/languages/controllers/languagesController');
const ensureAuthenticated = require('./middlewares/ensureAuthenticated');

const routes = Router();

const userController = new UserController();
const messagesController = new MessagesController();
const languagesController = new LanguagesController();

routes.get('/', userController.getAll);
routes.post('/', userController.createUser);
routes.delete('/:id', userController.deleteUser);
routes.put('/:id', userController.updateUser);
routes.post('/login', userController.login);
routes.post('/auth', ensureAuthenticated);

routes.get('/messages/', messagesController.getMessages);
routes.get('/messages/bot', messagesController.getMessagesForBot);
routes.post('/messages/', messagesController.createMessages);
routes.patch('/messages/:id', messagesController.updateMessages);
routes.delete('/messages/:id', messagesController.deleteMessages);

routes.get('/languages/', languagesController.getLanguages);
routes.post('/languages/', languagesController.createLanguages);
routes.put('/languages/:id', languagesController.updateLanguages);

module.exports = routes;