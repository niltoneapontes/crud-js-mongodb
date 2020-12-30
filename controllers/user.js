const User = require('../models/user');
const  { v4: uuidv4 } = require('uuid');

class UserController {
  async getAll(req, res) {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch(err) {
      return res.status(503).send('Error: ', err)
    }
  }

  async createUser(req, res) {
    const { name, email, password, admin} = req.body;

    const foundUser = await User.find({ email: email });

    console.log(foundUser)

    if(foundUser.length !== 0) {
      return res.status(500).send({ message: 'Esse e-mail já foi cadastrado.'})
    }

    const newUser = new User({
      id: uuidv4(),
      name,
      email,
      password,
      admin
    });

    try {
      const user = await newUser.save();
      return res.status(200).send(user);
    }
    catch(err) {
      return res.status(503).send({ error: err });  
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;

    try {
      const user = await User.findOneAndDelete({ id: id });     
      return res.status(200).send({ message: 'Usuário deletado com sucesso', user: user });
    } catch(err) {
      return res.status(503).send({ error: err })
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { name, email, password, admin} = req.body;

    try {
      const user = await User.findOneAndUpdate({ id: id }, {
        name, 
        email,
        password,
        admin,
      });
      return res.status(200).send({ message: 'Usuário atualizado', user: user });
    } catch(err) {
      return res.status(503).send({ error: err });
    }
  }
}

module.exports = UserController;