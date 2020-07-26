import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { clientsTypeDefs, clientsResolvers } from "./clients";
import { usersTypeDefs, usersResolvers } from "./users";
import { appointmentsTypeDefs, appointmentsResolvers } from "./appointments";
import { imagesTypeDefs, imagesResolvers } from "./images";
import { categoriesTypeDefs, categoriesResolvers } from "./categories";
import { gql } from "apollo-server";

const typeDefs = [
  gql`
    enum ROLES {
      ADMIN
      USER
    }
    directive @auth(requires: ROLES = ADMIN) on OBJECT | FIELD_DEFINITION

    type Query @auth(requires: USER)
  `,
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

export const mergedResolvers = mergeResolvers(resolvers);
export const mergedTypeDefs = mergeTypeDefs(typeDefs);
