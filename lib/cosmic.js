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

export async function getAllObjects(typeProp, order = "order") {
  const params = {
    query: {
      type: typeProp
    },
    sort: order,
    props: 'slug,title,metadata'
  }
  const data = await bucket.getObjects(params)
  const sortedOrgs = data.objects.sort((a, b) => a.metadata.lng - b.metadata.lng)
  return sortedOrgs
}

export async function getSlugObjectAndMoreObjects(objType, slug) {
  const allObjectsParams = {
    query: {
      type: objType
    },
    props: 'slug,title,metadata'
  }

  const moreObjects = await bucket.getObjects(allObjectsParams)
  const sortedOrgs = moreObjects.objects.sort((a, b) => a.metadata.lng - b.metadata.lng)
  const pageIndex = moreObjects.objects.findIndex((org) => org.slug === slug);

  return {
    pageIndex: pageIndex,
    orgs: sortedOrgs,
  }
}

export async function getAllSlugs(objType) {
  const params = {
    query: {
      type: objType
    },
    props: 'slug',
  }
  const data = await bucket.getObjects(params)
  return data.objects
}


export default bucket;
