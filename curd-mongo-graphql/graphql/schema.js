const {buildSchema} = require('graphql');

module.exports = buildSchema(`
  type TestData {
    text : String!
    view: Int!
  }
  type User {
    id : ID
    name : String!
    email: String!
    password : String!
  }

  type RootQuery {
    hello : TestData!
    getUsers: [User]!
    user(id:ID!) : User!
  }

  type RootMutation {
    createUser(name: String, email: String, password: String) : User!
    updateUser(id: ID!, name: String!, email: String!) : User!
    deleteUser(id:ID!) : User!
  }

  schema {
    query : RootQuery
    mutation : RootMutation
  }
`);