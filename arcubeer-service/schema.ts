const typeDefs = `
type Beer {
    id: ID! # the ! means that every author object _must_ have an id
    name: String
}

# the schema allows the following query:
type Query {
    beers: [Beer]
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
