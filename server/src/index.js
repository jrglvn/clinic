const { ApolloServer } = require("apollo-server");

const { typeDefs, resolvers } = require("./schemas/index");

var knex = require("knex")({
  client: "pg",
  connection: {
    host: "34.107.71.33",
    user: "postgres",
    password: "postgres",
    database: "postgres",
  },
});
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { knex },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
