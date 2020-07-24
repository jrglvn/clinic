const { ApolloServer } = require("apollo-server-express");
import express, { Request, Response } from "express";
import "dotenv/config";

import cookieParser from "cookie-parser";
import cors from "cors";

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
import { ResolveOptions } from "dns";

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
  context: ({ req, res }: { req: Request; res: Response }) => {
    return { knex, req, res };
  },
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
