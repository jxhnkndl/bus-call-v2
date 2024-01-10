const { Artist, Concert, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {},
  Mutation: {
    login: async (parent, { type, email, password }) => {
      try {
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

        if (!user) throw AuthenticationError;

        const isValidPw = await user.checkPassword(password);

        if (!isValidPw) throw AuthenticationError;

        const token = signToken(user);

        return { token, user };
      } catch (err) {
        console.log(err);
      }
    },
    createUser: async (parent, args) => {
      try {
        const user = await User.create(args);

        const token = signToken(user);

        return { token, user };
      } catch (err) {
        console.log(err);
      }
    }
  },
};

module.exports = resolvers;
