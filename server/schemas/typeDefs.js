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
    admin: [Artist]
  }  

  type Contact {
    name: String
    phone: String
    email: String
  }

  type Artist {
    _id: ID!
    name: String!
    bio: String
    profilePhoto: String
    label: Contact
    manager: Contact
    bookingAgent: Contact
    tourManager: Contact
    concerts: [Concert]
    crew: [User]
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
    me: Auth
  }

  type Mutation {
    createUser(email: String!, password: String!, firstName: String!, lastName: String!, bio: String, profilePhoto: String, roles: [String]): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;