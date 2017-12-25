import * as server from "apollo-server-azure-functions";
import typeDefs from './schema';
import {makeExecutableSchema} from 'graphql-tools';
import {graphqlAzureFunctions} from "./azureFunctions";
import resolvers from "./resolvers";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const gql = function run(context, request) {
  const fun = {
    POST:
      graphqlAzureFunctions({schema}),
    GET:
      server.graphiqlAzureFunctions({
        endpointURL: '/api/graphql'
      })
  }[request.method];
  return fun ? fun(context, request) :
    context.done(null, "error");
};
