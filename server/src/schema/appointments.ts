import { gql } from "apollo-server";
import { AppointmentsMutationResolvers } from "./types";
import moment from "moment";

export const appointmentsTypeDefs = gql`
  type Query {
    appointments: AppointmentsQuery!
  }

  type AppointmentsQuery {
    allAppointments(input: AppointmentSearchInput): [Appointment]!
    appointmentsForWeek(input: AppointmentsWeekInput): [Appointment]!
  }

  type Mutation {
    appointments: AppointmentsMutation!
  }
  type Appointment {
    id: ID!
    user: User!
    client: Client!
    category: Category
    created_at: String!
    scheduled_for: String!
    result: String
    previous_appointment: Appointment
  }

  input AppointmentInput {
    users_id: ID!
    clients_id: ID!
    categories_id: ID!
    created_at: String
    scheduled_for: String!
    result: String
    previous_appointment_id: ID
  }

  input AppointmentSearchInput {
    id: ID
    users_id: ID
    clients_id: ID
    categories_id: ID
    created_at: String
    scheduled_for: String
    result: String
    previous_appointment_id: ID
  }

  input AppointmentsWeekInput {
    year: Int!
    week: Int!
  }

  type AppointmentsMutation {
    createAppointment(input: AppointmentInput!): Appointment!
    updateAppointment(id: ID!, input: AppointmentInput): Appointment!
    deleteAppointment(id: ID!): Boolean
  }
`;

export const appointmentsResolvers = {
  Query: {
    appointments: () => ({}),
  },
  Mutation: {
    appointments: () => ({}),
  },

  Appointment: {
    client: async (parent, _, { knex }) => {
      const result = await knex("clients").where({ id: parent.clients_id });
      return result[0];
    },
    user: async (parent, _, { knex }) => {
      const result = await knex("users").where({ id: parent.users_id });
      return result[0];
    },
    category: async (parent, _, { knex }) => {
      const result = await knex("categories").where({
        id: parent.categories_id,
      });
      return result[0];
    },
    previous_appointment: async (parent, _, { knex }) => {
      const result = await knex("appointments").where({
        id: parent.previous_appointment_id,
      });
      return result[0];
    },
  },
  AppointmentsQuery: {
    allAppointments: async (_, { input }, { knex }) => {
      const results = await knex("appointments").where({ ...input });
      console.log("apointments 0: ", results[0]);
      return results;
    },
    appointmentsForWeek: async (_, { input: { year, week } }, { knex }) => {
      const date = moment().year(year).week(week).day("monday");
      const results = await knex("appointments")
        .where("scheduled_for", ">=", date.format("YYYY-MM-DD"))
        .where("scheduled_for", "<", date.add(1, "week").format("YYYY-MM-DD"));
      return results;
    },
  },
  AppointmentsMutation: <AppointmentsMutationResolvers>{
    createAppointment: async (_, { input }, { knex }) => {
      const result = await knex("appointments")
        .returning("*")
        .insert({ ...input });
      return result[0];
    },
    updateAppointment: async (_, { id, input }, { knex }) => {
      const result = await knex("appointments")
        .returning("*")
        .update({ ...input })
        .where({ id });
      return result[0];
    },
    deleteAppointment: async (_, { id }, { knex }) => {
      const result = await knex("appointments").where({ id }).del();
      return result !== 0 ? true : false;
    },
  },
};
