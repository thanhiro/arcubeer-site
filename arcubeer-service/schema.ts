// language=GraphQL
const typeDefs = `

  type BasePage {
    history: String
  }

  type HeroImage {
    url: String
  }     
  
  type Brewery {
    brewery_id: String
    brewery_name: String
    brewery_slug: String
    brewery_type: String
    brewery_label: String
    country_name: String
  }
  
  type UntappdInfo {
    beer_abv: Float,
    beer_ibu: Int,
    beer_description: String,
    beer_style: String,
    beer_slug: String,
    rating_count: Int,
    rating_score: Float,
    weighted_rating_score: Float
    brewery: Brewery
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
    untappd_info: UntappdInfo
  }

  # the schema allows the following query:
  type Query {
    beers: [Beer]
    beer(uid: String!): Beer
    basePage: BasePage
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
