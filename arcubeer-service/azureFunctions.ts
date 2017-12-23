import {
  IHttpContext,
  IFunctionRequest,
  HttpStatusCodes,
} from 'azure-functions-typescript';
import { GraphQLOptions, runHttpQuery } from 'apollo-server-core';
import {AzureFunctionsGraphQLOptionsFunction, AzureFunctionsHandler} from "apollo-server-azure-functions";

/**
 * Own implementation of graphqlAzureFunctions in apollo-server-azure-functions until bug in Azure Functions(?)
 * is fixed.
 *
 * @param {GraphQLServerOptions | AzureFunctionsGraphQLOptionsFunction} options
 * @return {AzureFunctionsHandler}
 */
export function graphqlAzureFunctions(
  options: GraphQLOptions | AzureFunctionsGraphQLOptionsFunction,
): AzureFunctionsHandler {
  if (!options) {
    throw new Error('Apollo Server requires options.');
  }

  if (arguments.length > 1) {
    throw new Error(
      `Apollo Server expects exactly one argument, got ${arguments.length}`,
    );
  }

  return (httpContext: IHttpContext, request: IFunctionRequest) => {
    const queryRequest = {
      method: request.method,
      options: options,
      query: request.method === 'POST' ? request.body : request.query,
    };

    if (queryRequest.query && typeof queryRequest.query === 'string') {
      queryRequest.query = JSON.parse(queryRequest.query);
    }

    return runHttpQuery([httpContext, request], queryRequest)
      .then(gqlResponse => {
        httpContext.res.setHeader('Content-Type', 'application/json');
        httpContext.res.raw(gqlResponse);
      })
      .catch(error => {
        const result = {
          status: error.statusCode,
          headers: error.headers,
          body: error.message,
        };

        httpContext.res = result;

        httpContext.done(null, result);
      });
  };
}
