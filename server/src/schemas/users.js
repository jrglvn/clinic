const { gql } = require("apollo-server");

const usersTypeDefs = gql`
  type Query {
    users(input: UserSearchInput): [User]!
  }

  type Mutation {
    users: UsersMutation!
  }
  type User {
    id: ID!
    first_name: String!
    last_name: String!
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

  type UsersMutation {
    createUser(input: UserInput!): User!
    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): Boolean
  }
`;

const usersResolvers = {
  Query: {
    users: async (_, { input }, { knex }) => {
      const result = await knex("users").where({ ...input });
      return result;
    },
  },
  Mutation: {
    users: () => ({}),
  },

  UsersMutation: {
    createUser: async (_, { input }, { knex }) => {
      const result = await knex("users")
        .returning("*")
        .insert({ ...input });
      return result[0];
    },
    updateUser: async (_, { id, input }, { knex }) => {
      const result = await knex("users")
        .returning("*")
        .update({ ...input })
        .where({ id });
      return result[0];
    },
    deleteUser: async (_, { id }, { knex }) => {
      const result = await knex("users").where({ id }).del();
      return result !== 0 ? true : false;
    },
  },
};

module.exports = { usersTypeDefs, usersResolvers };
