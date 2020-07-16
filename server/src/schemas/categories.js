const { gql } = require("apollo-server");

const categoriesTypeDefs = gql`
  type Query {
    """
    provide any input or none
    """
    categories(input: CategorySearchInput): [Category!]
  }

  type Mutation {
    categories: CategoriesMutation!
  }
  type Category {
    id: ID!
    name: String
  }

  input CategoryInput {
    name: String
  }
  input CategorySearchInput {
    id: ID
    name: String
  }
  type ClientsMutation {
    createClient(input: ClientInput!): Client!
    updateClient(id: ID!, input: ClientInput!): Client!
    deleteClient(id: ID!): Boolean
  }
`;

const categoriesResolvers = {
  Query: {
    categories: async (_, { input }, { knex }) => {
      const result = await knex("categories").where({ ...input });
      return result;
    },
  },
  Mutation: {
    categories: () => ({}),
  },

  CategoriesMutation: {
    createCategory: async (_, { input }, { knex }) => {
      const result = await knex("categories")
        .returning("*")
        .insert({ name: input.name });
      return result[0];
    },

    updateCategory: async (_, { id, name }, { knex }) => {
      const result = await knex("categories")
        .returning("*")
        .update({ name })
        .where({ id });
      return result[0];
    },
    deleteCategory: async (_, { id }, { knex }) => {
      const result = await knex("categories").where({ id }).del();
      return result !== 0 ? true : false;
    },
  },
};

module.exports = { categoriesTypeDefs, categoriesResolvers };
