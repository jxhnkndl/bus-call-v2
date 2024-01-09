const { Artist, Concert, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).select(
          '-password -__v'
        );

        return user;
      }

      throw AuthenticationError;
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      console.log(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email })
        .select('-__v')
        .populate({
          path: 'artists',
          select: '-__v ',
          populate: { path: 'concerts', select: '-__v' },
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
