// example data
import * as Prismic from "prismic-javascript";
import * as PrismicDOM from 'prismic-dom';

export default {
  Query: {
    beers: () => Prismic.api("https://beers.prismic.io/api/v2")
      .then(api => api.query("", {}))
      .then(response => {
        const resObjs = response.results;
        return resObjs.map(o => ({
          ...o,
          title: PrismicDOM.RichText.asHtml(o.data.title),
          content: PrismicDOM.RichText.asHtml(o.data.content)
        }));
      })
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
