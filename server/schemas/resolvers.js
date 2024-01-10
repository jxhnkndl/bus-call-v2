const { Artist, Concert, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {},
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { type, email, password }) => {
      const user = await User.findOne({ email })
        .select('-__v')
        .populate({
          path: 'artists',
          select: '-__v ',
          populate: [
            { path: 'concerts', select: '-__v' },
            { path: 'crew', select: '-__v' },
          ],
        })
        .populate({
          path: 'admin',
          select: '-__v',
        });

      if (!user) {
        throw AuthenticationError;
      }

      const isValidPw = await user.checkPassword(password);

      if (!isValidPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
