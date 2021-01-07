const { verify } = require("jsonwebtoken");
const config = require('../config/jwt');

function ensureAuthenticated(request, response, next) {
  const header = request.headers.authorization;

  if(!header) {
    throw new Error('There is no JWT');
  }

  const [,token] = header.split(' ');

  try {
    const verified = verify(token, config.secret);

    const { sub } = verified;

    request.user = {
      id: sub,
    };

    return next()
  } catch(err) {
    throw new Error('Token de autenticação inválido. Realize login novamente.');
  }
}

module.exports = ensureAuthenticated;
