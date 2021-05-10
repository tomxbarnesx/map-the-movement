module.exports = {
  env: {
    COSMIC_SLUG: process.env.COSMIC_SLUG,
    COSMIC_READ_KEY: process.env.COSMIC_READ_KEY, // Pass through env variables
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    COSMIC_SLUG: process.env.COSMIC_SLUG,
    COSMIC_READ_KEY: process.env.COSMIC_READ_KEY, // Pass through env variables
  },
}