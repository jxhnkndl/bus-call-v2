const typeDefs = `
  type Test {
    greeting: String
  }

  type Query {
    test: Test
  }
`;

module.exports = typeDefs;