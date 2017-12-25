// local development helper express server
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import * as express from "express";
import * as bodyParser from "body-parser";
import resolvers from "./resolvers";
import {makeExecutableSchema} from "graphql-tools";
import typeDefs from "./schema";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const PORT = 3800;

const app = express();

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.get("/", (req, res) => res.send("home"));

const server = app.listen(PORT, () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});
