const { mergeResolvers, mergeTypeDefs } = require("@graphql-tools/merge");
const { clientsTypeDefs, clientsResolvers } = require("./clients");
const { usersTypeDefs, usersResolvers } = require("./users");
const {
  appointmentsTypeDefs,
  appointmentsResolvers,
} = require("./appointments");
const { imagesTypeDefs, imagesResolvers } = require("./images");
const { categoriesTypeDefs, categoriesResolvers } = require("./categories");

const typeDefs = [
  clientsTypeDefs,
  usersTypeDefs,
  appointmentsTypeDefs,
  imagesTypeDefs,
  categoriesTypeDefs,
];

const resolvers = [
  clientsResolvers,
  usersResolvers,
  appointmentsResolvers,
  imagesResolvers,
  categoriesResolvers,
];

const mergedResolvers = mergeResolvers(resolvers);
const mergedTypeDefs = mergeTypeDefs(typeDefs);

module.exports = { typeDefs: mergedTypeDefs, resolvers: mergedResolvers };
