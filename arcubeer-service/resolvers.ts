import * as Prismic from "prismic-javascript";
import * as PrismicDOM from 'prismic-dom';

function getApi() {
  return Prismic.api("https://beers.prismic.io/api/v2");
}

const uptappdBaseUrl = 'https://api.untappd.com/v4//beer/info/';
const clientID = process.env.UNTAPPD_CLIENT_ID;
const clientSecret = process.env.UNTAPPD_CLIENT_SECRET;

function mapResultToBeer(o) {
  console.log(JSON.stringify(o));
  return {
    ...o,
    ...o.data,
    title: PrismicDOM.RichText.asHtml(o.data.title),
    content: PrismicDOM.RichText.asHtml(o.data.content)
  };
}

export default {
  Query: {
    async beers() {
      const api = await getApi();
      const response = await api.query("", {});
      const resObjs = response.results;
      return resObjs.map(mapResultToBeer);
    },
    async beer(obj, args) {
      const api = await getApi();
      const doc = await api.getByUID('beer', args.uid);
      return mapResultToBeer(doc);
    }
  },
  Mutation: {
    createVote(_, { vote }) {
      console.log(vote);
      return vote;
    },
  }
};
