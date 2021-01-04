const { Router } = require('express');
const UserController = require('./modules/user/controllers/userController');
const MessagesController = require('./modules/messages/controllers/messagesController');

const routes = Router();

const userController = new UserController();
const messagesController = new MessagesController();

routes.get('/', userController.getAll);
routes.post('/', userController.createUser);
routes.delete('/:id', userController.deleteUser);
routes.put('/:id', userController.updateUser);
routes.post('/login', userController.login);

routes.get('/messages/', messagesController.getMessages);
routes.get('/messages/bot', messagesController.getMessagesForBot);
routes.post('/messages/', messagesController.createMessages);
routes.patch('/messages/:id', messagesController.updateMessages);
routes.delete('/messages/:id', messagesController.deleteMessages);

module.exports = routes;