// language=GraphQL
const typeDefs = `
  
  type HeroImage {
    url: String
  } 
  
  type Beer {
    id: String!
    uid: String!
    tags: [String]!
    slugs: [String]!
    lang: String!
    first_publication_date: String!
    last_publication_date: String!
    title: String
    content: String
    # image: HeroImage
  }

  # the schema allows the following query:
  type Query {
    beers: [Beer]
    beer(uid: String!): Beer
  }

  # this schema allows the following mutation:
  #type Mutation {
  #    upvotePost (
  #        postId: ID!
  #    ): Post
  #}

  # we need to tell the server which types represent the root query
  # and root mutation types. We call them RootQuery and RootMutation by convention.
  schema {
    query: Query
    # mutation: Mutation
  }
`;
export default typeDefs;
