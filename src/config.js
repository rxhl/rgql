require('dotenv').config();

module.exports = {
  MONGODB: `mongodb+srv://${process.env.USER}:${process.env.PSWD}@cluster0-fn8vt.mongodb.net/test?retryWrites=true&w=majority`,
  PORT: 5000
};
