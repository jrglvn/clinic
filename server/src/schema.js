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

  input ClientInput {
    first_name: String!
    last_name: String!
    email: String
    address: String
    phone_number: String
  }

  input UserInput {
    first_name: String!
    last_name: String!
  }

  input AppointmentInput {
    users_id: ID!
    clients_id: ID!
    categories_id: ID!
    date: String!
    result: String
    previous_appointment_id: ID
  }

  type Query {
    clients(id: ID): [Client!]
    users: [User!]
    categories: [Category!]
    images: [Image!]
    appointments: [Appointment!]
  }

  type Mutation {
    addClient(input: ClientInput!): Client!
    addUser(input: UserInput!): User!
    addCategory(name: String): Category!
    addAppointment(input: AppointmentInput): Appointment!
  }
`;

module.exports = typeDefs;
