const { gql } = require("apollo-server");

const imagesTypeDefs = gql`
  type Query {
    images(id: ID): [Image]!
  }

  type Mutation {
    images: ImagesMutation!
  }
  type Image {
    id: ID!
    name: String
    description: String
    base64data: String!
  }

  input ImageInput {
    name: String!
    description: String
    base64data: String!
  }

  type ImagesMutation {
    createImage(input: ImageInput!): [Image]!
    deleteImage(id: ID!): Boolean
  }
`;

const imagesResolvers = {
  Mutation: {
    images: () => ({}),
  },
  ImagesMutation: {
    createImage: async (_, { input }, { knex }) => {
      const result = await knex("images")
        .returning("*")
        .insert({ ...input });

      return {};
    },
    deleteImage: async (_, { id }, { knex }) => {
      const result = await knex("images").where({ id }).del();
      return result !== 0 ? true : false;
    },
  },
};

module.exports = { imagesTypeDefs, imagesResolvers };
