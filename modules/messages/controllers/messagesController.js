const Message = require('../models/messages');


class MessagesController {
  constructor() {
  
  }
  
  async createMessages(request, response) {
    const { 
      id,
      trigger,
      user,
      validator,
      message,
      component,
      end,
      options,
      update 
    } = request.body;

    const foundMessage = await Message.findOne({ id: id });

    console.log(foundMessage);

    if(foundMessage) {
      return response.status(500).send({ message: 'Já existe uma mensagem com este ID.'});
    }

    const newMessage = new Message({
      id,
      trigger,
      user,
      validator,
      message,
      component,
      end,
      options,
      update 
    });

    try {
      const message = await newMessage.save();
      return response.status(200).send({ message: 'Mensagem adicionada com sucesso!', object: message })
    } catch(err) {
      return response.status(503).send({ error: err })
    }
  }

  async getMessages(request, response) {
    try {
      const messages = await Message.find();
      return response.status(200).json(messages);
    } catch(err) {
      return response.status(503).send('Error: ', err)
    }
  }

  async getMessagesForBot(request, response) {
    console.info('Retrieving messages...')
    try {
      const messages = await Message.find();
      const formattedMessages = messages.map(message => {
        const returnObject = {
          id: message.id
        }
        
        message.trigger !== null && Object.assign(returnObject, {trigger: message.trigger});
        message.user !== null && Object.assign(returnObject, {user: message.user});
        message.validator !== null && Object.assign(returnObject, {validator: message.validator});
        message.message !== null && Object.assign(returnObject, {message: message.message});
        message.component !== null && Object.assign(returnObject, {component: message.component});
        message.end !== null && Object.assign(returnObject, {end: message.end});
        message.options !== null && Object.assign(returnObject, {options: message.options});
        message.update !== null && Object.assign(returnObject, {update: message.update});

        return returnObject;
      })
      return response.status(200).json(formattedMessages);
    } catch(err) {
      return response.status(503).send(err)
    }
  }

  async updateMessages(request, response) {
    const { id } = request.params;

    const {
      newId,
      trigger,
      user,
      validator,
      message,
      component,
      end,
      options,
      update 
    } = request.body;

    const updatedMessage = {
      id: newId || id,
      trigger,
      user,
      validator,
      message,
      component,
      end,
      options,
      update 
    };

    try {
      const foundMessage = await Message.findOneAndUpdate({ id: id }, updatedMessage);
      return response.status(200).send({ message: 'Mensagem atualizada', object: updatedMessage });
    } catch(err) {
      return response.status(503).send({ error: err });
    }
  }
  
  async deleteMessages(request, response) {
    const { id } = request.params;

    try {
      const message = await Message.findOneAndDelete({ id: id })
      return response.status(200).send({ message: 'Mensagem deletada com sucesso', object: message });
    } catch(err) {
      return response.status(503).send({ error: err })
    }
  }

}

module.exports = MessagesController;