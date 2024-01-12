const { Concert, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    test: () => {
      return 'Hello';
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      try {
        // Find user
        const user = await User.findOne({ email: email })
          .select('-__v')
          .populate({
            path: 'concerts',
            select: '-__v',
            populate: [
              { path: 'promoter' },
              { path: 'bookingAgent' },
              { path: 'tourManager' },
            ]
          })

        if (!user) throw AuthenticationError;

        // Check password
        const isValidPw = await user.checkPassword(password);
        if (!isValidPw) throw AuthenticationError;

        // Sign and deliver token and user data
        const token = signToken(user);

        return { token, user };
      } catch (err) {
        console.error(err.message);
      }
    },
  },
};

module.exports = resolvers;
