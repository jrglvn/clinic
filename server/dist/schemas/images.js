"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagesResolvers = exports.imagesTypeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.imagesTypeDefs = apollo_server_1.gql `
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
    createImage(input: ImageInput!): Image!
    deleteImage(id: ID!): Boolean
  }
`;
exports.imagesResolvers = {
    Mutation: {
        images: () => ({}),
    },
    ImagesMutation: {
        createImage: (_, { input }, { knex }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield knex("images")
                .returning("*")
                .insert(Object.assign({}, input));
            return result;
        }),
        deleteImage: (_, { id }, { knex }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield knex("images").where({ id }).del();
            return result !== 0 ? true : false;
        }),
    },
};
//# sourceMappingURL=images.js.map