const { gql } = require('apollo-server');

const typeDefs = gql`
  type Contact {
    id: String!
    firstName: String
    lastName: String
  }

  type Query {
    getContacts: [Contact]
  }
`;

module.exports = typeDefs;