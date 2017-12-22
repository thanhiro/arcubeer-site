import * as server from "apollo-server-azure-functions";
import typeDefs from './schema';
import {makeExecutableSchema} from 'graphql-tools';

// example data
const beers = [
  {id: 1, name: 'Internet'},
  {id: 2, name: 'Command'}
];

const resolvers = {
  Query: {
    beers: () => beers
  }
  /*Mutation: {
    upvotePost: (_, { postId }) => {
      const post = find(posts, { id: postId });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },*/
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const gql = function run(context, request) {
  if (request.method === "POST") {
    server.graphqlAzureFunctions({
      schema
    })(context, request);
  } else if (request.method === "GET") {
    return server.graphiqlAzureFunctions({
      endpointURL: '/'
    })(context, request);
  }
};
