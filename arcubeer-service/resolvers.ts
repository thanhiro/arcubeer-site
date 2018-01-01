import  * as Prismic from "prismic-javascript";
import * as PrismicDOM from 'prismic-dom';
import * as Untappd from 'untappd-js';

function getApi() {
  return Prismic.api("https://beers.prismic.io/api/v2");
}

const untappdClient = new Untappd();
untappdClient.setClientId(process.env.UNTAPPD_CLIENT_ID);
untappdClient.setClientSecret(process.env.UNTAPPD_CLIENT_SECRET);

function handleSlice(slice) {
  switch(slice.slice_type) {
    case 'text':
      return PrismicDOM.RichText.asHtml(slice.primary.text);
    default:
      return "";
  }
}

async function mapResultToBeer(o) {
  // Going and fetching beer data from Untappd
  const beerInfo = await untappdClient.beerInfo({BID: o.data.untappd_id});
  return {
    ...o,
    ...o.data,
    title: PrismicDOM.RichText.asHtml(o.data.title),
    content: PrismicDOM.RichText.asHtml(o.data.content),
    untappd_info: beerInfo.response.beer
  };
}

export default {
  Query: {
    async beers() {
      const api = await getApi();
      const response = await api.query([Prismic.Predicates.at('document.type', 'beer')], {});
      const resObjs = response.results;
      return Promise.all(resObjs.map(mapResultToBeer));
    },
    async beer(obj, args) {
      const api = await getApi();
      const doc = await api.getByUID('beer', args.uid);
      return mapResultToBeer(doc);
    },
    async basePage() {
      const api = await getApi();
      const doc = await api.getSingle("disclaimer");
      return { history: handleSlice(doc.data.body[0]) };
    }
  },
  Mutation: {
    createVote(_, { vote }) {
      console.log(vote);
      return vote;
    },
  }
};
