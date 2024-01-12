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

        const isValidPw = await user.checkPassword(password);
        
        if (!isValidPw) throw AuthenticationError;

        const token = signToken(user);

        return { token, user };
      } catch (err) {
        console.error(err.message);
      }
    },
    createUser: async (parent, args) => {
      try {
        const user = await User.create(args);

        const token = signToken(user);

        return { token, user }
      } catch (err) {
        console.error(err);
      }
    }
  },
};

module.exports = resolvers;
