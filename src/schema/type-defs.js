const { gql } = require("apollo-server");

const typeDefs = gql`
  input CreateUserInput {
    id: ID!
    content: String!
  }
`

module.exports = { typeDefs };