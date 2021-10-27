const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Booking {
  _id: ID!
  event: Event!
  user: User!
  createdAt: String!
  updatedAt: String!
}

type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
}

type User {
  _id: ID!
  email: String!
  name: String
  password:String
  createdEvent : [Event!]
}

input EventInput {
   title: String!
   description: String!
   price: Float!
   date: String!
   userEmail: String
}
input UserInput {
  email: String!
  password: String!
  name: String!
}

type RootQuery {
  events: [Event!]!
  bookings: [Booking!]!
}
type RootMutation {
  createEvent(eventInput: EventInput): Event
  createUser(userInput: UserInput) : User
  bookEvent(eventTitle:String!, userEmail:String!) : Booking!
  cancelBooking(bookingId: ID!) : Event!
}
schema {
  query : RootQuery
  mutation : RootMutation
}
`);