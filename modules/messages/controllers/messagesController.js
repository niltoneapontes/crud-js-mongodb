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
    try {
      const messages = await Message.find();
      const formattedMessages = messages.map(message => {
        return {
          id: message.id,
          trigger: message.trigger,
          user: message.user,
          validator: message.validator,
          message: message.message,
          component: message.component,
          end: message.end,
          options: message.options,
          update: message.update 
        }
      })
      return response.status(200).json(formattedMessages);
    } catch(err) {
      return response.status(503).send('Error: ', err)
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