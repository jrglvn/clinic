"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergedTypeDefs = exports.mergedResolvers = void 0;
const merge_1 = require("@graphql-tools/merge");
const clients_1 = require("./clients");
const users_1 = require("./users");
const appointments_1 = require("./appointments");
const images_1 = require("./images");
const categories_1 = require("./categories");
const typeDefs = [
    clients_1.clientsTypeDefs,
    users_1.usersTypeDefs,
    appointments_1.appointmentsTypeDefs,
    images_1.imagesTypeDefs,
    categories_1.categoriesTypeDefs,
];
const resolvers = [
    clients_1.clientsResolvers,
    users_1.usersResolvers,
    appointments_1.appointmentsResolvers,
    images_1.imagesResolvers,
    categories_1.categoriesResolvers,
];
exports.mergedResolvers = merge_1.mergeResolvers(resolvers);
exports.mergedTypeDefs = merge_1.mergeTypeDefs(typeDefs);
//# sourceMappingURL=index.js.map