const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');

require('dotenv').config();

const secret = process.env.SECRET;
const expiration = process.env.EXPIRATION;

// Authenticate user's web token
const authMiddleware = (req) => {
  let token = req.body.token || req.headers.authorization;

  // Split authorization header into ["Bearer", "tokenValue"]
  // Keep the tokenValue
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  // Return request is no auth token is present
  if (!token) {
    return req;
  }

  // Decode web token
  // Attach logged in user data to request and return
  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch (error) {
    console.log('Token is invalid');
  }

  return req;
};

// Sign new JSON web tokens when user register for or logs into account
const signToken = ({ _id, email }) => {
  const payload = { _id, email };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = {
  authMiddleware,
  signToken,
  AuthenticationError: new GraphQLError('Failed to authenticate user', {
    extensions: {
      code: 'UNAUTHENTICATED'
    }
  })
}