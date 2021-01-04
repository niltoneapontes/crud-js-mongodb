const mongoose = require('mongoose');
const { Schema } = require('mongoose'); 

const messageSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  trigger: {
    type: String,
    required: false,
  },
  user: {
    type: Boolean,
    required: false,
  },
  validator: {
    type: Schema.Types.Mixed,
    required: false,
  },
  message: {
    type: Schema.Types.Mixed, // pode ser uma String ou uma Function. Caso function => ~~~ new Function("a", "b", "return a + b"); ~~~
    required: false,
  },
  component: {
    type: Schema.Types.Mixed, // será um componente React
    required: false,
  },
  end: {
    type: Boolean,
    required: false,
  },
  options: {
    type: Schema.Types.Mixed, // será um array de objetos, mas não queremos que todas as mensagens possuam esse array
    required: false,
  },
  update: {
    type: Boolean,
    required: false,
  }
})

module.exports = mongoose.model('Message', messageSchema);