const { ApolloServer } = require("apollo-server-express");
import express, { Request, Response } from "express";
import "dotenv/config";

import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
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
  context: async ({ req, res }: { req: any; res: Response }) => {
    if (req.cookies["access_token"]) {
      const data = await jwt.verify(
        req.cookies["access_token"],
        process.env.ACCESS_TOKEN_SECRET
      );
      const queryResults = await knex("users")
        .select("*")
        .where({ id: data.id });
      const user = queryResults[0];
      req.user = user;
      console.log(user);
    }
    return { knex, req, res };
  },
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
