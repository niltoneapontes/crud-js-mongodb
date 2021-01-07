const mongoose = require('mongoose');
const { Schema } = require('mongoose'); 

const languagesSchema = new mongoose.Schema({
  pt: {
    type: Schema.Types.Mixed,
    required: true,
  },
  en: {
    type: Schema.Types.Mixed,
    required: true,
  },
  es: {
    type: Schema.Types.Mixed,
    required: true,
  }
})

module.exports = mongoose.model('Languages', languagesSchema);