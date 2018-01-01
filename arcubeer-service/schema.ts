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
    untappd_id: String!
    first_publication_date: String!
    last_publication_date: String!
    title: String
    content: String
    main_image: HeroImage
  }

  # the schema allows the following query:
  type Query {
    beers: [Beer]
    beer(uid: String!): Beer
  }
  
  enum VoteType {
    UP
    DOWN
  }

  input VoteInput {
    beerId: String
    type: VoteType
  }
  
  type Vote {
    beerId: String
    type: VoteType 
  }
  
  type Mutation {
    createVote (vote: VoteInput): Vote
  }
  
  # we need to tell the server which types represent the root query
  # and root mutation types. We call them RootQuery and RootMutation by convention.
  schema {
    query: Query
    mutation: Mutation
  }
`;
export default typeDefs;
