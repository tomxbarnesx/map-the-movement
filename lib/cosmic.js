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

export async function getAllObjects(typeProp) {
  const params = {
    query: {
      type: typeProp
    },
    sort: 'created_at',
    props: 'slug,title,metadata'
  }
  const data = await bucket.getObjects(params)
  return data.objects
}

export async function getSlugObjectAndMoreObjects(objType, slug) {
  const allObjectsParams = {
    query: {
      type: objType
    },
    props: 'slug,title,metadata'
  }


  const moreObjects = await bucket.getObjects(allObjectsParams)
  const pageIndex = moreObjects.objects.findIndex((org) => org.slug === slug);
    // ?.filter(({ slug: object_slug }) => object_slug !== slug)
    // .slice(0, 2)

  return {
    pageIndex: pageIndex,
    orgs: moreObjects,
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
