// example data
import * as Prismic from "prismic-javascript";
import * as PrismicDOM from 'prismic-dom';

function getApi() {
  return Prismic.api("https://beers.prismic.io/api/v2");
}

function mapResultToBeer(o) {
  return {
    ...o,
    image: {url: o.data.main_image.url},
    title: PrismicDOM.RichText.asHtml(o.data.title),
    content: PrismicDOM.RichText.asHtml(o.data.content)
  };
}

export default {
  Query: {
    beers: async () => {
      const api = await getApi();
      const response = await api.query("", {});
      const resObjs = response.results;
      return resObjs.map(mapResultToBeer);
    },
    beer: async (obj, args) => {
      const api = await getApi();
      const doc = await api.getByUID('beer', args.uid);
      return mapResultToBeer(doc);
    }
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
