const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');

// utils
const User = require('../../models/User');
const createToken = require('../../util/createToken');
const {
  validateRegisterInput,
  validateLoginInput
} = require('../../util/validators');

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      // 0. Input check
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      // 1. Check if the user actually exists (Authorize)
      const user = await User.findOne({ username });
      if (!user) {
        errors.general = 'User not found.';
        throw new UserInputError('User not found.', { errors });
      }

      // 2. Check if the passwords actually match (Authenticate)
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong credentials.';
        throw new UserInputError('Wrong credentials.', { errors });
      }

      // 3. At this point, the user has successfully logged in, issue a token.
      const token = createToken(user);
      return {
        ...user._doc,
        id: user.id,
        token
      };
    },
    async register(parent, args, context, info) {
      // Destructure args
      let {
        registerInput: { username, email, password, confirmPassword }
      } = args;

      // 1. Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      // 2. Make sure new user does not already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken'
          }
        });
      }

      // 3. Hash password
      password = await bcrypt.hash(password, 12);

      // 4. Save new user
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      });

      const res = await newUser.save();

      // 5. Create token
      const token = createToken(res);

      return {
        ...res._doc,
        id: res.id,
        token
      };
    }
  }
};
