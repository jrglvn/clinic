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
      const data = await knex("categories");
      return data;
    },
    users: async () => {
      const data = await knex("users");
      return data;
    },
    clients: async () => {
      const data = await knex("clients");
      return data;
    },
    appointments: async () => {
      const data = await knex("appointments");
      return data;
    },
  },
  Appointment: {
    client: async (parent) => {
      const data = await knex
        .select()
        .from("clients")
        .where({ id: parent.clients_id });
      return data[0];
    },
    user: async (parent) => {
      const data = await knex
        .select()
        .from("users")
        .where({ id: parent.users_id });
      return data[0];
    },
    category: async (parent) => {
      const data = await knex
        .select()
        .from("clients")
        .where({ id: parent.categories_id });
      return data[0];
    },
  },
};

module.exports = resolvers;
