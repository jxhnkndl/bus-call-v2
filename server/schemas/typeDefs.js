const typeDefs = `
  type User {
    _id: ID!
    email: String!
    firstName: String!
    lastName: String!
    bio: String
    profilePhoto: String
    roles: [String]
    artists: [Artist]
  }  

  type Artist {
    _id: ID!
    name: String!
    concerts: [Concert]
    crew: [User]
    admin: User
  }

  type Concert {
    _id: ID!
    date: String!
    closed: Boolean
    venue: String!
    address: String!
    city: String!
    state: String
    zip: String
    country: String
    capacity: Int
    promoter: String
    promoterEmail: String
    doors: String!
    headliner: String!
    support: String
    parking: Boolean
    soundcheck: Boolean
    lounge: Boolean
    catering: Boolean
    wifi: Boolean
    showers: Boolean
    rider: Boolean
    hotel: Boolean
    daysheet: [Timeslot]
  }

  type Timeslot {
    timeslot: String!
    event: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    createUser(email: String!, password: String!, firstName: String!, lastName: String!, bio: String, profilePhoto: String, roles: [String]): Auth
  }
`;

module.exports = typeDefs;