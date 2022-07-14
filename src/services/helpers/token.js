const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const token = {
  createToken: (email) => {
    const jwtConfig = {
      algorithm: 'HS256',
    };
    const tokenCreated = jwt.sign({ data: { email } }, secret, jwtConfig);

    return tokenCreated;
  },
  decodeToken: (receivedToken) => {
    try {
      return jwt.verify(receivedToken, secret);
    } catch (error) {
      return { error: 'invalidToken' };
    }
  },
};

module.exports = token;
