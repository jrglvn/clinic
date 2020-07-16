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
exports.categoriesResolvers = exports.categoriesTypeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.categoriesTypeDefs = apollo_server_1.gql `
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
exports.categoriesResolvers = {
    Query: {
        categories: (_, { input }, { knex }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield knex("categories").where(Object.assign({}, input));
            return result;
        }),
    },
    Mutation: {
        categories: () => ({}),
    },
    CategoriesMutation: {
        createCategory: (_, { input }, { knex }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield knex("categories")
                .returning("*")
                .insert({ name: input.name });
            return result[0];
        }),
        updateCategory: (_, { id, name }, { knex }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield knex("categories")
                .returning("*")
                .update({ name })
                .where({ id });
            return result[0];
        }),
        deleteCategory: (_, { id }, { knex }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield knex("categories").where({ id }).del();
            return result !== 0 ? true : false;
        }),
    },
};
//# sourceMappingURL=categories.js.map