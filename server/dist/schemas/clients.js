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
exports.clientsResolvers = exports.clientsTypeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.clientsTypeDefs = apollo_server_1.gql `
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
exports.clientsResolvers = {
    Query: {
        clients: (_, { input }, { knex }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield knex("clients").where(Object.assign({}, input));
            return result;
        }),
    },
    Mutation: {
        clients: () => ({}),
    },
    ClientsMutation: {
        createClient: (_, { input }, { knex }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield knex("clients")
                .returning("*")
                .insert(Object.assign({}, input));
            return result[0];
        }),
        updateClient: (_, { id, input }, { knex }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield knex("clients")
                .returning("*")
                .update(Object.assign({}, input))
                .where({ id });
            return result[0];
        }),
        deleteClient: (_, { id }, { knex }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield knex("clients").where({ id }).del();
            return result !== 0 ? true : false;
        }),
    },
};
//# sourceMappingURL=clients.js.map