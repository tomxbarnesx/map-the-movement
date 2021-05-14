import { toast } from 'react-toastify';
const Cosmic = require('cosmicjs')
const api = Cosmic()
// Set these values, found in Bucket > Settings after logging in at https://app.cosmicjs.com/login
const readBucket = api.bucket({
  slug: process.env.COSMIC_SLUG,
  read_key: process.env.COSMIC_READ_KEY
})

const writeBucket = api.bucket({
  slug: process.env.COSMIC_SLUG,
  write_key: process.env.COSMIC_WRITE_KEY
})

export async function submitObject(metadata, title, setResponse) {
  const metafields = []

  const titles = {
    donateurl: {
      title: "DonateURL",
      field: "text"
    },
    url: {
      title: "URL",
      field: "text"
    },
    summary: {
      title: "Summary",
      field: "textarea"
    }, 
    submitters_email: {
      title: "Submitter's Email",
      field: "text"
    }
  }

  for (const key in metadata) {
    if (metadata[key] !== '') {
      metafields.push({
        title: titles[key].title,
        key: key,
        type: titles[key].field,
        value: metadata[key]
      })
    }
  }


  const params = {
    title: title,
    type: 'organizations',
    content: '',
    status: "draft",
    metafields: metafields,
    options: {
      content_editor: false
    }
  }

  writeBucket
    .addObject(params)
    .then(data => {
      setResponse(0)
      toast.success("Success! We'll review your submission as soon as we can!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    })
    .catch(err => {
      setResponse(false)
      toast.error(`We've encountered an error trying to sumit your entry! Please try again later!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    })
}

export async function getAllObjects(typeProp, order = "order") {
  const params = {
    query: {
      type: typeProp
    },
    sort: order,
    props: 'slug,title,metadata'
  }
  const data = await readBucket.getObjects(params)
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

  const moreObjects = await readBucket.getObjects(allObjectsParams)
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
  const data = await readBucket.getObjects(params)
  return data.objects
}


export default readBucket;
