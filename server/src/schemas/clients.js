const { gql } = require("apollo-server");

const clientsTypeDefs = gql`
  type Query {
    clients(input: ClientSearchInput): [Client]!
  }

  type Mutation {
    clients: ClientsMutation!
  }

  type Client {
    id: ID!
    first_name: String!
    last_name: String!
    email: String
    address: String
    phone_number: String
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

  type ClientsMutation {
    createClient(input: ClientInput!): Client!
    updateClient(id: ID!, input: ClientInput!): Client!
    deleteClient(id: ID!): Boolean
  }
`;

const clientResolvers = {
  Query: {
    clients: async (_, { input }, { knex }) => {
      const result = await knex("clients").where({ ...input });
      return result;
    },
  },
  Mutation: {
    clients: () => ({}),
  },

  ClientsMutation: {
    createClient: async (_, { input }, { knex }) => {
      const result = await knex("clients")
        .returning("*")
        .insert({ ...input });
      return result[0];
    },
    updateClient: async (_, { id, input }, { knex }) => {
      const result = await knex("clients")
        .returning("*")
        .update({ ...input })
        .where({ id });
      return result[0];
    },
    deleteClient: async (_, { id }, { knex }) => {
      const result = await knex("clients").where({ id }).del();
      return result !== 0 ? true : false;
    },
  },
};

module.exports = { clientsTypeDefs, clientResolvers };
