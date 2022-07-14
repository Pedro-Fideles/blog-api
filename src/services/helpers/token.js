const jwt = require('jsonwebtoken');
require('dotenv').config();

const token = {
  createToken: (email) => {
    const secret = process.env.JWT_SECRET;
    const jwtConfig = {
      algorithm: 'HS256',
    };
    const tokenCreated = jwt.sign({ data: { email } }, secret, jwtConfig);

    return tokenCreated;
  },
};

module.exports = token;
