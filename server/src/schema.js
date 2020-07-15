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
    first_name: String
    last_name: String
    email: String
    address: String
    phone_number: String
  }

  input ClientSearchInput {
    id: ID
    first_name: String
    last_name: String
    email: String
    address: String
    phone_number: String
  }

  input UserInput {
    first_name: String
    last_name: String
  }

  input UserSearchInput {
    id: ID
    first_name: String
    last_name: String
  }

  input AppointmentInput {
    users_id: ID
    clients_id: ID
    categories_id: ID
    date: String
    result: String
    previous_appointment_id: ID
  }

  input AppointmentSearchInput {
    id: ID
    users_id: ID
    clients_id: ID
    categories_id: ID
    date: String
    result: String
    previous_appointment_id: ID
  }
  input CategoryInput {
    name: String
  }
  input CategorySearchInput {
    id: ID
    name: String
  }

  input ImageInput {
    name: String!
    description: String
    base64data: String!
  }

  type Query {
    """
    if no input provided, returns all records
    """
    clients(input: ClientSearchInput): [Client!]
    """
    if no input provided, returns all records
    """
    users(input: UserSearchInput): [User!]
    """
    if no input provided, returns all records
    """
    categories(input: CategorySearchInput): [Category!]
    """
    if no input provided, returns all records
    """
    images(id: ID): [Image!]
    """
    if no input provided, returns all records
    """
    appointments(input: AppointmentSearchInput): [Appointment!]
  }

  type ClientsMutation {
    addClient(input: ClientInput!): Client!
    updateClient(id: ID!, input: ClientInput!): Client!
    deleteClient(id: ID!): Boolean
  }

  type UsersMutation {
    addUser(input: UserInput!): User!
    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): Boolean
  }

  type AppointmentsMutation {
    addAppointment(input: AppointmentInput!): Appointment!
    updateAppointment(id: ID!, input: AppointmentInput): Appointment!
    deleteAppointment(id: ID!): Boolean
  }

  type CategoriesMutation {
    addCategory(input: CategoryInput): [Category]!
    updateCategory(id: ID!, input: CategoryInput): [Category]!
    deleteCategory(id: ID!): Boolean!
  }

  type ImagesMutation {
    addImage(input: ImageInput!): [Image]!
    deleteImage(id: ID!): Boolean
  }

  type Mutation

  extend type Mutation {
    clients: ClientsMutation!
    users: UsersMutation!
    appointments: AppointmentsMutation!
    categories: CategoriesMutation!
    images: ImagesMutation!
  }
`;

module.exports = typeDefs;
