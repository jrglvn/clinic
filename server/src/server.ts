import { ApolloServer } from "apollo-server";
import express from "express";
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();

import {
  mergedTypeDefs as typeDefs,
  mergedResolvers as resolvers,
} from "./schema";

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
  context: (req, res) => {
    return { knex, bcrypt, jwt };
  },
});

// server.applyMiddleware({ app });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
