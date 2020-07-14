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
    categories: async () => {
      const result = await knex("categories").orderBy("id");
      return result;
    },
    users: async (_, args) => {
      const result = args.id
        ? await knex("users").where({ id: args.id })
        : await knex("users");
      return result;
    },
    clients: async (_, args) => {
      const result = args.id
        ? await knex("clients").where({ id: args.id })
        : await knex("clients");
      return result;
    },
    appointments: async () => {
      const result = await knex("appointments");
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
  Mutation: {
    addUser: async (_, { input }) => {
      const result = await knex("users")
        .returning("*")
        .insert({ ...input });
      return result[0];
    },
    addClient: async (_, { input }) => {
      const result = await knex("clients")
        .returning("*")
        .insert({ ...input });
      return result[0];
    },
    addCategory: async (_, { name }) => {
      const result = await knex("categories").returning("*").insert({ name });
      return result[0];
    },
    addAppointment: async (_, { input }) => {
      const result = await knex("appointments")
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
    updateClient: async (_, { id, input }) => {
      const result = await knex("clients")
        .returning("*")
        .update({ ...input })
        .where({ id });
      return result[0];
    },
    updateCategory: async (_, { id, name }) => {
      const result = await knex("categories")
        .returning("*")
        .update({ name })
        .where({ id });
      return result[0];
    },
    updateAppointment: async (_, { id, input }) => {
      const result = await knex("appointments")
        .returning("*")
        .update({ ...input })
        .where({ id });
      return result[0];
    },
  },
};

module.exports = resolvers;
