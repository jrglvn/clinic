const { ApolloServer } = require("apollo-server-express");
import express, { Request, Response } from "express";
import "dotenv/config";

import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import { AuthDirective } from "./schema/directives";

const app = express();
app.use(cors());
app.use(cookieParser());

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

knex.on("query", (e) => console.log("query: ", e));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }: { req: any; res: Response }) => {
    //need to clean this up >> move to @authorization directive
    //if access token is correct find  user in DB and add him to req.obj
    //if no access token, check if refresh token is correct and check in DB if it's active
    //if refresh token still active, generate new access token and append it to res object, also add user to req. object
    let user;
    if (req.cookies["access_token"]) {
      const data = await jwt.verify(
        req.cookies["access_token"],
        process.env.ACCESS_TOKEN_SECRET
      );
      if (data) {
        const queryResults = await knex("users")
          .select("*")
          .where({ id: data.id });
        user = queryResults[0];
      } else res.status(400).send("tampered with token");
    } else if (req.cookies["refresh_token"]) {
      const data = await jwt.verify(
        req.cookies["refresh_token"],
        process.env.REFRESH_TOKEN_SECRET
      );
      //if token is valid check if it's active in database
      if (data) {
        const queryResults = await knex("refresh_tokens").where({
          token: req.cookies["refresh_token"],
        });
        //if refresh token exists create new access_token and add user to req.object
        if (queryResults != undefined && queryResults.length !== 0) {
          const access_token = await jwt.sign(
            { id: data.id },
            process.env.ACCESS_TOKEN_SECRET
          );
          //add token to cookies
          res.cookie("access_token", access_token, {
            maxAge: 1000 * 60 * 60 * 24,
          });
          const queryUsers = await knex("users")
            .select("*")
            .where({ id: data.id });
          user = queryUsers[0];
        }
      } else res.status(400).send("tampered with token");
    }

    return { knex, req, res, user };
  },
  schemaDirectives: {
    auth: AuthDirective,
  },
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
