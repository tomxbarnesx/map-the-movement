// import agility from "@agility/content-fetch";

// const api = agility.getApi({
// 	guid: process.env.AGILITY_GUID,
// 	apiKey: process.env.AGILITY_API_FETCH_KEY
// });

// export default api;

const Cosmic = require('cosmicjs')
const api = Cosmic()
// Set these values, found in Bucket > Settings after logging in at https://app.cosmicjs.com/login
const bucket = api.bucket({
  slug: process.env.COSMIC_SLUG,
  read_key: process.env.COSMIC_READ_KEY
})

export default bucket;
