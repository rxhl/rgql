require('dotenv').config();

module.exports = {
  MONGODB: `mongodb+srv://${process.env.USER}:${process.env.PSWD}@cluster0-fn8vt.mongodb.net/merng?retryWrites=true&w=majority`,
  PORT: process.env.PORT || 5000
};
