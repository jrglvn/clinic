import { gql, UserInputError } from "apollo-server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const usersTypeDefs = gql`
  type Query {
    users: UsersQuery
  }

  type UsersQuery {
    getUsers(input: UserSearchInput): [User]! @auth
    me: User!
  }

  type Mutation {
    users: UsersMutation!
  }
  type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    role: ROLES!
  }

  input UserInput {
    first_name: String
    last_name: String
    email: String
    password: String
    role: ROLES
  }

  input UserSearchInput {
    id: ID
    first_name: String
    last_name: String
    email: String
    role: ROLES
  }

  type UsersMutation {
    createUser(input: UserInput!): User! @auth
    updateUser(id: ID!, input: UserInput!): User! @auth
    deleteUser(id: ID!): Boolean! @auth
    login(email: String, password: String): Boolean!
    logout: Boolean!
  }
`;

export const usersResolvers = {
  Query: { users: () => ({}) },
  Mutation: {
    users: () => ({}),
  },
  UsersQuery: {
    getUsers: async (_, { input }, { knex }) => {
      const queryResults = await knex("users").where({ ...input });
      return queryResults;
    },
    me: (_, __, { user }) => {
      return user;
    },
  },
  UsersMutation: {
    createUser: async (_, { input }, { knex }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const queryResults = await knex("users")
        .returning("*")
        .insert({ ...input, password: hashedPassword });
      return queryResults[0];
    },
    updateUser: async (_, { id, input }, { knex }) => {
      const queryResults = await knex("users")
        .returning("*")
        .update({ ...input })
        .where({ id });
      return queryResults[0];
    },
    deleteUser: async (_, { id }, { knex }) => {
      const queryResults = await knex("users").where({ id }).del();
      return queryResults !== 0 ? true : false;
    },
    login: async (_, { email, password }, { knex, res }) => {
      const queryResults = await knex("users").select("*").where({ email });
      if (queryResults === undefined || queryResults.length === 0)
        throw new UserInputError("Form Arguments invalid", {
          invalidArgs: "no user with provided email",
        });

      const isPasswordCorrect: boolean = await bcrypt.compare(
        password,
        queryResults[0].password
      );
      if (!isPasswordCorrect)
        throw new UserInputError("Form Arguments invalid", {
          invalidArgs: "provided password does not match",
        });
      const access_token = await jwt.sign(
        { id: queryResults[0].id },
        process.env.ACCESS_TOKEN_SECRET
      );
      const refresh_token = await jwt.sign(
        { id: queryResults[0].id },
        process.env.REFRESH_TOKEN_SECRET
      );
      //add refresh token to database
      await knex("refresh_tokens").insert({ token: refresh_token });

      //add tokens to cookies
      res.cookie("access_token", access_token, {
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.cookie("refresh_token", refresh_token, {
        expires: new Date("2-2-2222"),
      });

      return true;
    },
    logout: async (_, __, { req, res, knex }) => {
      if (req.cookies["refresh_token"]) {
        const queryResults = await knex("refresh_tokens")
          .where({
            token: req.cookies["refresh_token"],
          })
          .del();
      }
      res.clearCookie("refresh_token");
      res.clearCookie("access_token");
      console.log("deleted cookies & db.token");
      return true;
    },
  },
};
