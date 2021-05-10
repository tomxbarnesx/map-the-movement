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
  // const params = {
  //   type: 'posts',
  //   props: 'title,slug,metadata,created_at',
  //   sort: '-created_at',
  //   ...(preview && { status: 'all' }),
  // }
  const params = {
    query: {
      type: typeProp
    },
    sort: 'created_at',
    props: 'slug,title,metadata'
  }
  const data = await bucket.getObjects(params)
  console.log(data.objects)
  return data.objects
}

export async function getPostAndMorePosts(slug, preview) {
  const singleObjectParams = {
    slug,
    props: 'slug,title,metadata,created_at',
    ...(preview && { status: 'all' }),
  }
  const moreObjectParams = {
    type: 'posts',
    limit: 3,
    props: 'title,slug,metadata,created_at',
    ...(preview && { status: 'all' }),
  }
  const object = await bucket.getObject(singleObjectParams).catch((error) => {
    // Don't throw if an slug doesn't exist
    if (is404(error)) return
    throw error
  })
  const moreObjects = await bucket.getObjects(moreObjectParams)
  const morePosts = moreObjects.objects
    ?.filter(({ slug: object_slug }) => object_slug !== slug)
    .slice(0, 2)

  return {
    post: object?.object,
    morePosts,
  }
}


export default bucket;
