const { ApolloServer, gql } = require("apollo-server");

var knex = require("knex")({
  client: "pg",
  connection: {
    host: "134.107.71.33",
    user: "postgres",
    password: "postgres",
    database: "postgres",
  },
});

knex
  .select()
  .from("categories")
  .then((data) => console.log(data));

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
];
const typeDefs = gql`
  type Client {
    id: ID!
    first_name: String!
    last_name: String!
    email: String
    address: String
    phone_number: String
  }
  type User {
    id: ID!
    first_name: String!
    last_name: String!
  }

  type Category {
    id: ID!
    name: String
  }

  type Image {
    id: ID!
    name: String
    description: String
    base64data: String!
  }

  type Appointment {
    id: ID!
    client_id: Int!
    user_id: Int!
    category_id: Int!
    date: String!
    result: String
    previous_appointment_id: Int
  }

  type Query {
    clients: [Client]!
    users: [User]!
    categories: [Category]!
    images: [Image]!
    appointments: [Appointment]!
  }
`;

const resolvers = {
  Query: {
    categories: () => [
      { id: "1", name: "neurologija" },
      { id: "2", name: "plastična kirurgija" },
    ],
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
