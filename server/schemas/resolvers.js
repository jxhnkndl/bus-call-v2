const resolvers = {
  Query: {
    test: () => {
      return {
        greeting: 'Hello from GraphQL'
      }
    }
  }
};

module.exports = resolvers;