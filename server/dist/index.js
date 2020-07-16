"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schemas_1 = require("./schemas");
var knex = require("knex")({
    client: "pg",
    connection: {
        host: "34.107.71.33",
        user: "postgres",
        password: "postgres",
        database: "postgres",
    },
});
const server = new apollo_server_1.ApolloServer({
    typeDefs: schemas_1.mergedTypeDefs,
    resolvers: schemas_1.mergedResolvers,
    context: { knex },
});
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map