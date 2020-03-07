const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.SECRET;
const createToken = user =>
  jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    SECRET,
    { expiresIn: '1h' }
  );

module.exports = createToken;
