const { ApolloServer } = require("apollo-server-express");
import express from "express";
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";

function addTest(req, res, next) {
  res.set("Access-Control-Expose-Headers", "x-access_token, x-refresh-token");
  res.set("x-access_token", "access token t90tj34jt");
  res.set("x-refresh-token", "refresh token 53igj5094ejg590i");
  console.log(req.cookies);
  next();
}

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(addTest);

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
    const token = req.headers?.authorization || "";

    return { token, knex, bcrypt, jwt, res };
  },
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
