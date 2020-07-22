import { gql, UserInputError } from "apollo-server";

export const usersTypeDefs = gql`
  type Query {
    users(input: UserSearchInput): [User]!
  }

  type Mutation {
    users: UsersMutation!
  }
  type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
  }

  type LoginqueryResults {
    access_token: String
    refresh_token: String
  }

  input UserInput {
    first_name: String
    last_name: String
    email: String
    password: String
  }

  input UserSearchInput {
    id: ID
    first_name: String
    last_name: String
    email: String
  }

  type UsersMutation {
    createUser(input: UserInput!): User!
    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): Boolean
    login(email: String, password: String): LoginqueryResults!
  }
`;

export const usersResolvers = {
  Query: {
    users: async (_, { input }, { knex }) => {
      const queryResults = await knex("users").where({ ...input });
      return queryResults;
    },
  },
  Mutation: {
    users: () => ({}),
  },

  UsersMutation: {
    createUser: async (_, { input }, { knex, bcrypt }) => {
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
    login: async (_, { email, password }, { knex, bcrypt, jwt, res }) => {
      const queryResults = await knex("users").select("*").where({ email });
      if (queryResults === undefined || queryResults.length === 0)
        throw new UserInputError("Form Arguments invalid", {
          invalidArgs: "no user with provided email",
        });

      const samePasswords: boolean = await bcrypt.compare(
        password,
        queryResults[0].password
      );
      if (!samePasswords)
        throw new UserInputError("Form Arguments invalid", {
          invalidArgs: "provided password does not match",
        });
      console.log(queryResults[0]);
      const access_token = await jwt.sign(
        { id: queryResults[0].id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
      );
      const refresh_token = await jwt.sign(
        { id: queryResults[0].id },
        process.env.REFRESH_TOKEN_SECRET
      );
      res.cookie("BEARER", refresh_token);
      return { access_token, refresh_token };
    },
  },
};
