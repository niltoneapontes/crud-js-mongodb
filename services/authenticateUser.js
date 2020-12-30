const User = require('../models/user');
const { sign } = require('jsonwebtoken');
const { compare } = require('bcryptjs');
const config = require('../config/jwt');

const { secret , expiresIn } = config;

const authenticateUser = async(email, password) => {
  const user = await User.findOne({ email: email });

  const checkedPassword = await compare(password, user.password);

  if(!checkedPassword) {
    throw new Error('Senha não confere');
  }

  const token = sign({}, secret, {
    subject: user.id,
    expiresIn
  });

  return {
    user,
    token
  }
}

module.exports = authenticateUser;