const typeDefs = `
  type User {
    _id: ID!
    email: String
    firstName: String
    lastName: String
    bio: String
    profilePhoto: String
    roles: [String]
    concerts: [Concert]
  }  

  type ContactInfo {
    name: String
    email: String
    phone: String
  }

  type Concert {
    _id: ID!
    date: String
    headliner: String
    support: [String]
    venue: String
    address: String
    city: String
    state: String
    zip: String
    country: String
    capacity: Int
    doors: String
    promoter: ContactInfo
    bookingAgent: ContactInfo
    tourManager: ContactInfo
    parking: Boolean
    soundcheck: Boolean
    lounge: Boolean
    catering: Boolean
    wifi: Boolean
    showers: Boolean
    rider: Boolean
    hotel: Boolean
    daysheet: [Timeslot]
    closed: Boolean
  }

  type Timeslot {
    timeslot: String!
    event: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input ContactInput {
    name: String
    email: String
    phone: String
  }

  type Query {
    test: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(email: String!, password: String!, firstName: String!, lastName: String!): Auth
  }
`;

module.exports = typeDefs;