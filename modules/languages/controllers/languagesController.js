const Language = require('../models/language');


class LanguagesController {
  constructor() {
  
  }
  
  async createLanguages(request, response) {
    const { pt, en, es } = request.body;

    const newLanguages = new Language({
      pt,
      en,
      es
    });

    try {
      const language = await newLanguages.save();
      return response.status(200).send({ message: 'Mensagem adicionada com sucesso!', language: language })
    } catch(err) {
      return response.status(503).send({ error: err })
    }
  }

  async getLanguages(request, response) {
    try {
      const languages = await Language.find();
      return response.status(200).json(languages);
    } catch(err) {
      return response.status(503).send('Error: ', err)
    }
  }

  async updateLanguages(request, response) {
    const { id } = request.params;
    const { pt, en, es } = request.body;

    const newLanguages = {
      pt,
      en,
      es
    };

    try {
      const language = await Language.findByIdAndUpdate(id, newLanguages);
      return response.status(200).send({ message: 'Mensagem adicionada com sucesso!', language: language })
    } catch(err) {
      return response.status(503).send({ error: err })
    }  }
  
  async deleteLanguages(request, response) {

  }

}

module.exports = LanguagesController;
