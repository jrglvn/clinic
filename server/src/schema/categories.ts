import { gql } from "apollo-server";

export const categoriesTypeDefs = gql`
  type Query {
    categories(input: CategorySearchInput): [Category]!
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
  type CategoriesMutation {
    createCategory(input: CategoryInput): Category!
    updateCategory(id: ID!, input: CategoryInput): Category!
    deleteCategory(id: ID!): Boolean
  }
`;

export const categoriesResolvers = {
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
    createCategory: async (_, { input: { name } }, { knex }) => {
      const result = await knex("categories").returning("*").insert({ name });
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
