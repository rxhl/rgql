const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.SECRET;

module.exports = context => {
  // Pull token from header
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token!');
      }
    }
    throw new Error('Token error!');
  }
  throw new Error('No token found!');
};
