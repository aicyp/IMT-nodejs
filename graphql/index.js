const { ApolloServer } = require('apollo-server');
const typeDefs = require('./type_defs.js')

const contacts = [
  {
    "id": "EktuXZAKl",
    "lastName": "Wayne",
    "firstName": "Bruce"
  },
  {
    "id": "N1BtXbAte",
    "lastName": "Parker",
    "firstName": "Peter"
  },
  {
    "id": "4JAK7ZCKx",
    "lastName": "Storm",
    "firstName": "Jane"
  },
  {
    "id": "4JU9XZAKe",
    "lastName": "Richards",
    "firstName": "Red"
  }
];

const resolvers = {
  /* Mutation: {
    ""
  }, */
  Query: {
    getContacts: () => contacts
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at url ${url}`);
});