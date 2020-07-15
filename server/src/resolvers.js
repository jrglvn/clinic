var knex = require("knex")({
  client: "pg",
  connection: {
    host: "34.107.71.33",
    user: "postgres",
    password: "postgres",
    database: "postgres",
  },
});

const resolvers = {
  Query: {
    categories: async (_, { input }) => {
      const result = await knex("categories").where({ ...input });
      return result;
    },
    users: async (_, { input }) => {
      const result = await knex("users").where({ ...input });
      return result;
    },
    clients: async (_, { input }) => {
      const result = await knex("clients").where({ ...input });
      return result;
    },
    appointments: async (_, { input }) => {
      const result = await knex("appointments").where({ ...input });
      return result;
    },
  },

  Appointment: {
    client: async (parent) => {
      const result = await knex("clients").where({ id: parent.clients_id });
      return result[0];
    },
    user: async (parent) => {
      const result = await knex("users").where({ id: parent.users_id });
      return result[0];
    },
    category: async (parent) => {
      const result = await knex("categories").where({
        id: parent.categories_id,
      });
      return result[0];
    },
    previous_appointment: async (parent) => {
      const result = await knex("appointments").where({
        id: parent.previous_appointment_id,
      });
      return result[0];
    },
  },
  ClientsMutation: {
    addClient: async (_, { input }) => {
      const result = await knex("clients")
        .returning("*")
        .insert({ ...input });
      return result[0];
    },
    updateClient: async (_, { id, input }) => {
      const result = await knex("clients")
        .returning("*")
        .update({ ...input })
        .where({ id });
      return result[0];
    },
    deleteClient: async (_, { id }) => {
      const result = await knex("clients").where({ id }).del();
      return result !== 0 ? true : false;
    },
  },
  UsersMutation: {
    addUser: async (_, { input }) => {
      const result = await knex("users")
        .returning("*")
        .insert({ ...input });
      return result[0];
    },
    updateUser: async (_, { id, input }) => {
      const result = await knex("users")
        .returning("*")
        .update({ ...input })
        .where({ id });
      return result[0];
    },
    deleteUser: async (_, { id }) => {
      const result = await knex("users").where({ id }).del();
      return result !== 0 ? true : false;
    },
  },
  AppointmentsMutation: {
    addAppointment: async (_, { input }) => {
      const result = await knex("appointments")
        .returning("*")
        .insert({ ...input });
      return result[0];
    },
    updateAppointment: async (_, { id, input }) => {
      const result = await knex("appointments")
        .returning("*")
        .update({ ...input })
        .where({ id });
      return result[0];
    },
    deleteAppointment: async (_, { id }) => {
      const result = await knex("appointments").where({ id }).del();
      return result !== 0 ? true : false;
    },
  },
  CategoriesMutation: {
    addCategory: async (_, { input }) => {
      const result = await knex("categories")
        .returning("*")
        .insert({ name: input.name });
      return result[0];
    },

    updateCategory: async (_, { id, name }) => {
      const result = await knex("categories")
        .returning("*")
        .update({ name })
        .where({ id });
      return result[0];
    },
    deleteCategory: async (_, { id }) => {
      const result = await knex("categories").where({ id }).del();
      return result !== 0 ? true : false;
    },
  },
  ImagesMutation: {
    addImage: async (_, { input }) => {
      const result = await knex("images")
        .returning("*")
        .insert({ ...input });

      return {};
    },
    deleteImage: async (_, { id }) => {
      const result = await knex("images").where({ id }).del();
      return result !== 0 ? true : false;
    },
  },
};

module.exports = resolvers;
