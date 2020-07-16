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
exports.usersResolvers = exports.usersTypeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.usersTypeDefs = apollo_server_1.gql `
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
exports.usersResolvers = {
    Query: {
        users: (_, { input }, { knex }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield knex("users").where(Object.assign({}, input));
            return result;
        }),
    },
    Mutation: {
        users: () => ({}),
    },
    UsersMutation: {
        createUser: (_, { input }, { knex }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield knex("users")
                .returning("*")
                .insert(Object.assign({}, input));
            return result[0];
        }),
        updateUser: (_, { id, input }, { knex }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield knex("users")
                .returning("*")
                .update(Object.assign({}, input))
                .where({ id });
            return result[0];
        }),
        deleteUser: (_, { id }, { knex }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield knex("users").where({ id }).del();
            return result !== 0 ? true : false;
        }),
    },
};
//# sourceMappingURL=users.js.map