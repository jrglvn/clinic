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
    users: async (_, args) => {
      const data = args.id
        ? await knex("users").where({ id: args.id })
        : await knex("users");
      return data;
    },
    clients: async (_, args) => {
      const data = args.id
        ? await knex("clients").where({ id: args.id })
        : await knex("clients");
      return data;
    },
    appointments: async () => {
      const data = await knex("appointments");
      return data;
    },
  },
  Appointment: {
    client: async (parent) => {
      const data = await knex("clients").where({ id: parent.clients_id });
      return data[0];
    },
    user: async (parent) => {
      const data = await knex("users").where({ id: parent.users_id });
      return data[0];
    },
    category: async (parent) => {
      const data = await knex("categories").where({ id: parent.categories_id });
      return data[0];
    },
  },
};

module.exports = resolvers;
