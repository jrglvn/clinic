const { gql } = require("apollo-server");

const typeDefs = gql`
  type Client {
    id: ID!
    first_name: String!
    last_name: String!
    email: String
    address: String
    phone_number: String
  }
  type User {
    id: ID!
    first_name: String!
    last_name: String!
  }

  type Category {
    id: ID!
    name: String
  }

  type Image {
    id: ID!
    name: String
    description: String
    base64data: String!
  }

  type Appointment {
    id: ID!
    user: User!
    client: Client!
    category: Category!
    date: String!
    result: String
    previous_appointment: Appointment
  }

  type Query {
    clients: [Client!]
    users: [User!]
    categories: [Category!]
    images: [Image!]
    appointments: [Appointment!]
  }
`;

module.exports = typeDefs;
