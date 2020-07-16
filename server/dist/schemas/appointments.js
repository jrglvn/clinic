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
exports.appointmentsResolvers = exports.appointmentsTypeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.appointmentsTypeDefs = apollo_server_1.gql `
  type Query {
    appointments(input: AppointmentSearchInput): [Appointment]!
  }

  type Mutation {
    appointments: AppointmentsMutation!
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

  type AppointmentsMutation {
    createAppointment(input: AppointmentInput!): Appointment!
    updateAppointment(id: ID!, input: AppointmentInput): Appointment!
    deleteAppointment(id: ID!): Boolean
  }
`;
exports.appointmentsResolvers = {
    Query: {
        appointments: (_, { input }, { knex }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield knex("appointments").where(Object.assign({}, input));
            return result;
        }),
    },
    Mutation: {
        appointments: () => ({}),
    },
    Appointment: {
        client: (parent, _, { knex }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield knex("clients").where({ id: parent.clients_id });
            return result[0];
        }),
        user: (parent, _, { knex }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield knex("users").where({ id: parent.users_id });
            return result[0];
        }),
        category: (parent, _, { knex }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield knex("categories").where({
                id: parent.categories_id,
            });
            return result[0];
        }),
        previous_appointment: (parent, _, { knex }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield knex("appointments").where({
                id: parent.previous_appointment_id,
            });
            return result[0];
        }),
    },
    AppointmentsMutation: {
        createAppointment: (_, { input }, { knex }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield knex("appointments")
                .returning("*")
                .insert(Object.assign({}, input));
            return result[0];
        }),
        updateAppointment: (_, { id, input }, { knex }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield knex("appointments")
                .returning("*")
                .update(Object.assign({}, input))
                .where({ id });
            return result[0];
        }),
        deleteAppointment: (_, { id }, { knex }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield knex("appointments").where({ id }).del();
            return result !== 0 ? true : false;
        }),
    },
};
//# sourceMappingURL=appointments.js.map