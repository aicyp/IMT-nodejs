const { gql } = require('apollo-server');

const typeDefs = gql`
  type Contact {
    id: String!
    firstName: String
    lastName: String
  }

  input ContactInput {
    id: String!
    firstName: String
    lastName: String
  }

  type Query {
    getContacts: [Contact]
  }

  type Mutation {
    addContact(contact: ContactInput): Contact
    deleteContact(id: String): String
    updateContact(contact: ContactInput): Contact
  }
`;

module.exports = typeDefs;